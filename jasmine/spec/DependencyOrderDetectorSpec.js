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
  })

  it("should throw an exception if not given an array", function(){
    expect( function(){dod.findDependencyOrder("Failure")})
      .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
  })

  it("should convert an array of strings to an object", function(){
    expect(dod.convertPackagesToObject(dependenciesString))
      .toEqual(dependenciesObj);
  })

  it("should identify packages with no dependencies", function(){
    expect(dod.findPackagesWithNoDependencies(dependenciesObj))
      .toEqual(['KittenService', 'Ice']);
  })

  it("should add dependencies to the dependencyOrder", function(){
    var dependencies = ['KittenService', 'Ice'];
    dod.addPackagesToDependencyOrder(dependencies);
    expect(dod.dependencyOrder).toEqual(dependencies);
  })

  it("should delete packages from dependencyObj", function(){
    var dependencies = ['KittenService', 'Ice'];
    var modifiedDependencyObj = dod.removePackagesFromObj(dependencies, dependenciesObj);
    expect(modifiedDependencyObj)
      .toEqual(dependenciesObjNoBasePackages);
  })

  it("should finish the dependency order", function(){
    dod.dependencyOrder = ['KittenService', 'Ice'];
    dod.completeDependencyOrder(dependenciesObjNoBasePackages);
    expect(dod.dependencyOrder).toEqual(completedDependencyOrder)
  })

  
})



