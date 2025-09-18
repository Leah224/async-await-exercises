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
