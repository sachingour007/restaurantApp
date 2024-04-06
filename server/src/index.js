const app = require("./app.js");
const dotenv = require("dotenv").config();
const connectDB = require("./db/index.js");

// app.use("/", (req, res) => {
//   res.status(200).send("Hello, you are at Home");
// });



connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    "MONGO DB connection failed !!!", err;
  });
