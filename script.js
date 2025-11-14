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
/// Game IIFE start
game = (function(){
//game fn inside 

let player1moves = []
let player2moves = []
// let cpuMoves = player2moves
gameStatsDiv = document.querySelector(".game-stats")

resultDialog = document.querySelector(".game-result-dialog")
resultDialog.addEventListener(
    "close", () => {
        resetAll()
    }
)

// Tic tac toe fn start
const ticTacToe = function(){
//Declaring internal dependencies

function makePlayer(name, marker){
    const sayName = () => {return "My name is " + name + "!" }
    score = 0
    return {name, marker, sayName, score}
    }

const player1 = makePlayer("Player1", "X")
const player2 = makePlayer("Diana (CPU)", "O")
const gameBoard = ["Ignore", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let gb = gameBoard

/// Monitoring & Test field start
// Set of winning moves useful for loop checking inside functions
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

// Set of winning combos useful for declaring winner without invoking loops
                winCombo1 = ["1", "2", "3"]
                winCombo2 = ["4", "5", "6"]
                winCombo3 = ["7", "8", "9"]
                winCombo4 = ["1", "4", "7"]
                winCombo5 = ["2", "5", "8"]
                winCombo6 = ["3", "6", "9"]
                winCombo7 = ["1", "5", "9"]
                winCombo8 = ["3", "5", "7"]

let finalWinner

// This function will actively filter player's move set against winCombos to determine final winner and winCombo
function getWinner (){
    clog("Game outcome monitoring ...")
    // checking against player1moves
    // clog("P1 & P2 win condition tracking: ")
    if ( player1moves.filter(i => winCombo1.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo1 )}
    if ( player1moves.filter(i => winCombo2.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo2 )}
    if ( player1moves.filter(i => winCombo3.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo3 )}
    if ( player1moves.filter(i => winCombo4.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo4 )}
    if ( player1moves.filter(i => winCombo5.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo5 )}
    if ( player1moves.filter(i => winCombo6.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo6 )}
    if ( player1moves.filter(i => winCombo7.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo7 )}
    if ( player1moves.filter(i => winCombo8.includes(i)).length === 3){finalWinner = player1, clog("Wins with: " + winCombo8 )}

    // checking against player2moves
    if ( player2moves.filter(i => winCombo1.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo1 )}
    if ( player2moves.filter(i => winCombo2.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo2 )}
    if ( player2moves.filter(i => winCombo3.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo3 )}
    if ( player2moves.filter(i => winCombo4.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo4 )}
    if ( player2moves.filter(i => winCombo5.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo5 )}
    if ( player2moves.filter(i => winCombo6.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo6 )}
    if ( player2moves.filter(i => winCombo7.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo7 )}
    if ( player2moves.filter(i => winCombo8.includes(i)).length === 3){finalWinner = player2, clog("Wins with: " + winCombo8 )}
    // clog("First Winner logger: " + finalWinner)
   return finalWinner
    
}
// initializing test
// getWinner()

/// Monitoring & Test field start

/// Updating game board with more up to date version
// Fn start
let currentBoardState = ""
updateBoard = function(){
    let tempBoard = gameBoard.filter(i => !player1moves.includes(i)) 
    let updatedBoard = tempBoard.filter(i => !player2moves.includes(i))
    currentBoardState = updatedBoard
    clog("current board state: "), clog(currentBoardState)
    return (currentBoardState) 
    }
// Fn end


// Fn start
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
// Fn end

/// CPU moves and checks start inside below scoped function
// Logic: Get -> Check -> Auto-move.
// Fn start
const checkCurrentCpuMove = function(){

for (i = 1; i <= 100; i++){
    let tempArray = []
    let tempNumber = getCurrentCpuMove()
    tempArray.push(`${tempNumber}`)
    // bad & good moves filter logic & conditions
    currCpuMoveInsideP1 = ( player1moves.filter( y => tempArray.includes(y) === false).length === player1moves.length  ) === false
    currCpuMoveInsideP2 = ( player2moves.filter( y => tempArray.includes(y) === false).length === player2moves.length  ) === false
    // clog("is currCpuMoveInsideP2 true or false?"), clog(currCpuMoveInsideP2)

if(!currCpuMoveInsideP1 && !currCpuMoveInsideP2) {
    clog("All checks pass!!! 🏁") 
    validCpuMove = tempNumber
    } else { /* clog("red flag! 🚩") */ continue}

    // self win move check start
let selfWinMove = undefined
clog("self check started: ")
for (set in winnerSet){
    cpuSelfWin = winnerSet[set].filter(z => !player2moves.includes(z) === true )
    cpuSelfWinInsideP1 = ( player1moves.filter( i => i.includes(cpuSelfWin) === false).length === player1moves.length  ) === false
    cpuSelfWinInsideP2 = ( player2moves.filter( i => i.includes(cpuSelfWin) === false).length === player2moves.length  ) === false

if (validCpuMove !== undefined && !currCpuMoveInsideP1 && !currCpuMoveInsideP2 && !cpuSelfWinInsideP1 && !cpuSelfWinInsideP2) {
    // Prevent cpu moving after declared winner by getting most recent winner before pursuing
    getWinner()
    // clog("checking true winner is ... ")
    // clog(player1moves)
    // clog(finalWinner)
    // break
    if(finalWinner !== undefined){clog("There's a winner! CPU can't move further")}
    if (finalWinner === undefined && cpuSelfWin.length === 1 ){
    //At this point player2 won the game
    selfWinMove = cpuSelfWin
    clog("SELF WIN ALERT!!! " + selfWinMove)
    finalWinner = player2
    } else {continue}

} else {continue} }
    // self win move check end

    // counter move check start
let counterMove = undefined
    clog("counter check started: ") 
for (set in winnerSet){
    cpuCounter = winnerSet[set].filter(z => !player1moves.includes(z) === true )
    cpuCounterInsideP1 = ( player1moves.filter( i => i.includes(cpuCounter) === false).length === player1moves.length  ) === false
    cpuCounterInsideP2 = ( player2moves.filter( i => i.includes(cpuCounter) === false).length === player2moves.length  ) === false
    if (finalWinner === undefined && validCpuMove !== undefined && !currCpuMoveInsideP1 && !currCpuMoveInsideP2 && !cpuCounterInsideP1 && !cpuCounterInsideP2 ) {
    if (cpuCounter.length === 1){
    counterMove = cpuCounter
    clog("COUNTER SHOULD BE: " + counterMove)} else {continue}
    } else {continue} }
 
    // Auto cpu decision based on above checks
if(validCpuMove !== undefined && selfWinMove !== undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = selfWinMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    ifFinalResultShowIt()
    break} 


else if (validCpuMove !== undefined && counterMove !== undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = counterMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    ifFinalResultShowIt()
    break}

else if (finalWinner === undefined && validCpuMove !== undefined && selfWinMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    ifFinalResultShowIt()
    break} 

else if (finalWinner === undefined && validCpuMove !== undefined && counterMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    ifFinalResultShowIt()
    break}

else if (finalWinner === undefined && validCpuMove !== undefined && selfWinMove === undefined && counterMove === undefined && !currCpuMoveInsideP2 && !currCpuMoveInsideP1){
    validCpuMove = validCpuMove
    player2moves.push(`${validCpuMove}`)
    clog("Auto moving: " + validCpuMove)
    clog("is currCpuMoveInside true or false? P1 & P2")
    clog(currCpuMoveInsideP1)
    clog(currCpuMoveInsideP2)
    ifFinalResultShowIt()
    break} else {continue}

}
// check end

}
// Fn end

/// showing result function based on outcomes
const scoreDiv = document.querySelector(".score-div")
// Fn start
function ifFinalResultShowIt(){
    getWinner()
    if(finalWinner === undefined && currentBoardState.length === 1){
    resultDialog.replaceChildren("It's a draw! Good luck next time... 😇")
    resultDialog.showModal()
    }
    else if(finalWinner !== undefined){
    resultDialog.replaceChildren("Final winner is " + finalWinner.name + " " + "🥳")
    resultDialog.showModal()
  }
}
// Fn end

// Fn start
checkForWinner = function(){
    clog(currentBoardState)
    getWinner()
    if(finalWinner){
    clog(" /// Winner is:" +  finalWinner)
    clog("/// Game Over")
    clog("Congratulations " + finalWinner.name)
    resultDialog.replaceChildren("Final winner is " + finalWinner.name)
    resultDialog.showModal()

    if (currentBoardState.length === 1 ){
    clog(" /// There's no winner this time: ")
    clog("/// Game Over")
    finalWinner = "No winner this time!"
    clog(" It's a draw... " + finalWinner)
    resultDialog.replaceChildren(" It's a draw... " + finalWinner)
    resultDialog.showModal()}  }
}
// Fn end

/// Handling UI still inside Game fn
/// gameBoard UI fn start 
const gameBoardContainer = document.querySelector(".gameboard-container")

// function updateDisplay start
// Fn start
updateDisplay = function (){
    //styling player1 selections
    player1moves.forEach(
    i => {
    caseId = document.querySelector(`#c${Number(i)}`)
    if (caseId !== null){
    caseId.style.cssText = "background-color: yellow"
    circleMarker = document.createElement("img")
    circleMarker.src = "./images/circle.svg"
    caseId.replaceChildren(circleMarker)
    } }
    ) 
    //styling player2 selections
    player2moves.forEach(
    i => {
    caseId = document.querySelector(`#c${Number(i)}`)
    if (caseId !== null){
    caseId.style.cssText = "background-color: oklch(54.6% 0.245 262.881)"
    crossMarker = document.createElement("img")
    crossMarker.src = "./images/cross.svg"
    caseId.replaceChildren(crossMarker)
    } }
    )
}
// Fn end

/// Event Listeners
cpuFirstBtn = document.querySelector(".cpu-first")
cpuFirstBtn.addEventListener(
    "click", () => {
    resetAll()
    updateDisplay()
    checkCurrentCpuMove()
    clog("Player1moves: " ), clog(player1moves)
    clog("Player2moves: " ), clog(player2moves)
    updateBoard()
    clog("current board state: "), clog(currentBoardState)
    updateDisplay()  
    checkForWinner()
    }
)

    // current challenge
const caseButtons = document.querySelectorAll(".gameboard-container .case")
caseButtons.forEach(
    i => {
    i.addEventListener("click", () => {
    if (i.innerHTML === ""){
    clog("Target clicked id is: " +  i.id)
    player1moves.push(`${i.id.slice(1)}`)
    checkCurrentCpuMove()
    clog("Player1moves: " ), clog(player1moves)
    clog("Player2moves: " ), clog(player2moves)
    updateBoard()
    updateDisplay()
    ifFinalResultShowIt()}
    trackUserScoreInARow()
    } )
    }
)

/// routine board update
updateBoard()


/// Declaring reset function
const allCase = document.querySelectorAll(".case")
resetAll = function (){
    finalWinner = undefined
    player1moves = []
    player2moves = []
    currentBoardState = gameBoard
    player1.score = ""
    allCase.forEach(
    i => {i.style.backgroundColor = ""
    i.replaceChildren("") })
    updateDisplay()
}

/// Miscellaneous & extra functions
const editPlayerBtn = document.querySelector(".edit-player")

/// Edit player name
function editPlayerName (){
    let tempName = prompt("Edit your player name", `${player1.name}`)
    if(tempName !== null){player1.name = tempName}
    else { return}
}

editPlayerBtn.addEventListener("click", ()=> {
    editPlayerName()
    //alert(player1.name)
})

/// Restart game button
const restartGameBtn = document.querySelector(".restart-game")
restartGameBtn.addEventListener("click", () => {
    let userResponse = confirm("🚨 Your score in a row will reset! \nContinue?")
    if (userResponse === true){
    player1.score = ""
    scoreDiv.replaceChildren(player1.score)
    resetAll()
    } else {return}
    
})

/// Player Score Tracking
function trackUserScoreInARow(){
    let winCheckP1
    let winCheckP2
    for (set in winnerSet){
    if( winCheckP1 = player1moves.filter( i => winnerSet[set].includes(i) === true).length === 3){
    player1.score = (Number(player1.score) + 1)
    scoreDiv.replaceChildren(player1.score) }

    if(winCheckP2 = player2moves.filter( i => winnerSet[set].includes(i) === true).length === 3){
    player1.score = 0
    scoreDiv.replaceChildren(player1.score) }

    if(winCheckP1 !== 3 && winCheckP2 !== 3 && currentBoardState.length === 1){
    player1.score = 0
    scoreDiv.replaceChildren(player1.score) } 
}
    
}
/// gameBoard UI fn end
}
/// Tic tac toe fn end. (function now ready to be initialize in main Game fn scope)
ticTacToe()
})()
///Game IIFE end

