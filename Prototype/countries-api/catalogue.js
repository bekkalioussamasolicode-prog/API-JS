const API_URL = "https://countries-api-hsak.onrender.com/api/countries";

const container    = document.getElementById("Catalog");
const loadingEl    = document.getElementById("loading");
const selectEl     = document.getElementById("sort");
const searchEl     = document.getElementById("search");
const statsEl      = document.getElementById("status");
const resultsCount = document.getElementById("resultsCount");

let countries = [];

/* ── Fetch ─────────────────────────────────────────────── */
async function getContent() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    countries = await response.json();
    loadingEl.style.display = "none";
    renderCards(countries);
    updateStatus();
  } catch (error) {
    loadingEl.style.display = "none";
    container.innerHTML = `
      <div class="empty-state">
        <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>Failed to load countries. Please try again later.</p>
      </div>`;
    console.error("Error loading countries:", error);
  }
}

/* ── Render ─────────────────────────────────────────────── */
function renderCards(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>No countries match your search.</p>
      </div>`;
    resultsCount.textContent = "0 results";
    return;
  }

  resultsCount.textContent = `${list.length} ${list.length === 1 ? "country" : "countries"}`;

  list.forEach((country, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.animationDelay = `${Math.min(index * 40, 400)}ms`;

    card.innerHTML = `
      <img src="${country.flag}" alt="Flag of ${country.name}" loading="lazy" />
      <h3>${country.name}</h3>
      <div class="info-row"><span class="label">Capital</span> ${country.capital ?? "—"}</div>
      <div class="info-row"><span class="label">Language</span> ${country.language ?? "—"}</div>
      <div class="continent-badge">${country.continent}</div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `country-details.html?id=${country.id}`;
    });

    container.appendChild(card);
  });
}

/* ── Filters ────────────────────────────────────────────── */
function getFiltered() {
  const query     = searchEl.value.toLowerCase().trim();
  const continent = selectEl.value;

  return countries.filter((c) => {
    const matchesSearch    = c.name.toLowerCase().includes(query);
    const matchesContinent = continent === "All" || c.continent === continent;
    return matchesSearch && matchesContinent;
  });
}

searchEl.addEventListener("input",  () => renderCards(getFiltered()));
selectEl.addEventListener("change", () => renderCards(getFiltered()));

/* ── Stats Bar ──────────────────────────────────────────── */
function updateStatus() {
  const total = countries.length;

  const continents = countries.reduce((acc, c) => {
    acc[c.continent] = (acc[c.continent] || 0) + 1;
    return acc;
  }, {});

  let html = `<span><strong>Total:</strong> ${total}</span>`;
  for (const [cont, count] of Object.entries(continents)) {
    html += `<span>${cont}: <strong>${count}</strong></span>`;
  }

  statsEl.innerHTML = html;
}

/* ── Init ───────────────────────────────────────────────── */
getContent();
