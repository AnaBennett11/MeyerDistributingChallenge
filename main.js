let products;
const itemsPerPageSelect = document.getElementById("itemsPerPage");
let currentPage = 1;
let itemsPerPage = parseInt(itemsPerPageSelect.value);



document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
  )
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products, currentPage);

      const colorFilterDropdown = document.getElementById("colorFilters");
      const uniqueColors = getUniqueColors(products);
      uniqueColors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.text = color;
        colorFilterDropdown.add(option);
      });
       updatePagination(products);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
function getUniqueColors(products) {
  const uniqueColors = new Set();
  products.forEach((product) => {
    product.product_colors.forEach((color) => {
      uniqueColors.add(color.colour_name);
    });
  });
  return Array.from(uniqueColors);
}

function displayProducts(products, page) {
  const gridContainer = document.getElementById("product-grid");
  gridContainer.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);


  displayedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
        <img src="${product.image_link}" alt="${product.name}">
        <div class="product-details">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <button class="view-more-btn" onclick="openModal(${product.id})">View More</button>
      </div>`;

    gridContainer.appendChild(productCard);
  });
}
function updatePagination(products) {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

    const pageDropdown = document.createElement("select");
  pageDropdown.addEventListener("change", () => {
    currentPage = parseInt(pageDropdown.value);
    displayProducts(products, currentPage);
  });

  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    pageDropdown.appendChild(option);
  }

    paginationContainer.appendChild(pageButton);
  }



function openModal(productId) {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";

  const selectedProduct = products.find((product) => product.id === productId);
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <img src="${selectedProduct.image_link}" alt="${selectedProduct.name}">
      <h3>${selectedProduct.name}</h3>
      <p>${selectedProduct.description}</p>
      <p>Price: ${selectedProduct.price}</p>
      <p>Rating: ${selectedProduct.rating}</p>
      <a href="${
        selectedProduct.product_link
      }" target="_blank" class="product-link-btn">Button to Product Page</a>
  

      <div class="color-list">
        <p>Available Colors:</p>
        <ul>
         
          ${selectedProduct.product_colors
            .map((color) => `<li>${color.colour_name}</li>`)
            .join("")}
        </ul>
      </div>
    </div>
  `;
  modal.style.display = "block";
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function applyFilters() {
  const priceFilter = document.getElementById("priceFilter").value;
  const lipstickFilter = document.getElementById("lipstickFilter").checked;
  const eyeshadowFilter = document.getElementById("eyeshadowFilter").checked;
  const foundationFilter = document.getElementById("foundationFilter").checked;
  const bronzerFilter = document.getElementById("bronzerFilter").checked;
  const blushFilter = document.getElementById("blushFilter").checked;
  const eyelinerFilter = document.getElementById("eyelinerFilter").checked;
  const fourStarFilter = document.getElementById("fourStarFilter").checked;
  const threeStarFilter = document.getElementById("threeStarFilter").checked;
  const selectedColor = document.getElementById("colorFilters").value;
 


  addFilterPill("Price", priceFilter);
  addCheckboxFilterPill("Lipstick", lipstickFilter, removeFilter);
  addCheckboxFilterPill("Eyeshadow", eyeshadowFilter, removeFilter);
  addCheckboxFilterPill("Foundation", foundationFilter, removeFilter);
  addCheckboxFilterPill("Bronzer", bronzerFilter, removeFilter);
  addCheckboxFilterPill("Blush", blushFilter, removeFilter);
  addCheckboxFilterPill("Eyeliner", eyelinerFilter, removeFilter);
  addCheckboxFilterPill("4 Stars & above", fourStarFilter, removeFilter);
  addCheckboxFilterPill("3 Stars & above", threeStarFilter, removeFilter);
  addFilterPill("Color", selectedColor);

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price.replace("$", ""));
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(parseFloat);
      if (price < min || price > max) {
        return false;
      }
    }

    if (
      (lipstickFilter && !product.product_type.includes("lipstick")) ||
      (eyeshadowFilter && !product.product_type.includes("eyeshadow")) ||
      (foundationFilter && !product.product_type.includes("foundation")) ||
      (bronzerFilter && !product.product_type.includes("bronzer")) ||
      (blushFilter && !product.product_type.includes("blush")) ||
      (eyelinerFilter && !product.product_type.includes("eyeliner"))
    ) {
      return false;
    }

    const rating = parseFloat(product.rating);
    if ((fourStarFilter && rating < 4) || (threeStarFilter && rating < 3)) {
      return false;
    }
    if (selectedColor !== "all") {
      const productColors = product.product_colors.map(
        (color) => color.colour_name
      );
      return productColors.includes(selectedColor);
    }
    return true;
  });
 
  const sortSelect = document.getElementById("sortSelect");
  const selectedSortOption = sortSelect.value;

  
  if (selectedSortOption === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSortOption === "price") {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      return priceA - priceB;
    });
  }
  const gridContainer = document.getElementById("product-grid");
  gridContainer.innerHTML = "";

  displayProducts(filteredProducts);
  updatePagination(filteredProducts);

}

function addFilterPill(label, value) {
  if (value !== "all") {
    const filterPillsContainer = document.getElementById("filterPills");
    const pill = document.createElement("div");
    pill.classList.add("filter-pill");
    pill.innerHTML = `${label}: ${value} <span class="pill-remove" onclick="removeFilter('${label}')">&times;</span>`;
    filterPillsContainer.appendChild(pill);
  }
}

function addCheckboxFilterPill(label, isChecked) {
  if (isChecked) {
    addFilterPill(label, "Yes");
  }
}

function removeFilter(label) {
  const filterPillsContainer = document.getElementById("filterPills");
  const filterPills =
    filterPillsContainer.getElementsByClassName("filter-pill");

  if (
    label === "Price" ||
    label === "Lipstick" ||
    label === "Eyeshadow" ||
    label === "Foundation" ||
    label === "Bronzer" ||
    label === "Blush" ||
    label === "Eyeliner" ||
    label === "4 Stars & above" ||
    label === "3 Stars & above" ||
    label === "Color"
  ) {
    for (let i = 0; i < filterPills.length; i++) {
      const pill = filterPills[i];
      if (pill.innerText.includes(`${label}:`)) {
        filterPillsContainer.removeChild(pill);
        break;
      }
    }
    if (label === "Price") {
      document.getElementById("priceFilter").value = "all";
    } else if (label === "Lipstick") {
      document.getElementById("lipstickFilter").checked = false;
    } else if (label === "Eyeshadow") {
      document.getElementById("eyeshadowFilter").checked = false;
    } else if (label === "Foundation") {
      document.getElementById("foundationFilter").checked = false;
    } else if (label === "Bronzer") {
      document.getElementById("bronzerFilter").checked = false;
    } else if (label === "Blush") {
      document.getElementById("blushFilter").checked = false;
    } else if (label === "Eyeliner") {
      document.getElementById("eyelinerFilter").checked = false;
    } else if (label === "4 Stars & above") {
      document.getElementById("fourStarFilter").checked = false;
    } else if (label === "3 Stars & above") {
      document.getElementById("threeStarFilter").checked = false;
    } else if (label === "Color") {
      document.getElementById("colorFilters").value = "all";
    }
  }
  applyFilters();
}
itemsPerPageSelect.addEventListener("change", () => {
  itemsPerPage = parseInt(itemsPerPageSelect.value);
  displayProducts(products, currentPage);
  updatePagination(products);
});