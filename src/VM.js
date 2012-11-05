// vm.jm
// This is the core of the VM
// dependencies: Upload.js, Thread.js, ClassLibrary.js

var VM = function() {
  var _self = this;
  this._threads = [];
  this.icodeUsage = {}; // keys are files we've run; vals are sets of dalvik names
  this.currentFile = null;
  this.classLibrary = new ClassLibrary(); // single ClassLibrary, accessible to all
  this._source = (function(){
    return new Upload(function(_fileName, _fileData){
                        var _dex = new DEXData(new ArrayFile(_fileData));
                        var _k, _classes = _self.classLibrary.classes;
                        _self.currentFile = _fileName;
                        _self.defineClasses(_dex.classes);
                        _self.clear();
                        this._classChooser.clear();
                        for (_k in _classes){
                          // just magic to make for in work forever
                          if(_classes.hasOwnProperty(_k)) {
                            if(_classes[_k].hasMain()) {
                              this._classChooser.addClass(_classes[_k].type);
                            }
                          }
                        }
                      }, _self);
                          
                  }());
};

VM.prototype.logIcode = function(_dalvikName){
  (this.icodeUsage[this.currentFile] || (this.icodeUsage[this.currentFile]={}))[_dalvikName] = _dalvikName;
};

VM.prototype.defineClasses = function(_data){
  this.classLibrary.defineClasses(_data);
};

VM.prototype.createThread = function( _directMethod ) {
  var _newThread = new Thread(this, 'RUNNABLE');
  _newThread.pushMethod(_directMethod);
  this._threads.push(_newThread);
};

VM.prototype.start = function ( _selectedClassAsType ) {
  // find specified classname
  var _class = this.classLibrary.findClass(_selectedClassAsType);

  // && true casts to boolean sort of
  return this.createThread(_class.getMain());
}; //end start

VM.prototype.clockTick = function() {
  //--- clock tick; round-robin scheduler
  //    for now, do one instruction per thread
  assert(this.isRunnable(), 'This machine has no RUNNABLE threads.');
  var _i, _thread;
  for(_i=0; _i<this._threads.length; _i++) {
    _thread = this._threads[_i];
    _thread.doNextInstruction();
  }
  //--- remove all finished threads
  this._threads = this._threads.filter(function(_t) { return !_t.isFinished(); });
};

VM.prototype.getThreadState = function() {
  var _s="", _i;
  for (_i=0; _i<this._threads.length; _i++){
    _s+=this._threads[_i].toString()+"\t";
  }
  return _s;
};

VM.prototype.hasThreads = function() {
  return this._threads.length !== 0;
};

VM.prototype.clear = function(){
  this._threads = [];
};

VM.prototype.isRunnable = function(){
  for (_i = 0; _i < this._threads.length; _i++) {
    if (this._threads[_i].state === 'RUNNABLE') {
      return true;
    }
  }
  return false;
};
