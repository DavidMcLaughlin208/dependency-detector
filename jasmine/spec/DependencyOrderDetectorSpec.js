describe("DependencyOrderDetector", function(){
  var dod;
  var dependenciesString;
  var dependenciesObj;
  var dependenciesObjNoBasePackages;
  var completedDependencyOrder;

  beforeEach(function() {
    dod = new dependencyOrderDetector();
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

    circularDependencies = { 'Leetmeme': 'Cyberportal',
                        'Cyberportal': 'Ice', 'CamelCaser': 'KittenService',
                        'Ice': 'Fraudstream' };
  })

  it("should throw an exception if not given an array", function(){
    expect( function(){dod.findDependencyOrder("Failure")})
      .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
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
      expect(function(){dod.completeDependencyOrder(circularDependencies)})
        .toThrow(new Error("Dependencies have cycles -- cannot complete"));
    })
  })

  it("should calculate the dependency order from an array of strings", function(){
    console.log(dependenciesString)
    expect(dod.findDependencyOrder(dependenciesString))
      .toEqual(completeDependencyOrder.join(", "));
  })

  
})



