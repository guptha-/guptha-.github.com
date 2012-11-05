// icode is the "Internal or Interpreter Codes"
// dependencies: icodeGen.js (needed to resolve values for keys), assert.js, invoke.js

var icodeHandlers = {
  "nop": function(_inst, _thread) {
    // does nothing
  },
  
  "move": function(_inst, _thread) {
    var _value = _thread.getRegister (_inst.src);
    _thread.setRegister(_inst.dest, _value);
  },

  "move-result": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread._result);
  },

  "move-exception": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread._exception);
  },

  // handles returning from a method with or without a value
  "return": function(_inst, _thread) {
    _thread.popMethod(_thread.getRegister(_inst.value));
  },

  // handles loading a constant into a register
  // this can be a number, a string, a type, ...
  "move-const": function(_inst, _thread) {
    if(_inst.wide) {
      _thread.setRegister(_inst.dest, _inst.value);
    } else {
      _thread.setRegister(_inst.dest, _inst.value);
    }
  },

  "monitor-enter": function(_inst, _thread) {
    var _container = _thread.getRegister(_inst.src);
    if (isUndefined(_container.type)) {
      //console.log(inspect(_container));
      assert(isA(_container, 'Type'), 'monitor-enter on a class/type object');
      // This is a type object from const-class
      _container = _thread._vm.classLibrary.findClass(_container);
    }
    if (_container.monitorLockTaken === false) {
      _container.monitorLockTaken = true;
    } else {
      return 0;
    }
  },

  "monitor-exit": function(_inst, _thread) {
    var _container = _thread.getRegister(_inst.src);
    if (isUndefined(_container.type)) {
      // This is a type object from const-class
      _container = _thread._vm.classLibrary.findClass(_container);
    }
    _container.monitorLockTaken = false;
  },

  "check-cast": function(_inst, _thread) {
    var _src = _thread.getRegister(_inst.src);
    if(isString(_src)) {
      return _inst.type.isEquals(TYPE_STRING);
    }

    var _typeA = _src.type;
    var _typeB = _inst.type;
    //console.log(_thread.getRegister(_inst.src));
    //console.log(_typeA);
    //console.log(_typeB);
    if (_typeA.isPrimitive() || !_typeA.isEquals(_typeB)) {
      throw "ClassCastException";
    }      
  },

  "instance-of": function(_inst, _thread) {
    var _type = _inst.type;
    var _obj = _thread.getRegister(_inst.src);
    
    //console.log("instance-of "+_type+"?");
    
    // special-case Ljava/lang/String;
    if(_type.isEquals(TYPE_STRING)) {
      _thread.setRegister(_inst.dest, isString(_obj) );
      return;
    }

    assert(_thread._vm.classLibrary.findClass(_obj.type), "Class "+_obj.getTypeString()+" not found.");
    assert(isA(_obj, 'Instance'), "Object "+inspect(_obj)+" is not an Instance");
    _thread.setRegister(_inst.dest, (!_type.isPrimitive() && (_obj.type.isEquals(_type))));
  },

  "array-length": function(_inst, _thread) {
    var _array = _thread.getRegister (_inst.src);
    _thread.setRegister (_inst.dest, _array.length); 
  },

  "new-instance": function(_inst, _thread) {
    // get the class for the corresponding type from classLibrary
    if (_inst.type.getTypeString() == "Ljava/lang/StringBuilder;") {
      _thread.setRegister(_inst.dest, "");
    }
    else {
      var _class = _thread._vm.classLibrary.findClass(_inst.type);
      var _instance = _class.makeNew(_thread.getClassLibrary());

      _thread.setRegister(_inst.dest, _instance);
      //console.log("new-instance made: " + inspect(_thread.getRegister(_inst.dest)));

      if (isRunnable(_inst.type, _thread.getClassLibrary())){
        _instance.thread = _thread.spawn(_inst.type);
        //console.log("new Thread made with id "+_instance.thread.uid);
      }
    }
  },

  "new-array": function(_inst, _thread) {
    // only ever called for 1-d arrays
    var _a = new Array(_thread.getRegister(_inst.dim));
    _a.type = _inst.type;
    _thread.setRegister(_inst.dest, _a);
  },

  "filled-new-array": function(_inst, _thread) {
    var _dimensionArray = _inst.reg.map(function (_regIdx) { return _thread.getRegister(_regIdx); });
    var _a = makeHyperArray(_dimensionArray, new Type(repeat('[',_dimensionArray.length)+_inst.type._type, null));
    _thread._result = _a;
  },

  "fill-array": function(_inst, _thread) {
    var _array = _thread.getRegister(_inst.dest);
    _array._data = _inst.data;
  },

  "throw": function(_inst, _thread) {
    // get the exception object from the register at src
    // redirect control at the thread level by using Thread.throwException to find the 
    // appropriate stack frame holding our catch (i.e. first match).
    var _exceptionObject = _thread.getRegister(_inst.src);
    _thread.throwException(_exceptionObject);
    return 0;
  },

  "goto": function(_inst, _thread) {
    return _inst.address;
  },

  "switch": function(_inst, _thread) {
    var _val = _thread.getRegister(_inst.src);    
    var _i, _addressJumpTo;
    for(_i=0; _i<_inst.cases.length; _i++) {
      if(_val === _inst.cases[_i]) {
        _addressJumpTo = _inst.addresses[_i];  
        break;      
      }      
    }
    return _addressJumpTo;
  },

  "cmp": function(_inst, _thread) {
    var _srcA = _thread.getRegister (_inst.srcA);
    var _srcB = _thread.getRegister (_inst.srcB);
    var _type = _inst.type;
    
    if (_type.isEquals(TYPE_FLOAT)) {
      _srcA = floatFromInt (_srcA);
      _srcB = floatFromInt (_srcB);
    } else if (_type.isEquals(TYPE_DOUBLE)){
      _srcA = doubleFromgLong (_srcA);
      _srcB = doubleFromgLong (_srcB);
    }

    // handle long
    if(_type.isEquals(TYPE_LONG)) {
      if (_srcB.lessThan(_srcA)) {
        _thread.setRegister (_inst.dest, -1);
      } else if (_srcB.greaterThan(_srcA)) {
        _thread.setRegister (_inst.dest, 1);
      } else {
        _thread.setRegister (_inst.dest, 0);
      }
      return;
    }

    // handle NaN
    if(_type.isEquals(TYPE_DOUBLE) || _type.isEquals(TYPE_FLOAT)) {
      if ((isNaN(_srcA)) || (isNaN(_srcB))) {
        if (_inst.bias === "lt") {
          _thread.setRegister (_inst.dest, -1);
        }
        else {
          _thread.setRegister (_inst.dest, 1);
        }
        return;
      }
    }

    //handle int, float, and double
    if (_srcB < _srcA) {
      _thread.setRegister (_inst.dest, -1);
    } else if (_srcB > _srcA) {
      _thread.setRegister (_inst.dest, 1);
    } else {
      _thread.setRegister (_inst.dest, 0);
    }
  },

  "if": function(_inst, _thread) {
      var ifOp = _inst.cmp;
      var _varA = _thread.getRegister(_inst.varA);
      var _varB = 0;
      if(!isUndefined(_inst.varB)) {
        _varB = _thread.getRegister(_inst.varB);
      }
      if (ifOp === "eq") {
          if (_varA === _varB) {
              return _inst.address;
          }
      } else if (ifOp === "ne") {
          if (_varA !== _varB) {
              return _inst.address;
          }
      } else if (ifOp === "lt") {
          if (_varA < _varB) {
              return _inst.address;
          }
      } else if (ifOp === "ge") {
          if (_varA >= _varB) {
              return _inst.address;
          }
      } else if (ifOp === "gt") {
          if (_varA > _varB) {
              return _inst.address;
          }
      } else if (ifOp === "le") {
          if (_varA <= _varB) {
              return _inst.address;
          }
      } else {
          assert (false, "Undefined If Comparison operation");
      }
  },

  "array-get": function(_inst, _thread) {
    var _array = _thread.getRegister (_inst.array);
    var _index = _thread.getRegister (_inst.index);
    //console.log("array-get");
    assert(_array, "Array is not undefined");
    assert(_index < _array.length, "array-get index is out of bounds");
    _thread.setRegister (_inst.value, _array[_index]);
    assert(_array, "Array is not undefined");
  },

  "array-put": function(_inst, _thread) {
    var _array = _thread.getRegister (_inst.array);
    var _index = _thread.getRegister (_inst.index);
    var _value = _thread.getRegister (_inst.value);
    assert(_array, "Array is not undefined");
    _array[_index] = _value;
    assert(_array, "Array is not undefined");
  },

  "instance-get": function(_inst, _thread) {
    var _instance = _thread.getRegister(_inst.obj);
    var _val = _instance.getField(_inst.field).value;
    _thread.setRegister(_inst.value, _val);
  },

  "instance-put": function(_inst, _thread) {
    var _instance = _thread.getRegister(_inst.obj);
    var _val = _thread.getRegister(_inst.value);
    _instance.getField(_inst.field).value = _val; 
  },

  // handles getting a static field from a class
  "static-get": function(_inst, _thread) {
    var _val, _dest = _inst.dest,  _field = _inst.field, _result = {};
    var _class = _thread.getClassLibrary().findClass(_field.definingClass);
    _result.primtype = _field.type;
    _result.value = 0;

    _val = _class.getField(_field);

    _thread.setRegister (_dest, _val);
  },

  "static-put": function(_inst, _thread) {
      _inst.field.value = _thread.getRegister (_inst.dest);
  },

  // handles invoking a method on an object or statically
  "invoke": function(_inst, _thread) {
    invoke(_inst,_thread);
  },

  "negate": function(_inst, _thread) {
    var _src = _thread.getRegister (_inst.src);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister (_inst.dest, gLongFromDouble (-doubleFromgLong (_src)));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister (_inst.dest, _src.negate());
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat(-floatFromInt(_src)));
    } else if (_inst.type.isEquals(TYPE_INT)) {
      _thread.setRegister (_inst.dest, -_src);
    } else {
      assert(false, "Invalid type for negate");
    }
  },

  "not": function(_inst, _thread) {
    var _src = _thread.getRegister (_inst.src);
    if (_inst.type.isEquals(TYPE_INT)) {
      _thread.setRegister (_inst.dest, ~_src);
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister (_inst.dest, _src.not());
    } else {
      assert(false, "Invalid type for not");
    }
  },

  "primitive-cast": function(_inst, _thread) {
    var srcType = _inst.srcType;
    var destType = _inst.destType;
    // Not distinguishing between wide and not wide
    var val = _thread.getRegister(_inst.src);

    if (srcType.isEquals(TYPE_FLOAT)) {
      val = floatFromInt(val);
    } else if (srcType.isEquals(TYPE_DOUBLE)) {
      val = doubleFromgLong(val);
    }
    
    if (srcType.isEquals(TYPE_LONG)) {
      //console.log("long to smth: " + val);
      if (destType.isEquals(TYPE_INT)) {
        val = val.toInt();
      } else if (destType.isEquals(TYPE_FLOAT)) {
        val = val.toNumber();
        val = floatFromDouble(val);
      } else if (destType.isEquals(TYPE_DOUBLE)) {
        val = val.toNumber();
      } else {
        assert(false, "Unrecognized target type conversion from long"); 
      }
    } else {
      //console.log("number to smth: " + val);
      if (destType.isEquals(TYPE_INT)) {
        val = parseInt(val.toString(), 10);
      } else if (destType.isEquals(TYPE_FLOAT)) {
        val = floatFromDouble(val);
      } else if (destType.isEquals(TYPE_LONG)) {
        val = gLong.fromNumber(val);
      }
    }

    if (destType.isEquals(TYPE_FLOAT)) {
      val = intFromFloat(val);
    } else if (destType.isEquals(TYPE_DOUBLE)) {
      val = gLongFromDouble(val);
    }

    _thread.setRegister(_inst.dest, val);
  },

  "int-cast": function(_inst, _thread) {
    var val = _thread.getRegister(_inst.src);
    var dstType = _inst.destType;
    var dst = _inst.dest;
    if (dstType.isEquals(TYPE_SHORT)) {
      val = val & 0xFFFF;
      val = signExtend(val, 16, 32);
    } else if (dstType.isEquals(TYPE_CHAR)) {
      val = val & 0xFFFF;
      //console.log("val after 0x: " + val);
    } else if (dstType.isEquals(TYPE_BYTE)) {
      val = val & 0xFF;
      val = signExtend(val, 8, 32);
    } else {
      assert(false, "Unrecognized target cast from int");
    }

    _thread.setRegister(dst, val);
  },

  "add": function(_inst, _thread) {
    var numA = parseNumByType(_thread.getRegister(_inst.srcA), _inst.type);
    var numB = parseNumByType(_thread.getRegister(_inst.srcB), _inst.type);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister(_inst.dest, gLongFromDouble (numA + numB));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.add(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA + numB));
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat (floatFromDouble (numA + numB)));
    } else {
      assert (false, "Unidentified type for addition");
    }
  },

  "sub": function(_inst, _thread) {
    var numA = parseNumByType(_thread.getRegister(_inst.srcA), _inst.type);
    var numB = parseNumByType(_thread.getRegister(_inst.srcB), _inst.type);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister(_inst.dest, gLongFromDouble (numA - numB));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.subtract(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA - numB));
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat (floatFromDouble (numA - numB)));
    } else {
      assert (false, "Unidentified type for subtraction");
    }
  },
  
  "mul": function(_inst, _thread) {
    var numA = parseNumByType(_thread.getRegister(_inst.srcA), _inst.type);
    var numB = parseNumByType(_thread.getRegister(_inst.srcB), _inst.type);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister(_inst.dest, gLongFromDouble (numA * numB));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.multiply(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA * numB));
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat (floatFromDouble (numA * numB)));
    } else {
      assert (false, "Unidentified type for multiplication");
    }
  },

  "div": function(_inst, _thread) {
    var numA = parseNumByType(_thread.getRegister(_inst.srcA), _inst.type);
    var numB = parseNumByType(_thread.getRegister(_inst.srcB), _inst.type);
    handleDivideByZero(numB, _thread);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister(_inst.dest, gLongFromDouble (numA / numB));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.div(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA / numB));
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat ( floatFromDouble ( numA / numB)));
    } else {
      throw "Unidentified type for division";
    }
  },

  "rem": function(_inst, _thread) {
    var numA = parseNumByType(_thread.getRegister(_inst.srcA), _inst.type);
    var numB = parseNumByType(_thread.getRegister(_inst.srcB), _inst.type);
    handleDivideByZero(numB, _thread);
    if (_inst.type.isEquals(TYPE_DOUBLE)) {
      _thread.setRegister(_inst.dest, gLongFromDouble (numA % numB));
    } else if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.modulo(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA % numB));
    } else if (_inst.type.isEquals(TYPE_FLOAT)) {
      _thread.setRegister (_inst.dest, intFromFloat (floatFromDouble (numA % numB)));
    } else {
      assert (false, "Unidentified type for getting a remainder");
    }
  },
    
  "and": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.and(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) || _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA & numB));
    } else {
      assert (false, "Unidentified type for an 'And' operation");
    }
  },

  "or": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.or(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) ||
        _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA | numB));
    } else {
      assert (false, "Unidentified type for an 'Or' operation");
    }
  },

  "xor": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.xor(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) ||
        _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA ^ numB));
    } else {
      assert (false, "Unidentified type for a 'Xor' operation");
    }
  },

  "shl": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.shiftLeft(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) ||
        _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA << numB));
    } else {
      assert (false, "Unidentified type for Shifting Left");
    }
  },

  "shr": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.shiftRight(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) ||
        _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA >> numB));
    } else {
      assert (false, "Unidentified type for Shifting Right");
    }
  },

  "ushr": function(_inst, _thread) {
    var numA = _thread.getRegister(_inst.srcA);
    var numB = _thread.getRegister(_inst.srcB);
    if (_inst.type.isEquals(TYPE_LONG)) {
      _thread.setRegister(_inst.dest, numA.shiftRightUnsigned(numB));
    } else if (_inst.type.isEquals(TYPE_BYTE) || _inst.type.isEquals(TYPE_INT) ||
        _inst.type.isEquals(TYPE_SHORT)) {
      _thread.setRegister(_inst.dest, _inst.type.trimNum(numA >>> numB));
    } else {
      assert (false, "Unidentified type for Unsigned Shifting Right");
    }
  },

  "add-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) + _inst.literal);
  },

  "sub-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) - _inst.literal);
  },
  
  "mul-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) * _inst.literal);
  },

  "div-lit": function(_inst, _thread) {
    handleDivideByZero(_inst.literal, _thread);
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) / _inst.literal);
  },

  "rem-lit": function(_inst, _thread) {
    handleDivideByZero(_inst.literal, _thread);
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) % _inst.literal);
  },

  "and-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) & _inst.literal);
  },

  "or-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) | _inst.literal);
  },

  "xor-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) ^ _inst.literal);
  },

  "shl-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) << _inst.literal);
  },

  "shr-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) >> _inst.literal);
  },

  "ushr-lit": function(_inst, _thread) {
    _thread.setRegister(_inst.dest, _thread.getRegister(_inst.src) >>> _inst.literal);
  }
};

// sanity check of usage
//assert(!isUndefined(icodeHandlers['static-get']), "static-get is defined test");

