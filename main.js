let products;

document.addEventListener("DOMContentLoaded", () => {
  //fetch from API
  fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function displayProducts(products) {
  const gridContainer = document.getElementById("product-grid");

  products.forEach(product => {
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

function openModal(productId) {
    const modal = document.getElementById('modal');
    modal.innerHTML = "";

    const selectedProduct = products.find(
      (product) => product.id === productId
    );
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
      <!-- Add more buttons or links as needed -->

      <div class="color-list">
        <p>Available Colors:</p>
        <ul>
          <!-- Logic to dynamically populate colors based on the product -->
          ${selectedProduct.product_colors
            .map((color) => `<li>${color.colour_name}</li>`)
            .join("")}
        </ul>
      </div>
    </div>
  `;
   modal.style.display = 'block';

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
    return true;
  });

   const gridContainer = document.getElementById("product-grid");
   gridContainer.innerHTML = "";

  displayProducts(filteredProducts);
}
