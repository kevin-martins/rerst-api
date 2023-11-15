require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { auth } = require('./routes/middleware');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", err => {
  console.log("Error: ", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected")
})

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// app.use("/", auth);

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const passRoutes = require('./routes/passRoutes');
app.use(passRoutes);

const placeRoutes = require('./routes/placeRoutes');
app.use(placeRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API",
      version: "1.0.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.post('/')

app.listen(PORT, () => {
  console.log(`server starts on port => ${PORT}`);
});
