import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import wishlistRoutes from "./routes/wishlist.js";
import checkoutRoutes from "./routes/checkout.js";
dotenv.config();

const app = express();

// Connect to the database
connectDB()
  .then(() => {
    console.log("Connected to the database");

    // Enable CORS
    app.use(cors());

    // Parse JSON requests
    app.use(express.json());
const port = process.env.PORT || 5000;
        // Routes
app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)
app.use("/wishlist", wishlistRoutes)
app.use("/checkout", checkoutRoutes)

    // Start the server
    app.listen(port, () => console.log("Server started on port 5000"));
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });