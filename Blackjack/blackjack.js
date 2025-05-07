//Credit https://youtu.be/bMYCWccL-3U

var dealerSum=0
var yourSum=0

var dealerAceCount=0
var yourAceCount=0

var hidden
var deck

var canHit=true

window.onload=function(){
    buildDeck()
    shuffleDeck()
    startGame()
}

const playAgain = document.querySelector("#playAgain")
playAgain.addEventListener("click",()=>{
    window.location.reload()
})

function buildDeck(){
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
let types = ["C","D","H","S"]
deck = []

for (let i = 0; i < types.length; i++){
for (let j = 0; j < values.length;j++){
    deck.push(values[j]+"-"+types[i])
}
}
}

function shuffleDeck(){
    for(let i = 0;i<deck.length;i++) {
        let j = Math.floor(Math.random()*deck.length)
        let temp = deck[i]
        deck[i]=deck[j]
        deck[j]=temp
    }
}

function startGame(){
    hidden=deck.pop()
    dealerSum+=getValue(hidden)
    dealerAceCount += checkAce(hidden)

    let dealerFirstCard = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src="./cards/" + dealerFirstCard + ".png"
    dealerSum += getValue(dealerFirstCard)
    dealerAceCount += checkAce(dealerFirstCard)
    document.getElementById("dealer-cards").append(cardImg)

    while (dealerSum < 17){
        let cardImg = document.createElement("img")
        let card = deck.pop()
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card)
        document.getElementById("dealer-cards").append(cardImg)
    }
    document.getElementById("dealer-sum").innerText = getValue(dealerFirstCard) + "?";
for (let i =0;i<2;i++){
    let cardImg = document.createElement("img")
        let card = deck.pop()
        cardImg.src = "./cards/" + card + ".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById("your-cards").append(cardImg)
}
document.getElementById("your-sum").innerText = yourSum; 

document.getElementById("hit").addEventListener("click",hit)
document.getElementById("stay").addEventListener("click",stay)
}

function hit(){
    if(!canHit){
        return
    }
    let cardImg = document.createElement("img")
        let card = deck.pop()
        cardImg.src = "./cards/" + card + ".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById("your-cards").append(cardImg)

        yourSum = reduceAce(yourSum, yourAceCount);
        document.getElementById("your-sum").innerText = yourSum;

        if (reduceAce(yourSum,yourAceCount)> 21){
            canHit = false
        }
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount)
    yourSum = reduceAce(yourSum, yourAceCount)

    canHit = false
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"

    document.getElementById("dealer-sum").innerText = dealerSum;

    document.getElementById("your-sum").innerText = yourSum;

    let message = ""
    if(yourSum > 21){
        message = "Skill issue!"
    }
    else if (dealerSum > 21){
        message = "Epic Victory Royale!"
    }
    else if (yourSum == dealerSum){
        message = "Draw deez nutz!"
    }
    else if (yourSum>dealerSum){
        message = "Lucky bastard!"
    }
    else if (yourSum<dealerSum){
        message = "What are you gonna cry? Little baby man!!"
    }
    document.getElementById("dealer-sum").innerText = dealerSum
    document.getElementById("your-sum").innerText = yourSum
    document.getElementById("results").innerText = message
}


function getValue(card){
    let data = card.split("-")
    let value = data[0]

    if(isNaN(value)){
        if (value == "A"){
            return 11
        }
        return 10
    }
    return parseInt(value)
}

function checkAce(card){
    if (card[0] =="A"){
        return 1
    }
    return 0
}

function reduceAce(playerSum, playerAceCount){
    while (playerSum > 21 && playerAceCount > 0){
        playerSum -=10
        playerAceCount -=1
    } 
    return playerSum
}

