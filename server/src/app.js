const express = require("express");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Middleware
app.use(
	cors({
		origin: [
			"https://restaurant-app-aimx.vercel.app",
			"http://localhost:5173",
		],
		credentials: true,
	})
);
app.use(express.json({ limit: "16kb" })); //Json Handle with Body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Json Handle with URL
app.use(express.static("public")); //use for static items
app.use(cookieParser()); //Server to user's Browser cookies access for tokens

// Import Routes
const { authRouter } = require("./router/authRouter");
const { userRouter } = require("./router/userRouter");
const { menuRouter } = require("./router/menuRouter");
const { tableBookRouter } = require("./router/tableBookRouter");
const { cartRouter } = require("./router/cartRouter");
const { paymentRouter } = require("./router/payment");

app.get("/", (req, res) => {
	res.send("Backend running on Vercel 🚀");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/table-booking", tableBookRouter);
app.use("/user/cart", cartRouter);
app.use("/", paymentRouter);

app.use(errorMiddleware);

module.exports = app;
