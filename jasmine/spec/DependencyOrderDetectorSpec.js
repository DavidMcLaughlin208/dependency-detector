describe("DependencyOrderDetector", function(){
  var dod;
  var dependenciesString;
  var dependenciesObj
  beforeEach(function() {
    dod = new dependencyOrderDetector();
    dependenciesString = ['KittenService: ', 'Leetmeme: Cyberportal',
                          'Cyberportal: Ice', 'CamelCaser: KittenService',
                          'Fraudstream: Leetmeme', 'Ice: '];
    dependenciesObj = { 'KittenService': '', 'Leetmeme': 'Cyberportal',
                        'Cyberportal': 'Ice', 'CamelCaser': 'KittenService',
                        'Fraudstream': 'Leetmeme', 'Ice': '' }
  })

  it("should throw an exception if not given an array", function(){
    expect( function(){dod.findDependencyOrder("Failure")})
      .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
  })

  it("should convert an array of strings to an object", function(){
    expect(dod.packagesToObject(dependenciesString))
      .toEqual(dependenciesObj);
  })

  it("should identify packages with no dependencies", function(){
    expect(dod.findPackagesWithNoDependencies(dependenciesObj))
      .toEqual(['KittenService', 'Ice']);
  })

  
})



