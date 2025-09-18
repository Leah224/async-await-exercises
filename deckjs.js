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