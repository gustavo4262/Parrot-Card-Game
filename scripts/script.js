let allCardsImg = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
const frontImg = "data/images/front.png";

let numberOfCards, selectedCardIndex, cardsFlipped, numberOfMoves, interval;


function startGame(){
    
    interval = setInterval(() => {
            if (cardsFlipped != numberOfCards) {
                let clock = document.querySelector(".clock h1");
                let value = parseInt(clock.innerHTML);
                clock.innerHTML = value + 1;
            }
        }, 1000);

    selectedCardIndex = -1, cardsFlipped = 0, numberOfMoves = 0;

    numberOfCards = prompt("Quantas cartas quer jogar? (Apenas numeros pares entre 4 e 14)");
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards%2==1) {
        numberOfCards = prompt("Apenas numeros pares entre 4 e 14");
    }

    for (let i=0; i<numberOfCards; i++){
        if( i < numberOfCards/2 )
            createCard(1);
        else
            createCard(2);
    }
    
    allCardsImg.sort( () => Math.random() - 0.5);
    cardsImg = allCardsImg.slice(0, numberOfCards/2);
    cardsImg = cardsImg.concat(cardsImg);
    cardsImg.sort( () => Math.random() -0.5 );

    document.querySelectorAll(".line-cards").forEach( (el) => el.style.width = `${75*numberOfCards}px`);

}

function endGame(){
    alert(`Você ganhou em ${numberOfMoves} jogadas!` );
    let restart = prompt("Deseja reiniciar a partida?");
    if (restart.toLowerCase() == "sim") {
        document.querySelectorAll(".line-cards").forEach( (el) => el.innerHTML = "");
        clearInterval(interval);
        document.querySelector(".clock h1").innerHTML = 0;
        setTimeout(startGame, 10);
    }
}

function createCard(line){
    let img = document.createElement("img");
    img.setAttribute("src", frontImg);
    img.setAttribute("class", "front-card");
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("onclick", "selectCard(this)");
    let deck = document.querySelector(`.line-cards:nth-of-type(${line})`);
    card.appendChild(img);
    deck.appendChild(card);
}

function selectCard(card){
    let index = getIndex(card);
    if (index == selectedCardIndex) {
        return;
    }
    let cardImg = `data/images/${cardsImg[index]}`;
    let flippedCard = document.createElement("img");
    flippedCard.setAttribute("src", cardImg);
    flippedCard.setAttribute("class", "back-card");
    card.appendChild(flippedCard);
    flip(card);
      
    if (selectedCardIndex == -1)
        selectedCardIndex = index;

    else{
        numberOfMoves+=1;
        let selectedCard = getCard(selectedCardIndex);
        let selectedCardImg = selectedCard.lastChild.getAttribute("src");
        if ( cardImg != selectedCardImg ) {
            setTimeout( () => {
                flip(card);
                flip(selectedCard);
                flippedCard.remove();
                selectedCard.lastChild.remove();
            }, 1000);
        }
        else{
            cardsFlipped += 2;
            if (cardsFlipped == numberOfCards) {
                setTimeout(endGame, 100);
            }
        }
        selectedCardIndex = -1;
    }
}

function getIndex(card){
    let index = Array.from(card.parentNode.children).indexOf(card);
    if (card.parentNode != document.querySelector(".line-cards:nth-of-type(1)"))
        index+=numberOfCards/2;
    return index;
}

function getCard(index){
    let line = parseInt(2*index/numberOfCards) + 1;
    let deck = document.querySelector(`.line-cards:nth-of-type(${line})`);
    if (line==2)
        return deck.children[index-numberOfCards/2]
    return deck.children[index];
}

function flip(card){
    if(card.style.transform == "rotateY(180deg)")
        card.style.transform = "rotateY(0deg)";
    else
        card.style.transform = "rotateY(180deg)";
}

startGame();