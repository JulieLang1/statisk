"use strict";

const categoryContainer = document.querySelector(".category_list_container");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categoryContainer.innerHTML = "";

    categories.forEach((category) => {
      categoryContainer.innerHTML += `
        <a class="category-card" href="produktliste.html?category=${category.category}">
          ${category.category}
        </a>
      `;
    });
  });
