const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //card isn't clicked
let firstCard, secondCard;

// this function flips the card when clicked
function flipCard() {
  if (lockBoard) return; //once clicked lockBoard is now true and will prevent any card flipping before the cards are hidden or matched.
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
function checkForMatch() { //checks if cards match
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
     disableCards();
     return;
   }

   unflipCards(); //flips cards back if the dont match
}
 function disableCards() { //prevents further flipping
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
   resetBoard();
}

 function unflipCards() { //flips cards back
   lockBoard = true;
   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
     resetBoard();
   }, 1500);
}

function resetBoard() { //using destructuring assignment syntax
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { //randomly places cards
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
   card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
