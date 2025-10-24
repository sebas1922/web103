import express from "express";
import cors from "cors";
import tripsRoutes from "./routes/trips.js";
const PORT = process.env.PORT || 3000;
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//trips routes
app.use("/trips", tripsRoutes);

//routes
app.get("/", (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>');
});

//listen
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  })