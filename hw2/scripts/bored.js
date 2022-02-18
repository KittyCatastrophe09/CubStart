const boredButton = document.getElementById("bored-button");
const card = document.getElementById("card");

// BEGIN PART 7

async function fetchActivity() {
  const response = await fetch("https://www.boredapi.com/api/activity");
  const activity = await response.json();
  return activity;
}

// END PART 7

boredButton.addEventListener("click", async () => {
  // empty card
  // get activity from API
  // process this data into 'p' elements
  // append the text elements as children of the card
  card.replaceChildren();
  const activity = await fetchActivity();
  // BEGIN PART 8
  for (const [key, value] of Object.entries(activity)) {
    const detail = document.createElement("p");
    detail.innerHTML = key + ": " + value;
    card.appendChild(detail);
  }
  // END PART 8
});
