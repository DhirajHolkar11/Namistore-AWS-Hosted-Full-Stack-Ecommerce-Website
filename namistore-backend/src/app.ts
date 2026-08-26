import express from "express";
import cors from "cors";
import registerRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";

import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import addressRoutes from "./routes/address.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import paymentRoutes from "./routes/payment.routes";
import adminRoutes from "./admin/routes/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", registerRoutes);
app.use("/api",profileRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", addressRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", paymentRoutes);
app.use("/api/admin", adminRoutes);





app.get('/',(req,res)=>{
    res.send("server is running");
})



export default app;