const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const restaurants = require("./models/Restaurants");
const MenuItems = require("./models/Menu");

// Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/food_delivery_app")
  .then(() => {
    console.log("✅ MongoDB connected for seeding");
    seedDatabase();
  })
  .catch(err => {
    console.log("❌ MongoDB error", err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data
    await restaurants.deleteMany({});
    await menuItems.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Read restaurants JSON
    const restaurantPath = path.join(__dirname, "../data/restaurants.json");
    const restaurantData = JSON.parse(fs.readFileSync(restaurantPath, "utf8"));

    // Read menu JSON
    const menuPath = path.join(__dirname, "../data/menu.json");
    const menuData = JSON.parse(fs.readFileSync(menuPath, "utf8"));

    // Create a map to store restaurant ID mappings (old ID -> new MongoDB _id)
    const restaurantIdMap = {};

    // Seed restaurants
    console.log("🌱 Seeding restaurants...");
    for (const restaurant of restaurantsData) {
      const newRestaurant = new Restaurants({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        deliveryTime: restaurant.deliveryTime,
        image: restaurant.image,
        description: restaurant.description,
        deliveryFee: restaurant.deliveryFee,
        minOrder: restaurant.minOrder,
        areas: restaurant.areas
      });
      const savedRestaurant = await newRestaurants.save();
      restaurantsIdMap[restaurant.id] = savedRestaurant._id.toString();
      console.log(`  ✓ Created: ${restaurant.name}`);
    }

    // Seed menu items
    console.log("🌱 Seeding menu items...");
    for (const [restaurantsIdStr, menuItems] of Object.entries(menuData)) {
      const id = RestaurantIdStr;
      const mongoRestaurantId = restaurantsIdMap[id];

      if (!mongoRestaurantId) {
        console.log(`  ⚠️  Skipping menu for restaurant ID ${id} (not found)`);
        continue;
      }

      for (const menuItem of menuItems) {
        const newMenuItem = new Menu({
          restaurantsId: mongoRestaurantId,
          name: menuItem.name,
          description: menuItem.description,
          price: menuItem.price,
          image: menuItem.image
        });
        await newMenuItem.save();
      }
      console.log(`  ✓ Created ${menuItems.length} menu items for restaurants ID ${id}`);
    }

    console.log("\n✅ Database seeded successfully!");
    console.log(`   - ${restaurantsData.length} restaurants`);
    console.log(`   - ${Object.values(menuData).flat().length} menu items`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

