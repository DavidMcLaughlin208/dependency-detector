describe("findDependencyOrder", function(){

  it("should throw an exception if not given an array", function(){
    expect( function(){findDependencyOrder("Failure")})
      .toThrow(new Error("Incorrect data type -- Input must be an array of strings"))
  })
})
