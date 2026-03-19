import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

// App config
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// Api endpoints
app.get("/", (req, res) => {
  res.send("API Works");
});

// start the server
app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
