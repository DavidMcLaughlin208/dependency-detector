var dependencyOrderDetector = function(){
  this.dependencyOrder = [];

  this.findDependencyOrder = function(dependcies){
    if(typeof dependcies !== Array){
      throw Error("Incorrect data type -- Input must be an array of strings");
    }

    var dependecies = this.packagesToObject(input);
    var packagesWithNoDependencies = findPackagesWithNoDependencies(dependencies);
    this.addPackagesToDepencyOrder(packagesWithNoDependencies);
    this.removePackagesFromObj(packagesWithNoDependencies);
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

  this.findPackagesWithNoDependencies = function(dependencies){
    var packagesWithNoDependencies = [];
    for(var package in dependencies){
      if(dependencies[package] === ''){
        packagesWithNoDependencies.push(package);
      }
    }
    return packagesWithNoDependencies;
  }

  this.addPackagesToDependencyOrder(dependencies){
    for(var i in dependencies){
      this.dependencyOrder.push(dependencies[i]);
    }
  }

  this.removePackagesFromObj(packagesWithNoDependencies){
    
  }

}
