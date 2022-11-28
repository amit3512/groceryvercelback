const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const { MONGO_DB_CONFIG } = require("../config/app.config");
// const errors = require("../middleware/errors");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors");
// const swaggerUI = require("swagger-ui-express"),
//   swaggerDocument = require("./swagger.json");

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected" + " " + 4000);
    },
    (error) => {
      console.log("Database cant be connected" + error);
    }
  );

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use("/api/user", require("./routes/app.user"));
// app.use(errors.errorHandler);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("/"));
  const path = require("path");
  app.get("/", (req, res) => {
    res.status(200).send("Hello server is running").end();
  });
}
app.listen(process.env.PORT || 4000, function () {
  console.log("Ready to Go!");
});
