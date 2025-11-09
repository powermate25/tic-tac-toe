console.log("Welcome!")
clog = console.log
clog("clog now works!")

//////////// Public variables
let player1moves = []
let player2moves = []
player1moves.push("1")
player2moves.push("9")
player1moves.push("6")
player2moves.push("4")
player1moves.push("8")
player2moves.push("5")
player1moves.push("3")
player2moves.push("7")
player1moves.push("2")
// player1moves.push(6)

const ticTacToe = (function(){
// Everything inside here's private
    const gameBoard = ["Ignore-0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

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
        //winset.lenght === 3 return winset
     }
//fn end 
winningSet()

let currentBoardState
//IIFE fn start
const updateBoard = (() => {
   let tempBoard = gameBoard.filter(i => !player1moves.includes(i)) 
   let updatedBoard = tempBoard.filter(i => !player2moves.includes(i))
   currentBoardState = updatedBoard
    return (currentBoardState) 
})()
//IIFE fn end


function checkForWinner (){
clog("player 1 current set is: " + player1moves)
clog("player 2 current set is: " + player2moves) 

currentBoardState.length === 1
&& (player1moves.length === 3 || player2moves.length === 3)
? clog("We got a winner")
: clog("Game still ongoing")

if(currentBoardState.length === 1 && player1moves.length === 3 ){
    clog("Our winner is " + "PLAYER1!")
} else if (currentBoardState.length === 1 && player2moves.length === 3){
    clog("Our winner is " + "PLAYER2!")}


}
checkForWinner ()

//Next filtering playermoves against winning set for true winner...

let player1WinsCondition
let player2WinsCondition
for (i in winnerSet){
    player1WinsCondition = winnerSet[i].filter(x => player1moves.includes(x) )
    player2WinsCondition = winnerSet[i].filter(x => player2moves.includes(x) )

   if( player1WinsCondition.length === 3){
    clog(" /// Winner is Player1: ")
    clog(player1WinsCondition)
    clog("/// Game OVer")
    }
   else if ( player2WinsCondition.length === 3){
    clog(" /// Winner is Player2: ")
    clog(player2WinsCondition)
    clog("/// Game OVer")
    }
   // clog(winnerSet[i])
}



// console.dir(winnerSet)







/////////////////////////////////
///Just for internal Logs & debug
clog(
  // currentBoardState,
  // player1moves,
  // player2moves,
    )
//IIFE final return here
return ("Returns nothing yet!")
}
)(player1moves, player2moves)
 













//////////////////////////////////////////
clog("IIFE <return> Logger: " + ticTacToe)