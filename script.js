
// Randomize the order of cards
let main = document.querySelector('main');
for (var i = main.children.length; i >= 0; i--) {
    main.appendChild(main.children[Math.random() * i | 0]);
}

// Flip the card on click
const cards = document.querySelectorAll('.flip-card-inner');



 let hasFlippedCard = false;
 let lockBoard = false;
 let firstCard, secondCard;

 function flipCard() {
   if (lockBoard) return;
   if (this === firstCard) return;

   this.classList.add('active');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
   }

   secondCard = this;
   lockBoard = true;

   checkForMatch();
 }

 function checkForMatch() {
   let isMatch = firstCard.dataset.char === secondCard.dataset.char;
   isMatch ? disableCards() : unflipCards();
 }

 function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
 }

 function unflipCards() {
   setTimeout(() => {
     firstCard.classList.remove('active');
     secondCard.classList.remove('active');

     resetBoard();
   }, 1500);
 }

 function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }

 cards.forEach(card => card.addEventListener('click', flipCard));