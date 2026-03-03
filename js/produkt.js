const params = new URLSearchParams(window.location.search);
console.log(params);
const id = params.get("id");
console.log(id);

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = ` <div class="page-top">
        <div class="breadcrumb">
          <a href="index.html">Home</a> › <a href="produktliste.html">Brands</a> › <a href="produktliste.html">Nike</a> ›
          <strong>Sahara Team India Fanwear Round Neck Jersey</strong>
        </div>
      </div>

      <section class="product-layout" aria-label="Produkt detaljer">
        <!-- Venstre: billede -->
        <div class="product-hero">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="Sahara Team India Fanwear Round Neck Jersey " />
        </div>

        <!-- Højre: info + køb -->
        <div class="product-info">
          <div class="info-card">
            <h2>Product Information</h2>
            <div class="info-grid">
              <div class="label">Kategori</div>
              <div>${data.category}</div>
              <div class="label">Sub kategori</div>
              <div>${data.subcategory}</div>
              <div class="label">Articletype</div>
              <div>${data.articletype}</div>
              <div class="label">Season</div>
              <div>${data.season}</div>
              <div class="label">Product display name</div>
              <div>${data.productdisplayname}</div>
              <div class="label">Production year</div>
              <div>${data.productionyear}</div>
              <div class="label">Type</div>
              <div>${data.usagetype}</div>
              <div class="label"> Price </div>
              <div>${data.price}</div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border); margin: 14px 0" />

            <div style="display: flex; flex-direction: column; gap: 6px">
              <div style="font-size: 32px; font-weight: 900; letter-spacing: -0.02em">Nike</div>
              <div class="small">Nike, creating experiences for today's athlete</div>
            </div>
          </div>

          <aside class="buy-box">
            <div class="brandline">Sahara Team India Fanwear Round Neck Jersey</div>
            <div class="small">Nike | Tshirts</div>

            <div class="select-row">
              <label class="small" for="size" style="min-width: 90px">Choose size</label>
              <select id="size" name="size">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <button type="button">Add to basket</button>
          </aside>
        </div>
      </section> `;
  });

const productContainer = document.querySelector(".container");
