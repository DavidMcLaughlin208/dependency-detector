// To run the program:
// Instantiate a new DependencyOrderDetector object and
// run its findDependencyOrder function, 
// passing the array of string dependencies as a parameter

var DependencyOrderDetector = function(){
  this.dependencyOrder = [];

  this.findDependencyOrder = function(dependencies){
    if(!(dependencies instanceof Array)){
      throw Error("Incorrect data type -- Input must be an array of strings");
    }
    this.dependencyOrder = [];

    var dependenciesObj = this.convertPackagesToObject(dependencies);

    var packagesWithNoDependencies = this.findPackagesWithNoDependencies(dependenciesObj);
    this.addPackagesToDependencyOrder(packagesWithNoDependencies);
    dependenciesObj = this.removePackagesFromObj(packagesWithNoDependencies, dependenciesObj);

    this.completeDependencyOrder(dependenciesObj);
    return this.dependencyOrder.join(", ");
  }


  this.convertPackagesToObject = function(packagesArray){
    var dependencies = {};
    for(var i in packagesArray){
      var strings = packagesArray[i].split(":");
      var package = strings[0].trim();
      var dependency = strings[1] || '';

      dependencies[package] = dependency.trim();
    }
    return dependencies;
  }

  this.findPackagesWithNoDependencies = function(dependencies){
    return Object.keys(dependencies).filter(function(package){
      return dependencies[package] === '';
    })
  }

  this.addPackagesToDependencyOrder = function(dependenciesArr){
    for(var i in dependenciesArr){
      this.dependencyOrder.push(dependenciesArr[i]);
    }
  }

  this.removePackagesFromObj = function(packagesWithNoDependencies, dependencies){
    for(var i in packagesWithNoDependencies){
      delete dependencies[packagesWithNoDependencies[i]];
    }
    return dependencies;
  }

  this.completeDependencyOrder = function(dependenciesObj){
    while(Object.keys(dependenciesObj).length > 0){
      var packagesToBeAdded = [];
      for(var i in this.dependencyOrder){
        dependency = this.dependencyOrder[i];
        for(var package in dependenciesObj){
          if(dependenciesObj[package] === dependency){
            packagesToBeAdded.push(package);
          }
        }
      }
      this.addPackagesToDependencyOrder(packagesToBeAdded);
      dependencies = this.removePackagesFromObj(packagesToBeAdded, dependenciesObj);

      if(packagesToBeAdded.length === 0){
        throw Error("Dependencies have cycles -- cannot complete");
      }
    }
  }
}
