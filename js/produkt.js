"use strict";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  productTitle.textContent = "Mangler id i URL (produkt.html?id=XXXX)";
} else {
  fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
    .then((r) => r.json())
    .then(showProduct)
    .catch(() => {
      productTitle.textContent = "Kunne ikke hente produkt.";
    });
}

function showProduct(data) {
  const isSoldOut = data.soldout == 1;
  const isOnSale = data.discount > 0;

  crumbTitle.textContent = data.productdisplayname;
  productTitle.textContent = data.productdisplayname;
  brand.textContent = data.brandname ?? "";
  type.textContent = data.articletype ?? "";
  category.textContent = data.category ?? "";
  season.textContent = data.season ?? "";
  usage.textContent = data.usagetype ?? "";

  brandName.textContent = data.brandname ?? "";
  articleType.textContent = data.articletype ?? "";

  productImg.src = `https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp`;
  productImg.alt = data.productdisplayname;

  if (isOnSale) {
    saleBadge.hidden = false;
    saleBadge.textContent = `-${data.discount}%`;
  } else {
    saleBadge.hidden = true;
  }

  soldoutBadge.hidden = !isSoldOut;
  soldoutText.hidden = !isSoldOut;

  priceBox.innerHTML = "";
  if (isOnSale) {
    const newPrice = Math.round(data.price * (1 - data.discount / 100));
    priceBox.innerHTML = `
      <span class="old">DKK ${data.price},-</span>
      <span class="now">DKK ${newPrice},-</span>
    `;
  } else {
    priceBox.innerHTML = `<span class="now">DKK ${data.price},-</span>`;
  }

  addBtn.disabled = isSoldOut;
  addBtn.textContent = isSoldOut ? "Sold out" : "Add to basket";
}
const brand = document.querySelector("#brand");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const season = document.querySelector("#season");
const usage = document.querySelector("#usage");
