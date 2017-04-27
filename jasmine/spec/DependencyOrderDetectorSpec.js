describe("DependencyOrderDetector", function(){
  var dod;
  beforeEach(function() {
    dod = new dependencyOrderDetector();
  })

  it("should throw an exception if not given an array", function(){
    expect( function(){dod.findDependencyOrder("Failure")})
      .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
  })

  
})



