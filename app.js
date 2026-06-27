const products = [
  {
    id: "ballerina",
    brand: "Tempaper · Wayfair",
    name: "Flamingo in Ballerina Pink",
    price: 38.99,
    coverage: 28,
    rating: 4.4,
    reviews: 52,
    quality: 90,
    bathroom: true,
    award: "Best overall",
    image:
      "https://assets.wfcdn.com/im/13686223/resize-h800-p1-w800%5Ecompr-r85/1235/123593746/Flamingo%2BPeel%2Band%2BStick%2BWallpaper-292052534.jpg",
    sourceUrl:
      "https://www.wayfair.com/decor-pillows/pdp/bayou-breeze-flamingo-peel-and-stick-wallpaper-w000869120.html",
    sourceLabel: "Wayfair listing",
    qualitySignals: ["Repositionable", "Steam resistant", "Wipe clean", "Made in USA"],
    color: "#f3aaa9",
    background: "#f5ddd2",
    note: "The strongest balance of a sizable review history, clear material claims, and moderate pricing.",
  },
  {
    id: "nuwallpaper",
    brand: "NuWallpaper · Home Depot",
    name: "Pink Flamingo Beach",
    price: 29.81,
    coverage: 30.75,
    rating: 4.8,
    reviews: 8,
    quality: 92,
    bathroom: true,
    award: "Best value",
    image:
      "https://bhf-cdn.azureedge.net/bhf-blob-prod/0047011_pink-flamingo-beach-peel-and-stick-wallpaper.jpeg",
    sourceUrl: "https://www.homedepot.com/p/314013686",
    sourceLabel: "Home Depot listing",
    qualitySignals: ["Premium vinyl", "Repositionable", "Residue-free", "Washable"],
    color: "#ee8f9b",
    background: "#e6efdd",
    note: "A very good per-square-foot price and the highest established rating in the shortlist.",
  },
  {
    id: "salinas",
    brand: "Tempaper · She She",
    name: "Flamingo Salinas — Land",
    price: 39.99,
    coverage: 56.37,
    rating: 5,
    reviews: 2,
    quality: 96,
    bathroom: true,
    award: "Best quality",
    image:
      "https://tempaper.com/cdn/shop/products/FS4159-she-she-pink-flamingo-salinas-removable-wallpaper.jpg?v=1699032995",
    sourceUrl: "https://tempaper.com/products/she-she-flamingo-salinas-peel-stick-wallpaper",
    reviewUrl:
      "https://www.lowes.com/pd/Tempaper-Flamingos-Salinas-Land-Peel-and-Stick-Wallpaper/5013610781",
    sourceLabel: "Tempaper price · Lowe's reviews",
    qualitySignals: ["Certified vinyl", "Steam resistant", "Wipe clean", "Made in USA"],
    color: "#f07347",
    background: "#171c1a",
    note: "The richest specification sheet and lowest normalized price, but the review sample is still tiny.",
  },
  {
    id: "butros",
    brand: "Bayou Breeze · Wayfair",
    name: "Butros Tropical Flamingos",
    price: 30.99,
    coverage: 28.91,
    rating: 4.3,
    reviews: 6,
    quality: 80,
    bathroom: false,
    award: "Budget pick",
    image:
      "https://assets.wfcdn.com/im/70229984/resize-h800-p1-w800%5Ecompr-r85/2837/283747745/Butros%2BPeel%2Band%2BStick%2BWallpaper%2BTropical%2BFlamingos%2BPink%2BRoll.jpg",
    sourceUrl:
      "https://www.wayfair.com/decor-pillows/pdp/bayou-breeze-butros-peel-and-stick-wallpaper-tropical-flamingos-pink-roll-xeaw1135.html",
    sourceLabel: "Wayfair listing",
    qualitySignals: ["Thicker vinyl", "Straight match", "Non-translucent", "Beginner-friendly"],
    color: "#e9717b",
    background: "#d9ead7",
    note: "An accessible price and forgiving straight match, though long-term durability evidence is limited.",
  },
  {
    id: "cheeky",
    brand: "Tempaper · Home Depot",
    name: "Cheeky Pink Flamingo",
    price: 35.99,
    coverage: 28,
    rating: 3.2,
    reviews: 10,
    quality: 83,
    bathroom: true,
    award: "",
    image:
      "https://tempaper.com/cdn/shop/products/flamingos_cheeky_pink_fl538_1_1020x_progressive_jpg.webp?v=1754944907",
    sourceUrl: "https://www.homedepot.com/p/308998902",
    sourceLabel: "Home Depot price · Tempaper reviews",
    qualitySignals: ["Certified vinyl", "Steam resistant", "Repositionable", "Made in USA"],
    color: "#e85f77",
    background: "#f1d6cf",
    note: "The material specs are strong, but mixed installation and dye-lot reviews pull down the ranking.",
  },
  {
    id: "daydream",
    brand: "Tempaper",
    name: "Flamingo Daydream — Cactus Rose",
    price: 27.99,
    coverage: 28.18,
    rating: 3.5,
    reviews: 2,
    quality: 86,
    bathroom: true,
    award: "",
    image:
      "https://tempaper.com/cdn/shop/products/FD15080-green-flamingo-daydream-peel-stick-wallpaper_474d1e7a-5193-4983-a7e2-6da05cda0b19.jpg?v=1723146379",
    sourceUrl: "https://tempaper.com/products/flamingo-daydream-peel-stick-wallpaper",
    reviewUrl: "https://www.walmart.com/ip/2070825913",
    sourceLabel: "Tempaper price · Walmart reviews",
    qualitySignals: ["Certified vinyl", "Moisture friendly", "Wipe clean", "Made in USA"],
    color: "#e96774",
    background: "#eaf1e4",
    note: "Good materials and pricing, but too little review evidence to recommend over the leaders.",
  },
  {
    id: "dupont",
    brand: "Dovecove · Wayfair",
    name: "Dupont Soaring Flamingos",
    price: 69.99,
    coverage: 8,
    rating: 4,
    reviews: 24,
    quality: 84,
    bathroom: true,
    award: "",
    image:
      "https://tempaper.com/cdn/shop/products/FL15127-pink-blue-flamingos-peel-stick-wallpaper.jpg?v=1754944907",
    sourceUrl:
      "https://www.wayfair.com/decor-pillows/pdp/dovecove-dupont-flamingo-peel-and-stick-wallpaper-roll-w001045519.html",
    sourceLabel: "Wayfair listing",
    qualitySignals: ["Matte vinyl", "Water resistant", "Non-toxic inks", "Made in USA"],
    color: "#e4697f",
    background: "#b6d7dc",
    note: "Solid materials, but its unusually small roll makes the project cost difficult to justify.",
  },
];

const dom = {
  grid: document.querySelector("#productGrid"),
  empty: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
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
};

const state = {
  compared: [],
  favorites: new Set(JSON.parse(localStorage.getItem("flockfind-favorites") || "[]")),
};

function pricePerSquareFoot(product) {
  return product.price / product.coverage;
}

function adjustedRating(product) {
  const priorRating = 4.2;
  const priorWeight = 12;
  return (product.reviews * product.rating + priorWeight * priorRating) / (product.reviews + priorWeight);
}

function priceFit(price) {
  if (price <= 0.6) return 0.88;
  if (price <= 1.5) return Math.max(0.91, 1 - Math.abs(price - 1.08) * 0.08);
  if (price <= 2.5) return Math.max(0.68, 0.91 - (price - 1.5) * 0.2);
  return Math.max(0.05, 0.55 - (price - 2.5) * 0.08);
}

function scoreProduct(product) {
  const reviewBase = (adjustedRating(product) / 5) * 36;
  const confidenceBonus = Math.min(Math.log10(product.reviews + 1) / 2, 1) * 10;
  const qualityScore = (product.quality / 100) * 34;
  const valueScore = priceFit(pricePerSquareFoot(product)) * 20;
  return Math.round(reviewBase + confidenceBonus + qualityScore + valueScore);
}

function projectArea() {
  const width = Math.max(Number(dom.width.value) || 0, 0);
  const height = Math.max(Number(dom.height.value) || 0, 0);
  const waste = Number(dom.waste.value) || 0;
  return width * height * (1 + waste);
}

function projectEstimate(product) {
  const rolls = Math.max(1, Math.ceil(projectArea() / product.coverage));
  return { rolls, cost: rolls * product.price };
}

function confidenceFor(reviews) {
  if (reviews >= 30) return { label: "High confidence", className: "high" };
  if (reviews >= 10) return { label: "Some confidence", className: "medium" };
  return { label: "Early reviews", className: "early" };
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

function filteredProducts() {
  const maxPrice = Number(dom.price.value);
  const minRating = Number(dom.rating.value);

  const filtered = products.filter((product) => {
    if (pricePerSquareFoot(product) > maxPrice) return false;
    if (product.rating < minRating) return false;
    if (dom.bathroom.checked && !product.bathroom) return false;
    if (dom.reviews.checked && product.reviews < 10) return false;
    return true;
  });

  const sorters = {
    score: (a, b) => scoreProduct(b) - scoreProduct(a),
    price: (a, b) => pricePerSquareFoot(a) - pricePerSquareFoot(b),
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    reviews: (a, b) => b.reviews - a.reviews,
  };

  return filtered.sort(sorters[dom.sort.value]);
}

function productCard(product) {
  const perFoot = pricePerSquareFoot(product);
  const estimate = projectEstimate(product);
  const confidence = confidenceFor(product.reviews);
  const selected = state.compared.includes(product.id);
  const saved = state.favorites.has(product.id);
  const width = Number(dom.width.value) || 0;
  const height = Number(dom.height.value) || 0;

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image" style="--pattern-bg:${product.background};--pattern-accent:${product.color}">
        ${product.award ? `<span class="card-award">${product.award}</span>` : ""}
        <button class="save-button ${saved ? "saved" : ""}" type="button" data-save="${product.id}" aria-label="${saved ? "Remove" : "Save"} ${product.name}">
          ${saved ? "♥" : "♡"}
        </button>
        <img src="${product.image}" alt="${product.name} flamingo wallpaper pattern" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="brand-row">
          <span>${product.brand}</span>
          <span class="score-pill"><strong>${scoreProduct(product)}</strong> Flock score</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <div class="rating-row">
          <span class="stars" aria-hidden="true">${starText(product.rating)}</span>
          <strong>${product.rating.toFixed(1)}</strong>
          <span>${product.reviews} review${product.reviews === 1 ? "" : "s"}</span>
          <span class="confidence ${confidence.className}">${confidence.label}</span>
        </div>

        <div class="card-pricing">
          <div>
            <span>Price per sq. ft.</span>
            <strong>${formatMoney(perFoot)}</strong>
            <small>Normalized cost</small>
          </div>
          <div>
            <span>Roll price</span>
            <strong>${formatMoney(product.price)}</strong>
            <small>${product.coverage.toFixed(product.coverage % 1 ? 2 : 0)} sq. ft. coverage</small>
          </div>
        </div>

        <div class="quality-list" aria-label="Quality signals">
          ${product.qualitySignals.slice(0, 4).map((signal) => `<span>${signal}</span>`).join("")}
        </div>

        <div class="project-estimate">
          <div>
            <span>Your ${width || "—"} × ${height || "—"} ft wall</span>
            <strong>${estimate.rolls} roll${estimate.rolls === 1 ? "" : "s"} incl. waste</strong>
          </div>
          <strong>${formatMoney(estimate.cost)}</strong>
        </div>

        <div class="card-actions">
          <a class="source-button" href="${product.sourceUrl}" target="_blank" rel="noreferrer">
            Check retailer ↗
          </a>
          <button class="compare-button ${selected ? "selected" : ""}" type="button" data-compare="${product.id}">
            ${selected ? "✓ Added" : "+ Compare"}
          </button>
        </div>
        <div class="source-note">
          <span>${product.sourceLabel}</span>
          ${product.reviewUrl ? `<a href="${product.reviewUrl}" target="_blank" rel="noreferrer">Review source ↗</a>` : "<span>Checked Jun 27, 2026</span>"}
        </div>
      </div>
    </article>
  `;
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
  chips.push(maxPrice >= 9 ? "Any price" : `Up to ${formatMoney(maxPrice)} / sq. ft.`);
  if (minRating > 0) chips.push(`${minRating.toFixed(1)}+ stars`);
  if (dom.bathroom.checked) chips.push("Bathroom-friendly");
  if (dom.reviews.checked) chips.push("10+ reviews");
  dom.summary.innerHTML = chips.map((chip) => `<span>${chip}</span>`).join("");
}

function render() {
  const area = projectArea();
  const matches = filteredProducts();
  dom.area.textContent = `${Math.round(area).toLocaleString()} sq. ft.`;
  dom.priceValue.textContent = Number(dom.price.value) >= 9 ? "Any" : formatMoney(Number(dom.price.value));
  dom.ratingValue.textContent = Number(dom.rating.value) === 0 ? "Any" : `${Number(dom.rating.value).toFixed(1)}+`;
  dom.resultCount.textContent = `(${matches.length})`;
  dom.grid.innerHTML = matches.map(productCard).join("");
  dom.empty.hidden = matches.length !== 0;
  dom.grid.hidden = matches.length === 0;
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

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    showToast("Removed from saved patterns");
  } else {
    state.favorites.add(id);
    showToast("Pattern saved");
  }
  localStorage.setItem("flockfind-favorites", JSON.stringify([...state.favorites]));
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
  const selected = state.compared.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  dom.compareDock.hidden = selected.length === 0;
  dom.compareCount.textContent = `${selected.length} pattern${selected.length === 1 ? "" : "s"} selected`;
  dom.compareThumbs.innerHTML = selected
    .map((product) => `<img class="compare-thumb" src="${product.image}" alt="" />`)
    .join("");
}

function renderComparison() {
  const selected = state.compared.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const rows = [
    ["Flock score", ...selected.map((p) => `<strong>${scoreProduct(p)}/100</strong>`)],
    ["Rating", ...selected.map((p) => `${p.rating.toFixed(1)} · ${p.reviews} reviews`)],
    ["Price / sq. ft.", ...selected.map((p) => `<strong>${formatMoney(pricePerSquareFoot(p))}</strong>`)],
    ["Roll", ...selected.map((p) => `${formatMoney(p.price)} · ${p.coverage.toFixed(p.coverage % 1 ? 2 : 0)} sq. ft.`)],
    [
      "Your project",
      ...selected.map((p) => {
        const estimate = projectEstimate(p);
        return `<strong>${formatMoney(estimate.cost)}</strong><br>${estimate.rolls} roll${estimate.rolls === 1 ? "" : "s"}`;
      }),
    ],
    ["Quality", ...selected.map((p) => `${p.quality}/100`)],
    ["Our read", ...selected.map((p) => p.note)],
  ];

  dom.compareTable.innerHTML = `
    <div class="comparison-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Pattern</th>
            ${selected
              .map(
                (product) => `
                  <th>
                    <div class="comparison-product">
                      <img src="${product.image}" alt="" />
                      <strong>${product.name}</strong>
                    </div>
                  </th>
                `,
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  ${row.map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function setPreset(preset) {
  document.querySelectorAll(".preset").forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === preset);
  });

  if (preset === "moderate") {
    dom.price.value = "1.75";
    dom.rating.value = "4.2";
  }
  if (preset === "strict") {
    dom.price.value = "1.25";
    dom.rating.value = "4";
  }
  if (preset === "all") {
    dom.price.value = "9";
    dom.rating.value = "0";
  }
  render();
}

function resetFilters() {
  dom.bathroom.checked = false;
  dom.reviews.checked = false;
  dom.sort.value = "score";
  setPreset("moderate");
}

[dom.width, dom.height, dom.waste, dom.price, dom.rating, dom.bathroom, dom.reviews, dom.sort].forEach((input) => {
  input.addEventListener("input", () => {
    if ([dom.price, dom.rating].includes(input)) {
      document.querySelectorAll(".preset").forEach((button) => button.classList.remove("active"));
    }
    render();
  });
});

document.querySelectorAll(".preset").forEach((button) => {
  button.addEventListener("click", () => setPreset(button.dataset.preset));
});

dom.reset.addEventListener("click", resetFilters);
dom.emptyReset.addEventListener("click", resetFilters);
dom.clearCompare.addEventListener("click", () => {
  state.compared = [];
  render();
});
dom.openCompare.addEventListener("click", () => {
  renderComparison();
  dom.compareDialog.showModal();
});

document.querySelectorAll("[data-open-score]").forEach((button) => {
  button.addEventListener("click", () => dom.scoreDialog.showModal());
});

document.querySelectorAll(".close-dialog").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

[dom.compareDialog, dom.scoreDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (dom.compareDialog.open) dom.compareDialog.close();
    if (dom.scoreDialog.open) dom.scoreDialog.close();
  }
});

render();
