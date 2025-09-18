//Step 1; Request a single card
// Step 1: Draw one card from a new shuffled deck
fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
//then convert response into JSON
    .then(res => res.json()) 
    .then(data => {
        const card = data.cards[0]; //add first/only card
        console.log(`${card.value} of ${card.suit}`); // e.g. "QUEEN of HEARTS"
    })
    .catch(err => console.error(err));

// Step 2: Draw two cards from the SAME deck
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
  .then(res => res.json())
  .then(data => {
    const deckId = data.deck_id;

    // Draw the first card
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(firstDraw => {
        const card1 = firstDraw.cards[0];
        console.log(`${card1.value} of ${card1.suit}`);

        // Draw the second card
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
          .then(res => res.json())
          .then(secondDraw => {
            const card2 = secondDraw.cards[0];
            console.log(`${card2.value} of ${card2.suit}`);
          });
      });
  })
  .catch(err => console.error(err));

// interactive HTML page

let deckId = null;

// Create a new shuffled deck when page loads
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id;
    console.log("Step 3: New deck ready:", deckId);
  })
  .catch(err => console.error(err));

// Button event to draw cards
document.getElementById("draw-card").addEventListener("click", () => {
  if (!deckId) return; // deck not ready yet

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
      if (data.remaining === 0) {
        alert("No more cards left!");
      }

      const card = data.cards[0];
      console.log("Step 3 (Drawn):", `${card.value} of ${card.suit}`);

      // Display card image
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = `${card.value} of ${card.suit}`;
      document.getElementById("card-container").appendChild(img);
    })
    .catch(err => console.error(err));
});
  