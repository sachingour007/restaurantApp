const dotenv = require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/inddex");

connectDB()
	.then(() => {
		app.listen(process.env.PORT || 8080, () => {
			console.log(`http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log("Server Not Wokring", err);
	});
