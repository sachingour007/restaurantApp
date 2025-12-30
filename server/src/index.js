const dotenv = require("dotenv").config({ quiet: true });
const app = require("./app");
const connectDB = require("./db/inddex");

// Vercel ke liye database connection
connectDB().catch((err) => {
	console.log("Database connection failed", err);
});

if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}`);
	});
}

// connectDB()
// 	.then(() => {
// 		app.listen(process.env.PORT || 8080, () => {
// 			console.log(`http://localhost:${process.env.PORT}`);
// 		});
// 	})
// 	.catch((err) => {
// 		console.log("Server Not Wokring", err);
// 	});

module.exports = app;
