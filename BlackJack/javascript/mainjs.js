
// initial bet
var cur = 0;
var old_html1 = "hii";
var old_html2 = "hlo";
// Redirect to web page for more games
function MoreGames(){
    window.location="https://www.247games.com/";
}

// When user wnat to start the game from the home Page 
// it will not open in new page but it will open in iframe for the set betting 
function Play(){

    document.getElementById("homeFrame").style.display= "none";
    document.getElementById("betting").style.display= "";
    
}
// redirect to home page
function Home(){
    Restart();
    document.getElementById("homeFrame").style.display= "";
    document.getElementById('betting').style.display="none";
    document.getElementById('mainContent').style.display = "none";
}

// user can restart the at in point of time
function Restart(){
    cur = 0;
    Start();
    document.getElementById("homeFrame").style.display= "none";
    document.getElementById('mainContent').style.display = "none";
    document.getElementById('betting').style.display="";
    document.getElementById('betting').innerHTML = old_html1;

    //window.location="#betting";
    //window.location = "#betting" ;
}

// help user to get hit or stand
function Help(){
    if(player1Point >=17){
        alert("Go for Stand");
    }
    else{
        alert("Go For Hit");
    }
}

// restrict user to not more than 5000$ bet
function CalculateDeal(amount){
    cur = cur + parseInt(amount);

    if(cur>5000){
        cur = 5000;
    }
    
    document.getElementById("Bet").innerHTML = "Total Bet: "+cur +"$";

    if(cur != 0){

        document.getElementById("dealButton").style.display= "";
    }

}

//redirect to game page
function Deal(){

    document.getElementById('betting').style.display="none";
    document.getElementById('mainContent').style.display="";
}

// javascript for main.html


var suits ;
var values ;
var deck ;
var players ;
var totalPlayer ;
var player1Point ;
var player2Point ;
var winner ;

// creating the deck of card
function CreateDeck(){
    
    for (var i = 0 ; i < values.length; i++){
        
        for(var j = 0; j < suits.length; j++){
            var weight = 0;
            var identity = values[i] + suits[j];
            
            if(values[i] == "J" || values[i] == "K" || values[i] == "Q"){
                weight = 10;
            }
            else if(values[i] == "A"){
                weight = 11;
            }
            else{
                weight = parseInt(values[i]);
            }

            // for a particular card set it's identity and weight in the form of dictionary
            var card = { Identity: identity, Weight:weight };

            // add card to the deck
            deck.push(card);
        }
    }
}

// shuffle the deck 
function ShuffleDeck(){
    for (var i = 0; i < 5000; i++){
        var index1 = Math.floor((Math.random() * deck.length));
        var index2 = Math.floor((Math.random() * deck.length));
        var temp = deck[index1];

        deck[index1] = deck[index2];
        deck[index2] = temp;
    }
}

// check if is any player is winning
function IsGameOver(){

    // before checking update the points of both the players
    UpdatePoint();

    // it will check only if pints of player to greater than 17
    if(player2Point == player1Point){
         End();
    }

    else if(player1Point > 21){
        winner = 2;
        End();
    }

    else if(player2Point > 21){
        winner = 1;
        End();
    }

    else if(player2Point > player1Point){
        winner = 2;
        End();
        
    }

    else {
        winner = 1;
        End();
        
    }
}

// funtion to show the points of both the players to screen
function UpdatePoint(){

    document.getElementById('player1Points').innerHTML = "Points :" + player1Point;
    document.getElementById('player2Points').innerHTML = "Points :" + player2Point;
}

// when the user want to hit
function Hit(){
    
    // shuffle the deck before hitting
    ShuffleDeck();

    // create element img to show the card while hitting
    var img = document.createElement('img'); 

    // pop the card from the deck
    var card = deck.pop();

    // find the identity of the card
    var identity = card.Identity;

    // find the weight associated with the card and added it to player point
    player1Point += card.Weight;

    var path = "../resources/JPEG/"+identity+".jpg";
    img.src = path;

    document.getElementById('player1').appendChild(img); 

    // call UpdatePoint() to show the points of both the player to screen
    UpdatePoint();
    if(player1Point == 21 && player2Point == 21){
         End();
    }
    else if(player1Point == 21){
        winner = 1;
        End();
        
    }
    else if(player1Point > 21){
        winner = 2;
        End();
        
    }
}

// when the user click on Stand
function StandClick(){
    while(player2Point < 17){
        Stand();
    }
    // check if any player is winning
    IsGameOver();
}

// stand 
function Stand(){


    //shuffle the before taking stand
    ShuffleDeck();

    var img = document.createElement('img'); 

    // pop the card from the deck
    var card = deck.pop();

    // find the identity of the card
    var identity = card.Identity;

    // find the weight associated with the card and added it to player point
    player2Point += card.Weight;

    var path = "../resources/JPEG/"+identity+".jpg";
    img.src = path;
    document.getElementById('player2').appendChild(img); 

     // call UpdatePoint() to show the points of the player to screen
    UpdatePoint();
}

function End(){

    if(winner){
        document.getElementById('result').innerHTML = "Player " + winner +" Wins "+ cur+"$";
    }
    else{
        document.getElementById('result').innerHTML = "Ties";
    }
    document.getElementById('hitButton').disabled = true;
    document.getElementById('standButton').disabled = true;
    document.getElementById('player1').style.opacity = "0.3";
    document.getElementById('player2').style.opacity = "0.3";
    setTimeout(Restart, 4000);
}

function Start(){
    document.getElementById('mainContent').innerHTML= old_html2;
    suits = ["S", "H", "D", "C"];
    values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    deck = new Array();
    players = new Array();
    totalPlayer = 2;
    player1Point = 0;
    player2Point = 0;
    winner = 0;
    CreateDeck();
    ShuffleDeck();
    Hit();
    ShuffleDeck();
    Hit();
    ShuffleDeck();
    Stand();
    ShuffleDeck();
    Stand();
    ShuffleDeck();
    UpdatePoint();
}
// on load page  
// when the game starts both the player will 2 cards in hand

window.addEventListener('load', function(){

    old_html2 = document.getElementById('mainContent').innerHTML;
    Start();
    old_html1 = document.getElementById('betting').innerHTML;
    
});