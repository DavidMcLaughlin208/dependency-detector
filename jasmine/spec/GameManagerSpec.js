describe("GameManager", function(){
  beforeEach(function() {
    gm = new GameManager;
    vm = new ViewManager;
  })

  it("should start with two players", function(){
    expect(gm.player1).toEqual(new Player("x"))
    expect(gm.player2).toEqual(new Player("o"))
  })

  it("should start with a board", function(){
    expect(gm.board).toEqual(new Board)
  })

  it("should transpose a nested array", function(){
    expect(gm.transpose([ [1,2,3], [4,5,6], [7,8,9] ])).toEqual([ [1,4,7], [2,5,8], [3,6,9] ])
  })

  it("should update the board on move", function(){
    gm.place(0, 0);
    expect(gm.board.board[0][0]).toEqual("x")
  })

  it("should return a winner on a winning horizontal row", function(){
    gm.place(0, 0)
    gm.place(2, 0)

    gm.place(0, 1)
    gm.place(1, 1)
    
    gm.place(0, 2)
    gm.place(2, 2)
    expect(gm.gameOver()).toEqual("x")
  })

  it("should return a winner on a winning column", function(){
    gm.place(0, 0)
    gm.place(2, 2)
    
    gm.place(1, 0)
    gm.place(2, 1)
    
    gm.place(2, 0)
    expect(gm.gameOver()).toEqual("x")
  })

  it("should return a winner on a winning diagonal", function(){
    gm.place(0, 2)
    gm.place(0, 0)

    gm.place(1, 1)
    gm.place(0, 1)
    
    gm.place(2, 0)
    expect(gm.gameOver()).toEqual("x")
  })

  it("should return false on no winner", function(){
    expect(gm.gameOver()).toEqual(false)
  })

  it("should return false when trying to place on a full board", function(){
    gm.board.board = [ ["x", "o", "x"], [ "o", "x", "o" ], [ "x", "o", "x" ] ]
    expect(gm.place(0,0)).toEqual(false)
  })
})
