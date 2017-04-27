var DependencyOrderDetector = function(){
  this.dependencyOrder = [];

  this.findDependencyOrder = function(dependencies){
    console.log(dependencies instanceof Array);
    if(!(dependencies instanceof Array)){
      throw Error("Incorrect data type -- Input must be an array of strings");
    }

    var dependencies = this.convertPackagesToObject(dependencies);
    var packagesWithNoDependencies = this.findPackagesWithNoDependencies(dependencies);
    this.addPackagesToDependencyOrder(packagesWithNoDependencies);
    dependencies = this.removePackagesFromObj(packagesWithNoDependencies, dependencies);
    this.completeDependencyOrder(dependencies);
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
    var packagesWithNoDependencies = [];
    for(var package in dependencies){
      if(dependencies[package] === ''){
        packagesWithNoDependencies.push(package);
      }
    }
    return packagesWithNoDependencies;
  }

  this.addPackagesToDependencyOrder = function(dependencies){
    for(var i in dependencies){
      this.dependencyOrder.push(dependencies[i]);
    }
  }

  this.removePackagesFromObj = function(packagesWithNoDependencies, dependencies){
    for(var i in packagesWithNoDependencies){
      delete dependencies[packagesWithNoDependencies[i]];
    }
    return dependencies;
  }

  this.completeDependencyOrder = function(dependencies){
    while(Object.keys(dependencies).length > 0){
      var packagesToBeAdded = [];
      for(var i in this.dependencyOrder){
        dependency = this.dependencyOrder[i];
        for(var package in dependencies){
          if(dependencies[package] === dependency){
            packagesToBeAdded.push(package);
          }
        }
      }
      this.addPackagesToDependencyOrder(packagesToBeAdded);
      dependencies = this.removePackagesFromObj(packagesToBeAdded, dependencies);

      if(packagesToBeAdded.length === 0){
        throw Error("Dependencies have cycles -- cannot complete");
      }
    }
  }
}
