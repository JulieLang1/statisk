const categoryContainer = document.querySelector(".category_list_container");
// console.log(categoryContainer);

// const categories = ["Accessories", "Apparel", "Footwear", "Free Items", "Personal Care", "Sporting Goods"];
// categories.forEach((category) => {
//   //   console.log(category);
//   categoryContainer.innerHTML += ` <a class="category-card" href="produktliste.html">${category}</a>`;
// });

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryContainer.innerHTML += ` <a class="category-card" href="produktliste.html">${category.category}</a>`;
    });
  });
