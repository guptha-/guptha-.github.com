'use strict'

	var mClass = function (cName) {
	  return {name: cName,
	    
	    directMethods: [],
	    virtualMethods: []
	  }
	}
	
	var classes = [];
	
	classes.push(mClass("class1"));
	classes[0].directMethods.push("foo");
    classes[0].directMethods.push("bar");
	
	classes.push(mClass("class2"));
	classes[1].directMethods.push("foo");
    classes[1].virtualMethods.push("bar");
	
	classes.push(mClass("class3"));
	classes[2].virtualMethods.push("foo");
    classes[2].directMethods.push("bar");
	
	classes.push(mClass("class4"));
	classes[3].virtualMethods.push("foo");
    classes[3].virtualMethods.push("bar");	
   
  
    document.write("\n" + classes[0]);
	function foo() {
	  alert(JSON.stringify(classes));
	}    
  