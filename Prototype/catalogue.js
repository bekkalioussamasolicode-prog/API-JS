const url = "https://countries-api-hsak.onrender.com/api/countries";
let container = document.getElementById("Catalog");
let select = document.getElementById("sort");
let search = document.getElementById("search");
let stats = document.getElementById("status");
let countries = [];

async function getContent() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    countries = data;
    console.log(countries);
    creatDiv();
  } catch (error) {
    console.error("Error loading countries:", error);
  }
}
getContent();

function creatDiv() {
  countries.forEach((country) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
   <h3>${country.name}</h3>
   <img src = "${country.flag}">
   <p> The capital: ${country.capital}</p>
   <p> The language spoken: ${country.language}</p>
   <p> The continent: ${country.continent}</p>
   `;
    card.addEventListener("click", () => {
      window.location.href = `country-details.html?id=${country.id}`;
    });

    container.appendChild(card);
  });
  updateStatus();
}
select.addEventListener("change", () => {
  let selectedContinent = select.value;
  container.innerHTML = "";
  let filteredCountries;
  if (selectedContinent === "All") {
    filteredCountries = countries;
  } else {
    filteredCountries = countries.filter(
      (country) => country.continent === selectedContinent
    );
    updateStatus();
  }

  filteredCountries.forEach((country) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
   <h3>${country.name}</h3>
   <img src = "${country.flag}">
   <p> The capital: ${country.capital}</p>
   <p> The language spoken: ${country.language}</p>
   <p> The continent: ${country.continent}</p>
   `;
    card.addEventListener("click", () => {
      window.location.href = `country-details.html?id=${country.id}`;
    });

    container.appendChild(card);
  });
});
search.addEventListener("input", () => {
  let query = search.value.toLowerCase();
  container.innerHTML = "";

  let filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );

  filtered.forEach((country) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${country.name}</h3>
      <img src="${country.flag}">
      <p>The capital: ${country.capital}</p>
      <p>The language spoken: ${country.language}</p>
      <p>The continent: ${country.continent}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = `country-details.html?id=${country.id}`;
    });

    container.appendChild(card);
  });
});

function updateStatus() {
  let total = countries.length;

  let continents = countries.reduce((acc, c) => {
    acc[c.continent] = (acc[c.continent] || 0) + 1;

    return acc;
  }, {});

  let statusText = `<span><strong>Total Countries:</strong> ${total}</span>`;

  for (let cont in continents) {
    statusText += `<span>${cont}: ${continents[cont]}</span>`;
  }

  stats.innerHTML = statusText;
}
