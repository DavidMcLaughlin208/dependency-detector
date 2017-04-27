var dependencyOrderDetector = function(){
  this.findDependencyOrder = function(dependcies){
    if(typeof dependcies !== Array){
      throw Error("Incorrect data type -- Input must be an array of strings");
    }

    var dependecies = this.packagesToObject(input);
  }


  this.packagesToObject = function(input){
    var dependencies = {};
    for(var i in input){
      var strings = input[i].split(": ");
      dependencies.strings[0] = strings[1];
    }
    return dependencies;
  }
}
