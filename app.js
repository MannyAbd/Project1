const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockedIn = false; //card isn't clicked
let firstCard, secondCard;

function flipCard() { // this function flips the card when clicked
  if (lockedIn) return; //once clicked lockedIn is now true and will prevent any card flipping before the cards are hidden or matched.
  if (this === firstCard) return; // checks if clicked card is equal to the firstCard and return if positive.
  this.classList.add('flip');
  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;  //This is for clicking the first card
  }
    secondCard = this; //flips the second card
    checkForMatch();
}
const checkForMatch = () => { //checks if cards match
   if (firstCard.dataset.framework ===  secondCard.dataset.framework) { //if first cards data.framework matches second cards data.framework then disable cards from being clicked
     disableCards();
     return;
   }

   unflipCards(); //flips cards back if the dont match
}
const disableCards = () => { //prevents further flipping
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
   resetBoard();
}

const unflipCards = () => { //flips cards back
   lockedIn = true;
   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
     resetBoard();
   }, 1500);
}

const resetBoard = () => { //using destructuring assignment syntax
  [hasFlippedCard, lockedIn] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { //randomly places cards
  cards.forEach(card => {
    let randomCard = Math.floor(Math.random() * 12);
   card.style.order = randomCard;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
