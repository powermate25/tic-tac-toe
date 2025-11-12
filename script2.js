console.log("Welcome!")
clog = console.log
clog("clog now works!")

let player1moves = []
let player2moves = []
let cpuMoves = player2moves

//testing 
/* player1moves.push("3")
player2moves.push("1")
player1moves.push("5")
player2moves.push("7") 
player1moves.push("9") */
//testing 

/// Everything below's private
game = (function(){
///game fn start
//game fn inside

const ticTacToe = function(){

function makePlayer(name, marker){
    const sayName = () => {return "My name is " + name + "!" }
    return {name, marker, sayName}
    }

const player1 = makePlayer("Bob", "X")
const player2 = makePlayer("Diana", "O")
let validCpuMove
const gameBoard = ["Ignore", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let gb = gameBoard
let winnerSet = {
            1: [`${gb[1]}`, `${gb[2]}`, `${gb[3]}` ],
            2: [`${gb[4]}`, `${gb[5]}`, `${gb[6]}` ],
            3: [`${gb[7]}`, `${gb[8]}`, `${gb[9]}` ],
            4: [`${gb[1]}`, `${gb[4]}`, `${gb[7]}` ],
            5: [`${gb[2]}`, `${gb[5]}`, `${gb[8]}` ],
            6: [`${gb[3]}`, `${gb[6]}`, `${gb[9]}` ],
            7: [`${gb[1]}`, `${gb[5]}`, `${gb[9]}` ],
            8: [`${gb[3]}`, `${gb[5]}`, `${gb[7]}` ],
                 }

clog(winnerSet)
let player1WinsCondition = winnerSet
let player2WinsCondition = winnerSet

// Update the game board with more up to date version
/// IIFE fn start
let currentBoardState
updateBoard = (function(){
    let tempBoard = gameBoard.filter(i => !player1moves.includes(i)) 
    let updatedBoard = tempBoard.filter(i => !player2moves.includes(i))
    currentBoardState = updatedBoard
    clog(currentBoardState)
    return (currentBoardState) 
    })()
/// IIFE fn end


/// checking for winner
/// IIFE fn start
let finalWinner
checkForWinner = (function(){
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
    return finalWinner
} })()
/// IIFE fn end

/// IIFE fn start
let currentCpuMove
getCurrentCpuMove = function(){
    tempCheck = Number((Math.random() * 10 ).toFixed(0))
    tempCheck === 0 ?
    currentCpuMove = tempCheck + 1
    : tempCheck === 10
    ? currentCpuMove = tempCheck - 1
    : currentCpuMove = tempCheck
let tempArray = [] 
tempArray.push( `${currentCpuMove}` )
 return currentCpuMove
}
/// IIFE fn end

// clog("Player1moves: " ), clog(player1moves)
// clog("Player2moves: " ), clog(player2moves)

/// function start
const checkCurrentCpuMove = function(){
/// check start
for (i = 1; i <= 1000; i++){
    let tempArray = []
    let tempNumber = getCurrentCpuMove()
  // clog("getCurrentCpuMove is: "), clog(tempNumber)
    tempArray.push(`${tempNumber}`)
 // clog("tempArray is: "), clog(tempArray)

/// bad & good moves filter logic & conditions
currCpuMoveInsideP1 = ( player1moves.filter( y => tempArray.includes(y) === false).length === player1moves.length  ) === false
// clog("is currCpuMoveInsideP1 true or false?"), clog(currCpuMoveInsideP1) 
currCpuMoveInsideP2 = ( player2moves.filter( y => tempArray.includes(y) === false).length === player2moves.length  ) === false
// clog("is currCpuMoveInsideP2 true or false?"), clog(currCpuMoveInsideP2)

      // counter move check start
let counterMove = undefined
if (!currCpuMoveInsideP1 && !currCpuMoveInsideP2 && player1moves.length === 2) {
    
    clog("counter opportunity now") 
    for (set in winnerSet){
        cpuCounter = winnerSet[set].filter(z => !player1moves.includes(z) === true )
        if (cpuCounter.length === 1){
        clog("counter should be: " + cpuCounter)
        counterMove = cpuCounter
        validCpuMove = counterMove
        player2moves.push(`${validCpuMove}`)
        }
        else {counterMove = undefined}
    }
    break }
    // counter move check end
    
if(!currCpuMoveInsideP1 && !currCpuMoveInsideP2 && counterMove === undefined) {
    clog("All checks pass!!! 🏁") 
    validCpuMove = tempNumber
    player2moves.push(`${validCpuMove}`)
    clog(validCpuMove)
    break}
else {
  //  clog("red flag! 🚩")
     continue}
    }
//check end


}
/// function end

// game fn inside still
/// gameBoard UI fn start 
const gameBoardUI = document.querySelector(".gameboard-container")
clog("player2moves: "), clog(player2moves)
//styling player1 selections
updateDisplay = function (){
player2moves.forEach(
    i => {
       caseId = document.querySelector(`#c${Number(i)}`)
       caseId.style.cssText = "background-color: green"
        }
)
//styling player2 selections
player1moves.forEach(
    i => {
       caseId = document.querySelector(`#c${Number(i)}`)
       caseId.style.cssText = "background-color: yellow"
        }
)
}

gameBoardUI.addEventListener(
    "click", (e) => {
        e.preventDefault
        clog("Target clicked id is: " +  e.target.id)
        player1moves.push(`${e.target.id.slice(1)}`)
        e.target.classList.add("occupied")
       checkCurrentCpuMove()
       clog(validCpuMove)
       clog("Player1moves: " ), clog(player1moves)
       clog("Player2moves: " ), clog(player2moves)
       updateDisplay()
    }
)
/// gameboard UI fn start 
}

//////////////////////////////////////////
clog("IIFE <return> Logger: " + ticTacToe())
///game fn end
})()