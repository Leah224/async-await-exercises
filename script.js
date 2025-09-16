function clearResults() {
    document.getElementById("results").innerHTML = "";
}

// Part 1: Single Number Fact//
//use fetch to call apo, then convert response to JSON then display the fact in the DOM//

async function getSingleFact() {
    clearResults();
    try{
    let response = await fetch("http://numbersapi.com/24?json");
    let data = await response.json();
    document.body.innerHTML += `<p>${data.text}</p>`;
    } catch (err) {
        console.error(err);
    }
}

// Part 2: Multiple Numbers
async function getMultipleFacts() {
  clearResults();
  try {
    let response = await fetch("http://numbersapi.com/2,4,8?json");
    let data = await response.json();
    for (let num in data) {
      document.getElementById("results").innerHTML += `<p>${num}: ${data[num]}</p>`;
    }
  } catch (err) {
    console.error(err);
  }
}

//Part 3: Four Facts on Same Number
async function getFourFacts() {
  clearResults();
  let favNum = 24;
  try {
    // create 4 requests
    let promises = [];
    for (let i = 0; i < 4; i++) {
      promises.push(fetch(`http://numbersapi.com/${favNum}?json`).then(res => res.json()));
    }

    let facts = await Promise.all(promises);
    facts.forEach(f => {
      document.getElementById("results").innerHTML += `<p>${f.text}</p>`;
    });
  } catch (err) {
    console.error(err);
  }
}




document.getElementById("single").addEventListener("click", getSingleFact);
document.getElementById("multi").addEventListener("click", getMultipleFacts);
document.getElementById("four").addEventListener("click", getFourFacts);