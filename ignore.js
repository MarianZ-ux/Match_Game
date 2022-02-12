/***  appendNewCard(parentElement)*/

function appendNewCard(parentElement) {
  // Step 1: Make a variable for the card element. Assign it to a new div element.
  let cardElement = document.createElement("div");
  // Step 2: Add the "card" class to the card element.
  cardElement.classList.add("card");
  // Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of the card element.
  cardElement.innerHTML = `
  '<div class="card-down"></div>'
  '<div class="card-up"></div>';`
  // Step 4: Append the card element to the parentElement, making the card element a "child".
  parentElement.appendChild(cardElement);
  // Step 5: Return the card element.
  return cardElement;
}
appendNewCardTest();

//shuffle
function shuffleCardImageClasses() {
  
  // Step 1: Initialize an array of 2 of each image class strings in-order (e.g. "image-1", "image-1", "image-2"...)
  let imgArray = ["image-1", "image-1", "image-2","image-2",  "image-2", "image-3","image-3", "image-4", "image-4","image-5", "image-5", "image-6","image-6"]

  let shuffledArray = _.shuffle(imgArray);
  // Step 3: Return the shuffled array of class names.
  return shuffledArray;
}
shuffleCardImageClassesTest();

function createCards(parentElement, shuffledImageClasses) {
  // Step 1: Make an empty array to hold our card objects.
  let cardArray = [];
  // Step 2: Loop 12 times to create the 12 cards we need.
  for (let i = 0; i < 12; i++) {
  // Step 2(a): create/append a new card = appendNewCard to   store the result in a variable.
  let newCard = appendNewCard(parentElement);
    // Step 2(b): new card element, Add an image class using shuffledImageClasses[i] 
  newCard.classList.add(shuffledImageClasses[i]);
    /* Step 2(c): Create a new cardObject representing this. This should have properties for:
       "index" -- what iteration of the loop is this,
       "element" -- the dom element for the card,
       "imageClass" -- the string of the image class on the card.*/
let cardObject= {
  index:i,
  element: newCard,
  imageClass: shuffledImageClasses[i]};
    // Step 2(d): Append the new cardObject to the array of card objects.
  cardArray.push(newCard);
}
  // Step 3: Return the array of 12 card objects.
  return cardArray;
};
createCardsTest();

/***  doCardsMatch */
function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass == cardObject2.imageClass)
  { 
    return true;
  }
  else {return  false;
  }
}
doCardsMatchTest();

/* An object used below as a dictionary to store counter names and their respective values.  Do you remember using objects as dictionaries? If not, go back to that lecture to review. */
  let counters = {};

/***  incrementCounter */

function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, add it with a value of 0.
  if (counters[counterName]==undefined){
    counters[counterName]=0;
  }
  // Step 2: Increment the counter for 'counterName'.
  counters[counterName]++;
  // Step 3: Change the DOM within 'parentElement' to display the new counter value.
  parentElement.innerHTML = counters[counterName];
}
//incrementCounterTest();

/* Variables storing an audio objects to make the various sounds. See how it's used for the 'click' sound in the provided function below.  */
  let clickAudio = new Audio('audio/click.wav');
  let matchAudio = new Audio('audio/match.wav');
  let winAudio = new Audio('audio/win.wav');

/***  flipCardWhenClicked*/
function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
 (cardObject.element.onclick = function() {
  // Card is already flipped, return.
  if (cardObject.element.classList.contains("flipped")) {
    return clickAudio.play()
    // Play the "click" sound.
    
    // Add the flipped class immediately after a card is clicked.
  if (cardObject.element.classList.add("flipped"))
    // Wait 500ms (1/2 of a second) for the flip transition to complete, then call onCardFlipped.
    setTimeout(function() {
    // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject)
       500;})
//   } 
// } 
  
//onCardFlipped
function onCardFlipped(newlyFlippedCard) {
// Step 1: Add one to the flip counter UI
  incrementCounter("flips", document.getElementById("flip-count"));
  let lastCardFlipped = (null); 
  let newlyCardFlipped = (null); 

// Step 2: If this is the first card flipped, then remember that card using the 'lastCardFlipped' variable and return (nothing else to do).
  if (lastCardFlipped) {
      lastCardFlipped = newlyFlippedCard;return; 
      }
// Otherwise, we know there are two cards flipped that should be stored in 'lastCardFlipped' + 'newlyFlippedCard'.
// Step 3: If the cards don't match, then remove the "flipped" class from each, reset 'lastCardFlipped', and return.
    if (!doCardsMatch(lastCardFlipped)(newlyFlippedCard) == true) {
        lastCardFlipped.element.classList.remove("flipped");
        newlyCardFlipped.element.classList.remove("flipped");
        lastCardFlipped = null;
        return;
    }
// Otherwise, we have two matching cards.
// Step 4: Increment the match counter. optional: add "glow" effect to the matching cards.
    else {
      incrementCounter("matches"), document.getElementById("match-count");
      lastCardFlipped.element.classList.add("glow");
      newlyCardFlipped.element.classList.add("glow");
    }
  }

// Step 5: Play either win audio or match audio based on whether the user has the number of matches needed to win.
  if (document.getElementById("match-count").innerHTML == 6) {
  winAudio.play();
  }
  // Step 6: Reset 'lastCardFlipped'.
  else {
    matchAudio.play();
    lastCardFlipped = null; 
    reset = (lastCardFlipped = null);
  }
}
// Set up the game.
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
 }
}
// runAllTests()