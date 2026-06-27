const products = Array.isArray(window.FLOCK_PRODUCTS) ? window.FLOCK_PRODUCTS : [];

const safeFavorites = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem("flockfind-favorites") || "[]"));
  } catch {
    return new Set();
  }
};

const state = {
  collection: "flamingo",
  compared: [],
  favorites: safeFavorites(),
  visibleCount: 12,
  activeDialogTrigger: null,
};

const dom = {
  grid: document.querySelector("#productGrid"),
  empty: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
  resultsStatus: document.querySelector("#resultsStatus"),
  showMore: document.querySelector("#showMore"),
  width: document.querySelector("#wallWidth"),
  height: document.querySelector("#wallHeight"),
  waste: document.querySelector("#wasteAmount"),
  area: document.querySelector("#areaTotal"),
  price: document.querySelector("#priceFilter"),
  priceValue: document.querySelector("#priceValue"),
  rating: document.querySelector("#ratingFilter"),
  ratingValue: document.querySelector("#ratingValue"),
  bathroom: document.querySelector("#bathroomFilter"),
  reviews: document.querySelector("#reviewFilter"),
  priceKnown: document.querySelector("#priceKnownFilter"),
  madeInUSA: document.querySelector("#madeInUSAFilter"),
  retailer: document.querySelector("#retailerFilter"),
  sort: document.querySelector("#sortSelect"),
  summary: document.querySelector("#activeSummary"),
  reset: document.querySelector("#resetFilters"),
  emptyReset: document.querySelector("#emptyReset"),
  compareDock: document.querySelector("#compareDock"),
  compareCount: document.querySelector("#compareCount"),
  compareThumbs: document.querySelector("#compareThumbs"),
  clearCompare: document.querySelector("#clearCompare"),
  openCompare: document.querySelector("#openCompare"),
  compareDialog: document.querySelector("#compareDialog"),
  compareTable: document.querySelector("#compareTable"),
  scoreDialog: document.querySelector("#scoreDialog"),
  toast: document.querySelector("#toast"),
  catalogCount: document.querySelector("#catalogCount"),
  manufacturerCount: document.querySelector("#manufacturerCount"),
  retailerCount: document.querySelector("#retailerCount"),
  flamingoCount: document.querySelector("#flamingoCount"),
  wildBirdCount: document.querySelector("#wildBirdCount"),
};

const collectionInputs = [...document.querySelectorAll('input[name="birdCollection"]')];
const vibeInputs = [...document.querySelectorAll('input[name="vibe"]')];

function pricePerSquareFoot(item) {
  if (!Number.isFinite(item.price) || !Number.isFinite(item.coverage) || item.coverage <= 0) return null;
  return item.price / item.coverage;
}

function adjustedRating(item) {
  if (!Number.isFinite(item.rating)) return null;
  const priorRating = 4.2;
  const priorWeight = 12;
  return (item.reviews * item.rating + priorWeight * priorRating) / (item.reviews + priorWeight);
}

function priceFit(price) {
  if (price <= 0.6) return 0.88;
  if (price <= 1.5) return Math.max(0.91, 1 - Math.abs(price - 1.08) * 0.08);
  if (price <= 2.5) return Math.max(0.68, 0.91 - (price - 1.5) * 0.2);
  return Math.max(0.05, 0.55 - (price - 2.5) * 0.08);
}

function scoreProduct(item) {
  const adjusted = adjustedRating(item);
  const reviewScore = adjusted === null
    ? 18
    : (adjusted / 5) * 36 + Math.min(Math.log10(item.reviews + 1) / 2, 1) * 10;
  const qualityScore = (item.quality / 100) * 34;
  const normalizedPrice = pricePerSquareFoot(item);
  const valueScore = normalizedPrice === null ? 8 : priceFit(normalizedPrice) * 20;
  return Math.round(reviewScore + qualityScore + valueScore);
}

function projectArea() {
  const width = Math.max(Number(dom.width.value) || 0, 0);
  const height = Math.max(Number(dom.height.value) || 0, 0);
  const waste = Number(dom.waste.value) || 0;
  return width * height * (1 + waste);
}

function projectEstimate(item) {
  if (!Number.isFinite(item.price) || !Number.isFinite(item.coverage) || item.coverage <= 0) return null;
  const rolls = Math.max(1, Math.ceil(projectArea() / item.coverage));
  return { rolls, cost: rolls * item.price };
}

function confidenceFor(item) {
  if (!Number.isFinite(item.rating)) return { label: "Not rated", className: "unknown" };
  if (item.reviews >= 30) return { label: "High confidence", className: "high" };
  if (item.reviews >= 10) return { label: "Some confidence", className: "medium" };
  return { label: "Early reviews", className: "early" };
}

function evidenceFor(item) {
  const labels = {
    verified: "Price + reviews verified",
    price: "Price verified",
    reviews: "Reviews verified",
    listing: "Listing confirmed",
  };
  return labels[item.evidence] || labels.listing;
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount >= 100 ? 0 : 2,
  }).format(amount);
}

function starText(rating) {
  const filled = Math.round(rating);
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
}

function fallbackBirdArt(item) {
  if (item.collection === "flamingo") {
    return `
      <svg class="fallback-bird" viewBox="0 0 240 180" aria-hidden="true">
        <path d="M131 30c26 1 44 18 44 40 0 17-10 29-27 40-14 9-20 19-20 35h-15c0-23 8-38 27-50 11-7 17-15 17-24 0-13-11-24-28-24-23 0-40 18-47 46L65 89c8-36 32-59 66-59Z"/>
        <circle cx="139" cy="60" r="4"/>
        <path d="m157 69 38 13-40 7c4-7 4-13 2-20ZM108 138h15v34h-15zM82 142h15v30H82z"/>
        <path d="M77 97c-7 27 7 46 37 48-17 12-47 10-60-8-10-14-6-31 8-42l15 2Z"/>
      </svg>`;
  }
  return `
    <svg class="fallback-bird wild" viewBox="0 0 240 180" aria-hidden="true">
      <path d="M71 105c18-33 52-53 91-46 19 3 31 13 37 28-15-6-29-5-40 3-17 13-30 24-55 25L82 146l2-34-13-7Z"/>
      <path d="M106 105c8-30 31-48 58-47-14 10-23 25-29 46l-29 1ZM72 106 35 82l48 8-11 16Z"/>
      <circle cx="172" cy="76" r="4"/>
      <path d="m194 80 28 9-29 7c3-6 3-10 1-16Z"/>
    </svg>`;
}

function filteredProducts() {
  const maxPrice = Number(dom.price.value);
  const minRating = Number(dom.rating.value);
  const selectedVibes = vibeInputs.filter((input) => input.checked).map((input) => input.value);

  const filtered = products.filter((item) => {
    if (state.collection !== "all" && item.collection !== state.collection) return false;
    const normalizedPrice = pricePerSquareFoot(item);
    if (normalizedPrice !== null && normalizedPrice > maxPrice) return false;
    if (dom.priceKnown.checked && normalizedPrice === null) return false;
    if (minRating > 0 && (!Number.isFinite(item.rating) || item.rating < minRating)) return false;
    if (dom.bathroom.checked && !item.bathroom) return false;
    if (dom.reviews.checked && item.reviews < 10) return false;
    if (dom.madeInUSA.checked && !item.madeInUSA) return false;
    if (dom.retailer.value !== "all" && item.retailer !== dom.retailer.value) return false;
    if (selectedVibes.length && !item.vibes.some((vibe) => selectedVibes.includes(vibe))) return false;
    return true;
  });

  const sorters = {
    score: (a, b) => scoreProduct(b) - scoreProduct(a),
    price: (a, b) => (pricePerSquareFoot(a) ?? Number.POSITIVE_INFINITY) - (pricePerSquareFoot(b) ?? Number.POSITIVE_INFINITY),
    rating: (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || b.reviews - a.reviews,
    reviews: (a, b) => b.reviews - a.reviews,
  };

  return filtered.sort(sorters[dom.sort.value]);
}

function ratingMarkup(item) {
  const confidence = confidenceFor(item);
  if (!Number.isFinite(item.rating)) {
    return `
      <div class="rating-row">
        <span class="unrated-label">No product rating published</span>
        <span class="confidence ${confidence.className}">${confidence.label}</span>
      </div>`;
  }
  return `
    <div class="rating-row">
      <span class="stars" aria-hidden="true">${starText(item.rating)}</span>
      <span class="rating-label"><strong>${item.rating.toFixed(item.rating % 1 ? 1 : 0)}</strong> out of 5 · ${item.reviews} review${item.reviews === 1 ? "" : "s"}</span>
      <span class="confidence ${confidence.className}">${confidence.label}</span>
    </div>`;
}

function pricingMarkup(item) {
  const normalizedPrice = pricePerSquareFoot(item);
  if (normalizedPrice === null) {
    return `
      <div class="card-pricing pricing-unknown">
        <div>
          <span>Price evidence</span>
          <strong>${item.priceLabel}</strong>
          <small>Not normalized</small>
        </div>
        <div>
          <span>Coverage</span>
          <strong>Not listed</strong>
          <small>Verify before ordering</small>
        </div>
      </div>`;
  }
  return `
    <div class="card-pricing">
      <div>
        <span>Price per sq. ft.</span>
        <strong>${formatMoney(normalizedPrice)}</strong>
        <small>Normalized cost</small>
      </div>
      <div>
        <span>Roll price</span>
        <strong>${formatMoney(item.price)}</strong>
        <small>${item.coverage.toFixed(item.coverage % 1 ? 2 : 0)} sq. ft. coverage</small>
      </div>
    </div>`;
}

function estimateMarkup(item) {
  const estimate = projectEstimate(item);
  const width = Number(dom.width.value) || 0;
  const height = Number(dom.height.value) || 0;
  if (!estimate) {
    return `
      <div class="project-estimate estimate-unknown">
        <div>
          <span>Your ${width || "—"} × ${height || "—"} ft wall</span>
          <strong>Retailer quote needed</strong>
        </div>
        <span>Coverage missing</span>
      </div>`;
  }
  return `
    <div class="project-estimate">
      <div>
        <span>Your ${width || "—"} × ${height || "—"} ft wall</span>
        <strong>${estimate.rolls} roll${estimate.rolls === 1 ? "" : "s"} incl. waste</strong>
      </div>
      <strong>${formatMoney(estimate.cost)}</strong>
    </div>`;
}

function productCard(item) {
  const selected = state.compared.includes(item.id);
  const saved = state.favorites.has(item.id);
  const sourceName = `${item.retailer} product listing`;
  return `
    <article class="product-card" data-product-id="${item.id}">
      <div class="product-image ${item.image ? "" : "image-failed"}" style="--pattern-bg:${item.background || "#dfe9df"};--pattern-accent:${item.color || "#eb6c5d"}">
        ${item.award ? `<span class="card-award">${item.award}</span>` : ""}
        <button class="save-button ${saved ? "saved" : ""}" type="button" data-save="${item.id}" aria-pressed="${saved}" aria-label="${saved ? "Remove" : "Save"} ${item.name}">
          <span aria-hidden="true">${saved ? "♥" : "♡"}</span>
        </button>
        <div class="fallback-art">${fallbackBirdArt(item)}<span>Style palette</span></div>
        ${item.image ? `<img src="${item.image}" alt="${item.name} ${item.species} peel-and-stick wallpaper" loading="lazy" />` : ""}
      </div>
      <div class="card-body">
        <div class="brand-row">
          <span>${item.manufacturer} · ${item.retailer}</span>
          <span class="score-pill"><strong>${scoreProduct(item)}</strong> Flock score</span>
        </div>
        <div class="species-row"><span>${item.species}</span><span>${evidenceFor(item)}</span></div>
        <h3 class="product-title">${item.name}</h3>
        ${ratingMarkup(item)}
        ${pricingMarkup(item)}
        <div class="quality-list" aria-label="Quality and listing signals">
          ${item.qualitySignals.slice(0, 4).map((signal) => `<span>${signal}</span>`).join("")}
          ${item.vibes.map((vibe) => `<span class="vibe-tag">${vibe === "mid-century" ? "Mid-century" : vibe}</span>`).join("")}
        </div>
        ${estimateMarkup(item)}
        <div class="card-actions">
          <a class="source-button" href="${item.sourceUrl}" target="_blank" rel="noreferrer">
            Check ${item.retailer}<span class="visually-hidden"> for ${item.name} (opens in a new tab)</span> ↗
          </a>
          <button class="compare-button ${selected ? "selected" : ""}" type="button" data-compare="${item.id}" aria-pressed="${selected}">
            ${selected ? "✓ Added" : "+ Compare"}
          </button>
        </div>
        <div class="source-note">
          <span>${sourceName} · U.S. storefront</span>
          <span>Checked ${item.checked}</span>
        </div>
      </div>
    </article>`;
}

function updateRangeFill(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const value = Number(input.value);
  input.style.setProperty("--range-fill", `${((value - min) / (max - min)) * 100}%`);
}

function updateSummary() {
  const chips = [];
  const maxPrice = Number(dom.price.value);
  const minRating = Number(dom.rating.value);
  const collectionNames = { flamingo: "Flamingos", "wild-bird": "Wild birds", all: "All birds" };
  chips.push(collectionNames[state.collection]);
  chips.push(maxPrice >= 9 ? "Any verified price" : `Up to ${formatMoney(maxPrice)} / sq. ft.`);
  if (minRating > 0) chips.push(`${minRating.toFixed(1)}+ stars`);
  vibeInputs.filter((input) => input.checked).forEach((input) => chips.push(input.value === "mid-century" ? "Mid-century" : input.value));
  if (dom.retailer.value !== "all") chips.push(dom.retailer.value);
  if (dom.bathroom.checked) chips.push("Bathroom-friendly");
  if (dom.reviews.checked) chips.push("10+ reviews");
  if (dom.priceKnown.checked) chips.push("Verified price");
  if (dom.madeInUSA.checked) chips.push("Made in USA");
  dom.summary.innerHTML = chips.map((chip) => `<span>${chip}</span>`).join("");
}

function updateCatalogStats() {
  const flamingos = products.filter((item) => item.collection === "flamingo").length;
  const wildBirds = products.filter((item) => item.collection === "wild-bird").length;
  dom.catalogCount.textContent = products.length;
  dom.manufacturerCount.textContent = new Set(products.map((item) => item.manufacturer)).size;
  dom.retailerCount.textContent = new Set(products.map((item) => item.retailer)).size;
  dom.flamingoCount.textContent = flamingos;
  dom.wildBirdCount.textContent = wildBirds;
}

function populateRetailers() {
  const retailers = [...new Set(products.map((item) => item.retailer))].sort();
  dom.retailer.innerHTML = `<option value="all">All U.S. retailers</option>${retailers
    .map((retailer) => `<option value="${retailer}">${retailer}</option>`)
    .join("")}`;
}

function render() {
  const area = projectArea();
  const matches = filteredProducts();
  const visible = matches.slice(0, state.visibleCount);
  dom.area.textContent = `${Math.round(area).toLocaleString()} sq. ft.`;
  dom.priceValue.textContent = Number(dom.price.value) >= 9 ? "Any" : formatMoney(Number(dom.price.value));
  dom.ratingValue.textContent = Number(dom.rating.value) === 0 ? "Any" : `${Number(dom.rating.value).toFixed(1)}+`;
  dom.resultCount.textContent = `(${matches.length})`;
  dom.grid.innerHTML = visible.map(productCard).join("");
  dom.empty.hidden = matches.length !== 0;
  dom.grid.hidden = matches.length === 0;
  const remaining = Math.max(0, matches.length - visible.length);
  dom.showMore.hidden = remaining === 0;
  dom.showMore.textContent = remaining > 0 ? `Show ${Math.min(12, remaining)} more pattern${remaining === 1 ? "" : "s"}` : "";
  dom.resultsStatus.textContent = `Showing ${visible.length} of ${matches.length} matching wallpaper products.`;
  updateSummary();
  updateRangeFill(dom.price);
  updateRangeFill(dom.rating);
  attachCardEvents();
  updateCompareDock();
}

function attachCardEvents() {
  document.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.save));
  });
  document.querySelectorAll("[data-compare]").forEach((button) => {
    button.addEventListener("click", () => toggleCompare(button.dataset.compare));
  });
  document.querySelectorAll(".product-image img").forEach((image) => {
    image.addEventListener("error", () => image.closest(".product-image").classList.add("image-failed"));
  });
}

let toastTimer;
function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("visible"), 1900);
}

function persistFavorites() {
  try {
    localStorage.setItem("flockfind-favorites", JSON.stringify([...state.favorites]));
  } catch {
    showToast("Saved for this session only");
  }
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    showToast("Removed from saved patterns");
  } else {
    state.favorites.add(id);
    showToast("Pattern saved");
  }
  persistFavorites();
  render();
}

function toggleCompare(id) {
  if (state.compared.includes(id)) {
    state.compared = state.compared.filter((productId) => productId !== id);
  } else if (state.compared.length >= 3) {
    showToast("Compare up to three patterns at a time");
    return;
  } else {
    state.compared.push(id);
  }
  render();
}

function updateCompareDock() {
  const selected = state.compared.map((id) => products.find((item) => item.id === id)).filter(Boolean);
  dom.compareDock.hidden = selected.length === 0;
  dom.compareCount.textContent = `${selected.length} pattern${selected.length === 1 ? "" : "s"} selected`;
  dom.compareThumbs.innerHTML = selected
    .map((item) => item.image
      ? `<img class="compare-thumb" src="${item.image}" alt="" />`
      : `<span class="compare-thumb fallback-thumb" aria-hidden="true">${item.collection === "flamingo" ? "F" : "W"}</span>`)
    .join("");
}

function comparisonValue(item, type) {
  const normalizedPrice = pricePerSquareFoot(item);
  const estimate = projectEstimate(item);
  const values = {
    score: `<strong>${scoreProduct(item)}/100</strong>`,
    rating: Number.isFinite(item.rating) ? `${item.rating.toFixed(1)} · ${item.reviews} reviews` : "No product rating",
    price: normalizedPrice === null ? "Not normalized" : `<strong>${formatMoney(normalizedPrice)}</strong>`,
    roll: Number.isFinite(item.price) && Number.isFinite(item.coverage)
      ? `${formatMoney(item.price)} · ${item.coverage.toFixed(item.coverage % 1 ? 2 : 0)} sq. ft.`
      : item.priceLabel,
    project: estimate
      ? `<strong>${formatMoney(estimate.cost)}</strong><br>${estimate.rolls} roll${estimate.rolls === 1 ? "" : "s"}`
      : "Coverage needed",
    quality: `${item.quality}/100`,
    evidence: evidenceFor(item),
    read: item.note,
  };
  return values[type];
}

function renderComparison() {
  const selected = state.compared.map((id) => products.find((item) => item.id === id)).filter(Boolean);
  const rows = [
    ["Flock score", "score"],
    ["Evidence", "evidence"],
    ["Rating", "rating"],
    ["Price / sq. ft.", "price"],
    ["Roll", "roll"],
    ["Your project", "project"],
    ["Quality", "quality"],
    ["Our read", "read"],
  ];
  dom.compareTable.innerHTML = `
    <div class="comparison-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th scope="col">Pattern</th>
            ${selected.map((item) => `
              <th scope="col">
                <div class="comparison-product">
                  ${item.image ? `<img src="${item.image}" alt="" />` : `<div class="comparison-fallback" aria-hidden="true">${item.collection === "flamingo" ? "F" : "W"}</div>`}
                  <strong>${item.name}</strong>
                </div>
              </th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map(([label, type]) => `
            <tr>
              <th scope="row">${label}</th>
              ${selected.map((item) => `<td>${comparisonValue(item, type)}</td>`).join("")}
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function setPreset(preset) {
  document.querySelectorAll(".preset").forEach((button) => {
    const active = button.dataset.preset === preset;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (preset === "moderate") {
    dom.price.value = "1.75";
    dom.rating.value = "0";
    dom.priceKnown.checked = false;
  }
  if (preset === "strict") {
    dom.price.value = "1.25";
    dom.rating.value = "4";
    dom.priceKnown.checked = true;
  }
  if (preset === "all") {
    dom.price.value = "9";
    dom.rating.value = "0";
    dom.priceKnown.checked = false;
  }
  state.visibleCount = 12;
  render();
}

function clearPresetState() {
  document.querySelectorAll(".preset").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
}

function resetFilters() {
  dom.bathroom.checked = false;
  dom.reviews.checked = false;
  dom.priceKnown.checked = false;
  dom.madeInUSA.checked = false;
  dom.retailer.value = "all";
  dom.sort.value = "score";
  vibeInputs.forEach((input) => { input.checked = false; });
  setPreset("moderate");
}

function openDialog(dialog, trigger) {
  state.activeDialogTrigger = trigger;
  dialog.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

[dom.width, dom.height, dom.waste, dom.bathroom, dom.reviews, dom.priceKnown, dom.madeInUSA, dom.retailer, dom.sort]
  .forEach((input) => input.addEventListener("input", () => {
    state.visibleCount = 12;
    render();
  }));

[dom.price, dom.rating].forEach((input) => {
  input.addEventListener("input", () => {
    clearPresetState();
    state.visibleCount = 12;
    render();
  });
});

collectionInputs.forEach((input) => {
  input.addEventListener("change", () => {
    state.collection = input.value;
    state.visibleCount = 12;
    render();
  });
});

vibeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    state.visibleCount = 12;
    render();
  });
});

document.querySelectorAll(".preset").forEach((button) => {
  button.addEventListener("click", () => setPreset(button.dataset.preset));
});

dom.reset.addEventListener("click", resetFilters);
dom.emptyReset.addEventListener("click", resetFilters);
dom.showMore.addEventListener("click", () => {
  state.visibleCount += 12;
  render();
  dom.resultsStatus.focus();
});
dom.clearCompare.addEventListener("click", () => {
  state.compared = [];
  render();
});
dom.openCompare.addEventListener("click", (event) => {
  renderComparison();
  openDialog(dom.compareDialog, event.currentTarget);
});

document.querySelectorAll("[data-open-score]").forEach((button) => {
  button.addEventListener("click", (event) => openDialog(dom.scoreDialog, event.currentTarget));
});

document.querySelectorAll(".close-dialog").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

[dom.compareDialog, dom.scoreDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    state.activeDialogTrigger?.focus();
    state.activeDialogTrigger = null;
  });
});

populateRetailers();
updateCatalogStats();
render();
