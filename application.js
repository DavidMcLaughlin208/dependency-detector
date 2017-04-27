var dependencyOrderDetector = function(){
  this.dependencyOrder = [];

  this.findDependencyOrder = function(dependcies){
    if(typeof dependcies !== Array){
      throw Error("Incorrect data type -- Input must be an array of strings");
    }

    var dependecies = this.packagesToObject(input);
    dependencies = addPackagesWithNoDependencies(dependencies);

  }


  this.packagesToObject = function(input){
    var dependencies = {};
    for(var i in input){
      var strings = input[i].split(":");
      var package = strings[0].trim();
      var dependency = strings[1] || '';

      dependencies[package] = dependency.trim();
    }
    return dependencies;
  }

  this.packagesWithNoDependencies = function(dependencies){
    for(var package in dependencies){
      if(dependencies[package] === ''){
        this.dependencyOrder.push(package);
        delete dependencies[package];
      }
    }
    return dependencies;
  }

}
