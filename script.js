console.log("Welcome!")
clog = console.log
clog("clog now works!")

//////////// Public variables 
let player1moves = []
let player2moves = []
const case1 = document.querySelector("c1")
game = (function(){
    //// Game UI Display start

const testBoard = ["Ignore-0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]




//// Game UI Display end  
    
/* let player1moves = []
let player2moves = [] */

/* player1moves.push("1")
player2moves.push("9")
player1moves.push("6")
player2moves.push("4") 
player1moves.push("8")
player2moves.push("5")
player1moves.push("3")
player2moves.push("7")
player1moves.push("2") */

//player1moves.push("3")
//player1moves.push("9")
//player1moves.push("4")
// player1moves.push("6")


//////////// Private 
const ticTacToe = function(){
   
// Everything inside here's private
// Declaring dependencies
function makePlayer(name, marker){
    const sayName = () => {return "My name is " + name + "!" }
    return {name, marker, sayName}
    }

const player1 = makePlayer("Bob", "X")
const player2 = makePlayer("Diana", "O")
/* let player1moves = []
let player2moves = [] */
let cpuMoves = player2moves
let validCpuMove
let player1WinsCondition
let player2WinsCondition
let finalWinner
const gameBoard = ["Ignore-0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


/// test
// player1moves.push("3")
// player1moves.push("9")
//test

//fn start
let winnerSet = ""

function winningSet (){
    let gb = gameBoard
    set = {
            //0: ["ignore0"],
            1: [`${gb[1]}`, `${gb[2]}`, `${gb[3]}` ],
            2: [`${gb[4]}`, `${gb[5]}`, `${gb[6]}` ],
            3: [`${gb[7]}`, `${gb[8]}`, `${gb[9]}` ],
            4: [`${gb[1]}`, `${gb[4]}`, `${gb[7]}` ],
            5: [`${gb[2]}`, `${gb[5]}`, `${gb[8]}` ],
            6: [`${gb[3]}`, `${gb[6]}`, `${gb[9]}` ],
            7: [`${gb[1]}`, `${gb[5]}`, `${gb[9]}` ],
            8: [`${gb[3]}`, `${gb[5]}`, `${gb[7]}` ],
         }
        winnerSet =  set
        return winnerSet 
    }
/// fn end
/// initializing winningSet function
winningSet()

 
    /// IIFE start
const getCurrentCpuMove = function(){
    let currentCpuMove
    getCpuMove = function(){
    tempCheck = Number((Math.random() * 10 ).toFixed(0))
    tempCheck === 0 ?
    currentCpuMove = tempCheck + 1
    : tempCheck === 10
    ? currentCpuMove = tempCheck - 1
    : currentCpuMove = tempCheck 
    // clog("Current cpu move is number: " + currentCpuMove)
let tempArray = [] 
tempArray.push( `${currentCpuMove}` )
    // clog( (player1moves.filter( y => tempArray.includes(y) === false).length === player1moves.length) )
    // false means current number is occupied by opponent moves array so invalid
    // while true means current is free to use as move
 
    // clog(currentCpuMove)
 return currentCpuMove
}

for (i = 1; i <= 1000; i++){
    let tempArray = []
    let tempNumber = getCpuMove()
    tempArray.push(`${tempNumber}`)
clog("// " + player1moves + " lenght: " + player1moves.length)
clog( (player1moves.filter( y => !tempArray.includes(y)).length === player1moves.length) )  

let badCpuMove =  (player1moves.filter( y => tempArray.includes(y) === false).length === player1moves.length) === false 
let badCpuMoveSelfOccupied = (player2moves.filter( y => tempArray.includes(y) === false).length === player2moves.length) === false 
let goodCpuMove = (player1moves.filter( y => tempArray.includes(y) === false).length === player1moves.length) === true 
let goodCpuMoveNonSelfOccupied = (player2moves.filter( y => tempArray.includes(y) === false).length === player2moves.length) === true

if ( badCpuMove || badCpuMoveSelfOccupied ) {
    clog("No good number: " + tempArray)
    continue}
else if ( goodCpuMove && goodCpuMoveNonSelfOccupied ) {   
    clog("Great number:" + tempArray)
    validCpuMove = tempNumber 
    clog("final valid cpu number is: " + validCpuMove)

    if(player1moves.length >= 2 ){
    clog("*******")
//let tempCounter = [`${validCpuMove}`]
let realCounterMove
let cpuSelfWinMove
for(set in winnerSet){
    cpuCounter = winnerSet[set].filter(z => !player1moves.includes(z) === true )
    cpuSelfWin = winnerSet[set].filter(o => player2moves.includes(o) === true )
    clog(
    cpuCounter, 
   "sw is this: " + cpuSelfWin   
  
    )
 
if (cpuSelfWin.length === 1 && cpuSelfWin !== undefined ) {
    cpuSelfWinMove = cpuSelfWin 
    clog("sw is: " + cpuSelfWinMove) 
    validCpuMove = Number(cpuSelfWinMove.join())
    clog(validCpuMove)  }

 else if (cpuCounter.length === 1 && cpuCounter !== undefined ) { 
    realCounterMove = cpuCounter 
    clog("rc is: " + realCounterMove)
    validCpuMove = Number(realCounterMove.join())
    clog(validCpuMove)  }
 }
    clog( "******")
}  

    break}

}               


return validCpuMove         
}
/// IIFE end  
 
clog("player moves below: ") 
clog("P1:")     
clog(player1moves) 
clog("P2:")   
clog(cpuMoves)

////////


/// IIFE fn start
let currentBoardState

const updateBoard = () => {
    let tempBoard = gameBoard.filter(i => !player1moves.includes(i)) 
    let updatedBoard = tempBoard.filter(i => !player2moves.includes(i))
    currentBoardState = updatedBoard
    return (currentBoardState) 
    }
/// IIFE fn end

clog(currentBoardState)



/// checking for winner
/// IIFE fn start
checkForWinner = function(){
    for (i in winnerSet){
        player1WinsCondition = winnerSet[i].filter(x => player1moves.includes(x) )
        player2WinsCondition = winnerSet[i].filter(x => player2moves.includes(x) )
       
   if(player1WinsCondition.length === 3){
        clog(" /// Winner is Player1: ")
        clog(player1WinsCondition)
        clog("/// Game OVer")
        finalWinner = player1
        clog("Final winner is " + finalWinner.name)
    }
   else if (player2WinsCondition.length === 3){
        clog(" /// Winner is Player2: ")
        clog(player2WinsCondition)
        clog("/// Game OVer")
        finalWinner = player2
        clog("Final winner is " + finalWinner.name)
    }
    if (player1WinsCondition.length === 3) { clog(player1WinsCondition)}
    if (player2WinsCondition.length === 3) { clog(player2WinsCondition)}
    
   // clog(winnerSet[i])
}
}
/// IIFE fn end

 
const gameBoardUI = document.querySelector(".gameboard-container")
gameBoardUI.addEventListener(
    "click", (e) => {
        e.preventDefault
        clog("Target clicked id is: " +  e.target.id)
        player1moves.push(`${e.target.id.slice(1)}`)
        clog(player1moves)
       e.target.classList.add("occupied")
       e.target.style.cssText = " background-color: yellow; "
      // e.target.append(userMarker)
       clog(e.target.classList) 
       winningSet ()
      let p2move = getCurrentCpuMove()
        player2moves.push(p2move)
        cpuOccupiedCase = document.querySelector(`#c${validCpuMove}`)     
        cpuOccupiedCase.style.cssText = "background-color: blue"  
        updateBoard()
        clog(player1moves)
        clog(player2moves)
        clog(currentBoardState) 
        checkForWinner()      
       
       
       
      
    }
) 




/////////////////////////////////
///Just for internal Logs & debug
clog(
  // currentBoardState,
  // player1moves,
  // player2moves,
    )
//IIFE final return here

if (finalWinner) {return "This Game Winner Is " + finalWinner.name}
if (!finalWinner){return "Game ongoing ..."}
// ("Returns nothing yet!")






}



//////////////////////////////////////////
clog("IIFE <return> Logger: " + ticTacToe())






})()
