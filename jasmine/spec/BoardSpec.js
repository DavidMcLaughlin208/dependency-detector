describe("Board", function(){
  beforeEach(function() {
    board = new Board;
  })

  it("should initialize with a null board", function(){
    expect(board.board).toEqual([ [ null, null, null ], [ null, null, null ], [ null, null, null ] ])
  })

  it("should return the diagonals", function(){
    board.board = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
    expect(board.getDiagonals()).toEqual([ [ 1, 5, 9 ], [ 3, 5, 7 ] ])
  })
})
