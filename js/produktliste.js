"use strict";

const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then(showProducts);

function showProducts(productsArray) {
  productContainer.innerHTML = "";

  productsArray.forEach((product) => {
    const isSoldOut = product.soldout === 1;
    const isOnSale = product.discount > 0;

    // badges
    const saleBadge = isOnSale ? `<span class="badge sale">-${product.discount}%</span>` : "";

    const soldOutBadge = isSoldOut ? `<span class="badge soldout">Sold out</span>` : "";

    // priser
    // API: price = normal pris, discountedPrice = pris efter rabat (når discount > 0)
    const priceHtml = isOnSale
      ? `
        <span class="old">DKK ${product.price},-</span>
        <span class="now">DKK ${product.discount},-</span>
      `
      : `<span class="now">DKK ${product.price},-</span>`;

    productContainer.innerHTML += `
      <article class="product-card ${isSoldOut ? "udsolgt" : ""} ${isOnSale ? "nedsat" : ""}">
        <a href="produkt.html?id=${product.id}">
          <div class="product-media">
            ${saleBadge}
            ${soldOutBadge}
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                 alt="${product.productdisplayname}" />
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
