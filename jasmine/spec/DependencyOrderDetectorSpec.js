describe("DependencyOrderDetector", function(){
  var dod;
  var dependenciesString;
  var dependenciesObj;
  var dependenciesObjNoBasePackages;
  var completedDependencyOrder;
  var circularDependenciesObj;
  var circularDependenciesString;

  beforeEach(function() {
    dod = new DependencyOrderDetector();
    dependenciesString = ['KittenService: ', 'Leetmeme: Cyberportal',
                          'Cyberportal: Ice', 'CamelCaser: KittenService',
                          'Fraudstream: Leetmeme', 'Ice: '];

    dependenciesObj = { 'KittenService': '', 'Leetmeme': 'Cyberportal',
                        'Cyberportal': 'Ice', 'CamelCaser': 'KittenService',
                        'Fraudstream': 'Leetmeme', 'Ice': '' };

    dependenciesObjNoBasePackages = { 'Leetmeme': 'Cyberportal',
                                      'Cyberportal': 'Ice', 'CamelCaser': 'KittenService',
                                      'Fraudstream': 'Leetmeme'}

    completedDependencyOrder = [ 'KittenService', 'Ice', 'CamelCaser', 'Cyberportal', 'Leetmeme', 'Fraudstream' ];

    circularDependenciesObj = { 'Leetmeme': 'Cyberportal',
                        'Cyberportal': 'Ice', 'CamelCaser': 'KittenService',
                        'Ice': 'Fraudstream' };
    
    circularDependenciesString = ['KittenService: ', 'Leetmeme: Cyberportal',
                                  'Cyberportal: Ice', 'CamelCaser: KittenService',
                                  'Fraudstream: ', 'Ice: Leetmeme']
  })

  
  describe("convertPackagesToObject", function(){
    it("should convert an array of strings to an object", function(){
      expect(dod.convertPackagesToObject(dependenciesString))
        .toEqual(dependenciesObj);
    })
  })

  describe("findPackagesWithNoDependencies", function(){
    it("should identify packages with no dependencies", function(){
      expect(dod.findPackagesWithNoDependencies(dependenciesObj))
        .toEqual(['KittenService', 'Ice']);
    })
  })

  describe("addPackagesToDependencyOrder", function(){
    it("should add dependencies to the dependencyOrder", function(){
      var dependencies = ['KittenService', 'Ice'];
      dod.addPackagesToDependencyOrder(dependencies);
      expect(dod.dependencyOrder).toEqual(dependencies);
    })
  })

  describe("removePackagesFromObj", function(){
    it("should delete packages from dependencyObj", function(){
      var dependencies = ['KittenService', 'Ice'];
      var modifiedDependencyObj = dod.removePackagesFromObj(dependencies, dependenciesObj);
      expect(modifiedDependencyObj)
        .toEqual(dependenciesObjNoBasePackages);
    })
  })

  describe("completeDependencyOrder", function(){
    it("should finish the dependency order", function(){
      dod.dependencyOrder = ['KittenService', 'Ice'];
      dod.completeDependencyOrder(dependenciesObjNoBasePackages);
      expect(dod.dependencyOrder).toEqual(completedDependencyOrder);
    })


    it("should throw an error when the dependencies are circular", function(){
      dod.dependencyOrder = [ 'KittenService', 'Leetmeme' ];
      expect(function(){dod.completeDependencyOrder(circularDependenciesObj)})
        .toThrow(new Error("Dependencies have cycles -- cannot complete"));
    })
  })

  describe("findDependencyOrder", function(){
    it("should throw an exception if not given an array", function(){
      expect( function(){dod.findDependencyOrder("Failure")})
        .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
    })

    it("should calculate the dependency order from an array of strings", function(){
      expect(dod.findDependencyOrder(dependenciesString))
        .toEqual(completedDependencyOrder.join(", "));
    })

    it("should throw an error when the dependencies are circular", function(){
      expect(function(){dod.findDependencyOrder(circularDependenciesString)})
        .toThrow(new Error("Dependencies have cycles -- cannot complete"));
    })

    it("should throw an exception if there are no packages with no dependencies", function(){
      expect(function(){dod.findDependencyOrder([ 'cat: dog', 'dog: cat' ])})
        .toThrow(new Error("Dependencies have cycles -- cannot complete"));
    })

    it("should return an empty string from an input with no dependencies", function(){
      expect(dod.findDependencyOrder([])).toEqual("");
    })
  })

  
})



