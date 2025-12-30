document.addEventListener("DOMContentLoaded", async () => {
  // ===== ADMIN AUTH CHECK =====
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== "admin@gmail.com") {
    window.location.href = "login.html?admin=true";
    return;
  }

  initializeAdminNavigation();

  await loadRestaurantsForSelect();
  await loadRestaurantsTable();

  // ===== ADD RESTAURANT =====
  document
    .getElementById("addRestaurantForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const restaurant = {
        name: formData.get("name"),
        cuisine: formData.get("cuisine"),
        rating: parseFloat(formData.get("rating")),
        deliveryTime: formData.get("deliveryTime"),
        image: formData.get("image"),
        description: formData.get("description"),
      };

      await fetch("http://localhost:3000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      });

      document.getElementById("restaurantSuccess").style.display = "block";
      e.target.reset();

      await loadRestaurantsForSelect();
      await loadRestaurantsTable();

      setTimeout(() => {
        document.getElementById("restaurantSuccess").style.display = "none";
      }, 3000);
    });

  // ===== ADD MENU ITEM =====
  document
    .getElementById("addMenuItemForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const menuItem = {
        restaurantId: formData.get("restaurantId"), // MongoDB _id
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price")),
        image: formData.get("image"),
      };

      await fetch("http://localhost:3000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItem),
      });

      document.getElementById("menuItemSuccess").style.display = "block";
      e.target.reset();

      setTimeout(() => {
        document.getElementById("menuItemSuccess").style.display = "none";
      }, 3000);
    });
});

// ===== TAB SWITCHING =====
function showTab(tabName) {
  document.querySelectorAll(".admin-tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");

  if (tabName === "viewRestaurants") {
    loadRestaurantsTable();
  }
}

// ===== LOAD RESTAURANTS FOR SELECT =====
async function loadRestaurantsForSelect() {
  const res = await fetch("http://localhost:3000/api/restaurants");
  const restaurants = await res.json();

  const select = document.getElementById("menuRestaurantId");
  select.innerHTML =
    '<option value="">Select Restaurant</option>' +
    restaurants
      .map((r) => `<option value="${r._id}">${r.name}</option>`)
      .join("");
}

// ===== LOAD RESTAURANTS TABLE =====
async function loadRestaurantsTable() {
  const container = document.getElementById("restaurantsTableContainer");

  const res = await fetch("http://localhost:3000/api/restaurants");
  const restaurants = await res.json();

  if (restaurants.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🍽️</div>
        <h3>No restaurants available</h3>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="restaurants-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Cuisine</th>
          <th>Rating</th>
          <th>Delivery Time</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${restaurants
          .map(
            (r) => `
          <tr>
            <td><strong>${r.name}</strong></td>
            <td>${r.cuisine}</td>
            <td>⭐ ${r.rating}</td>
            <td>${r.deliveryTime}</td>
            <td>${r.description}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}
