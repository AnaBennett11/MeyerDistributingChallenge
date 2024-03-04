document.addEventListener("DOMContentLoaded", () => {
  //fetch from API
  fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((response) => response.json())
    .then((data) => {
      const products = data;
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

      </div>`;

      gridContainer.appendChild(productCard);
  });
}
