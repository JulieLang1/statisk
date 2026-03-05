"use strict";

const productContainer = document.querySelector(".product_list_container");

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const h1 = document.querySelector("h1");
if (h1 && category) h1.textContent = category;

const url = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}` : "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then((response) => response.json())
  .then(showProducts)
  .catch((err) => console.error("Fetch fejl:", err));

function showProducts(productsArray) {
  productContainer.innerHTML = "";

  productsArray.forEach((product) => {
    const isSoldOut = product.soldout === 1;
    const isOnSale = product.discount > 0;
    // badges
    const saleBadge = isOnSale ? `<span class="badge sale">-${product.discount}%</span>` : "";

    const soldOutBadge = isSoldOut ? `<span class="badge soldout">Sold out</span>` : "";

    // priser (beregn nye pris)
    const newPrice = isOnSale ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

    const priceHtml = isOnSale
      ? `
        <span class="old">DKK ${product.price},-</span>
        <span class="now">DKK ${newPrice},-</span>
      `
      : `<span class="now">DKK ${product.price},-</span>`;

    productContainer.innerHTML += `
      <article class="product-card ${isSoldOut ? "udsolgt" : ""} ${isOnSale ? "nedsat" : ""}">
        <a href="produkt.html?id=${product.id}">
          <div class="product-media">
            ${saleBadge}
            ${soldOutBadge}
            <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="${product.productdisplayname}"
            />
          </div>

          <div class="product-body">
            <div class="product-title">${product.productdisplayname}</div>
            <div class="meta-line">${product.articletype} | ${product.brandname}</div>

            <div class="price">
              ${priceHtml}
            </div>

            <span class="card-link">Read more →</span>
          </div>
        </a>
      </article>
    `;
  });
}
