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
