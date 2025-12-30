// // const mongoose = require("mongoose");

// // mongoose.connect("mongodb://127.0.0.1:27017/food_delivery_app")
// //   .then(() => console.log("✅ MongoDB connected"))
// //   .catch(err => console.log("❌ MongoDB error", err));

// const mongoose = require("mongoose");

// if (process.env.NODE_ENV !== "test") {
//   mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch(err => console.error("❌ DB error", err));
// }

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/FoodDeliveryApp");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;



