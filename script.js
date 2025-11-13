console.log("Welcome!")
clog = console.log
clog("clog now works!")

//testing 
/* player1moves.push("3")
player2moves.push("1")
player1moves.push("5")
player2moves.push("7") 
player1moves.push("9") */
//testing 

/// Everything below's private
///Game IIFE start
game = (function(){
//game fn inside 

let player1moves = []
let player2moves = []
// let cpuMoves = player2moves
// Tic tac toe fn start
const ticTacToe = function(){
function makePlayer(name, marker){
    const sayName = () => {return "My name is " + name + "!" }
    return {name, marker, sayName}
    }

const player1 = makePlayer("Bob", "X")
const player2 = makePlayer("Diana", "O")

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


// Update the game board with more up to date version
/// IIFE fn start
let currentBoardState = ""
updateBoard = function(){
    let tempBoard = gameBoard.filter(i => !player1moves.includes(i)) 
    let updatedBoard = tempBoard.filter(i => !player2moves.includes(i))
    currentBoardState = updatedBoard
    clog("curr board state: "), clog(currentBoardState)
    return (currentBoardState) 
    }
/// IIFE fn end


/// IIFE fn start
let validCpuMove = undefined
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


if(!currCpuMoveInsideP1 && !currCpuMoveInsideP2) {
    clog("All checks pass!!! 🏁") 
    validCpuMove = tempNumber
    // player2moves.push(`${validCpuMove}`)
    clog(validCpuMove)
    } else { /* clog("red flag! 🚩") */ continue}

// self win move check start
let selfWinMove = undefined
clog("self check started: ")
for (set in winnerSet){
    cpuSelfWin = winnerSet[set].filter(z => !player2moves.includes(z) === true )
    cpuSelfWinInsideP1 = ( player1moves.filter( i => i.includes(cpuSelfWin) === false).length === player1moves.length  ) === false
    cpuSelfWinInsideP2 = ( player2moves.filter( i => i.includes(cpuSelfWin) === false).length === player2moves.length  ) === false
    // clog("cpuSelfWinInsideP1 is: "), clog(cpuSelfWinInsideP1)  
    if (validCpuMove !== undefined && !currCpuMoveInsideP1 && !currCpuMoveInsideP2 && !cpuSelfWinInsideP1 && !cpuSelfWinInsideP2) {
    // cpuSelfWin = winnerSet[set].filter(z => !player2moves.includes(z) === true )
    if (cpuSelfWin.length === 1 ){
    selfWinMove = cpuSelfWin
    clog("SELF WIN ALERT!!! " + selfWinMove)} else {continue}
    } else {continue} }
    // self win move check end

    // counter move check start
let counterMove = undefined
    clog("counter check started: ") 
for (set in winnerSet){
    cpuCounter = winnerSet[set].filter(z => !player1moves.includes(z) === true )
    cpuCounterInsideP1 = ( player1moves.filter( i => i.includes(cpuCounter) === false).length === player1moves.length  ) === false
    cpuCounterInsideP2 = ( player2moves.filter( i => i.includes(cpuCounter) === false).length === player2moves.length  ) === false
    if (validCpuMove !== undefined && !currCpuMoveInsideP1 && !currCpuMoveInsideP2 && !cpuCounterInsideP1 && !cpuCounterInsideP2 ) {
    // cpuCounter = winnerSet[set].filter(z => !player1moves.includes(z) === true )
    if (cpuCounter.length === 1){
    counterMove = cpuCounter
    clog("COUNTER SHOULD BE: " + counterMove)} else {continue}
    } else {continue} }
 
    /// Auto cpu decision based on above checks

if(validCpuMove !== undefined && selfWinMove !== undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = selfWinMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    break} 


else if (validCpuMove !== undefined && counterMove !== undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = counterMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    
    break}

else if (validCpuMove !== undefined && selfWinMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    break} 

else if (validCpuMove !== undefined && counterMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    
    break}

else if (validCpuMove !== undefined && selfWinMove === undefined && counterMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    break} else {continue}

}
//check end

}
/// function end

/// checking for winner
/// IIFE fn start

let finalWinner
checkForWinner = function(){
    // clog("Game outcome monitoring ...")
    // clog(player1moves), clog(player2moves)
    for (i in winnerSet){
        clog("Win conditions: ")
        clog( player1WinsCondition = winnerSet[i].filter(x => player1moves.includes(x) )  )
        clog( player2WinsCondition = winnerSet[i].filter(z => player2moves.includes(z) ) )
       
   if (player1WinsCondition.length === 3){
        clog(" /// Winner is Player1: ")
        clog(player1WinsCondition)
        clog("/// Game Over")
        finalWinner = player1
        clog("Final winner is " + finalWinner.name)
    }
   if (player2WinsCondition.length === 3){
        clog(" /// Winner is Player2: ")
        clog(player2WinsCondition)
        clog("/// Game Over")
        finalWinner = player2
        clog("Final winner is " + finalWinner.name)
    }

    if (currentBoardState.length === 1 && player1WinsCondition.length < 3 && player2WinsCondition.length < 3 ){
        clog(" /// There's no winner this time: ")
        clog("/// Game Over")
        finalWinner = "No winner this time!"
        clog(" It's a draw... " + finalWinner)
    }
    if (player1WinsCondition.length === 3) { clog(player1WinsCondition)}
    if (player2WinsCondition.length === 3) { clog(player2WinsCondition)}
    return finalWinner
} }
/// IIFE fn end

// game fn inside still
/// gameBoard UI fn start 
const gameBoardContainer = document.querySelector(".gameboard-container")

// function updateDisplay start
updateDisplay = function (){
      //styling player1 selections
    player1moves.forEach(
        i => {
        caseId = document.querySelector(`#c${Number(i)}`)
        caseId.style.cssText = "background-color: yellow"
        circleMarker = document.createElement("img")
        circleMarker.src = "./images/circle.svg"
        caseId.replaceChildren(circleMarker)
        }
    ) 
    //styling player2 selections
    player2moves.forEach(
        i => {
        caseId = document.querySelector(`#c${Number(i)}`)
        caseId.style.cssText = "background-color: oklch(54.6% 0.245 262.881)"
        crossMarker = document.createElement("img")
        crossMarker.src = "./images/cross.svg"
        caseId.replaceChildren(crossMarker)
        }
    )
    checkForWinner()
}
// function update end

cpuFirstBtn = document.querySelector(".cpu-first")
cpuFirstBtn.addEventListener(
    "click", () => {
        resetAll()
        updateDisplay()
        checkCurrentCpuMove()
        checkForWinner()
        clog("Player1moves: " ), clog(player1moves)
        clog("Player2moves: " ), clog(player2moves)
        updateBoard()
        clog("current board state: "), clog(currentBoardState)
        updateDisplay()  
        checkForWinner()
    }
)

gameBoardContainer.addEventListener(
    "click", (e) => {
        e.preventDefault
        clog("Target clicked id is: " +  e.target.id)
        player1moves.push(`${e.target.id.slice(1)}`)
        e.target.classList.add("occupied")
        checkForWinner()
        checkCurrentCpuMove()
        clog(validCpuMove)
        clog("Player1moves: " ), clog(player1moves)
        clog("Player2moves: " ), clog(player2moves)
        updateBoard()
        clog("current board state: "), clog(currentBoardState)   
        updateDisplay()
        checkForWinner()
    }
)

updateBoard()
const allCase = document.querySelectorAll(".case")

resetAll = function (){
    player1moves = []
    player2moves = []
    currentBoardState = gameBoard
    allCase.forEach( i => i.style.backgroundColor = "" )
    updateDisplay()
}

/// gameboard UI fn end
}

// Tic tac toe fn end
//////////////////////////////////////////
clog("IIFE <return> Logger: " + ticTacToe())
///game fn inside
})()
///Game IIFE end

