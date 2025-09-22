//STEP 1: Get all Pokemon names and URLS
async function getAllPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();
    return data.results; // array of {name, url}
}

getAllPokemon().then(allPokemon => console.log(allPokemon.slice(0, 5))); // test first 5


//STEP 2: Pick three random Pokemon and fetch their data

//create a function to pick random pokemon
function getRandomPokemon(allPokemon, count = 3) {
    const randomPokemon = [];
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * allPokemon.length);
        randomPokemon.push(allPokemon[index]);
    }
    return randomPokemon;
}

//create a async function to fetch said pokemons data
async function fetchRandomPokemonData() {
    const allPokemon = await getAllPokemon();
    const randomPokemon = getRandomPokemon(allPokemon);

    // fetch data for each
    for (let p of randomPokemon) {
        const res = await fetch(p.url);
        const data = await res.json();
        console.log(data); // log each Pokémon data
    }
}

fetchRandomPokemonData();


//get species discription

async function fetchRandomPokemonWithDescription() {
    const allPokemon = await getAllPokemon(); //get all pokemon
    const randomPokemon = getRandomPokemon(allPokemon); //pick 3

//loop thorugh each pokemon
    for (let p of randomPokemon) {
        const res = await fetch(p.url); //fetch pokemon data
        const data = await res.json(); //pokemon data to json
//fetch species data
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
//in english
        const flavorText = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );

          if (flavorText) {
            console.log(`${data.name}: ${flavorText.flavor_text.replace(/\n|\f/g, ' ')}`);
        }
    }
}

fetchRandomPokemonWithDescription();