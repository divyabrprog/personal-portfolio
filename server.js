const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

let projectsCollection;

async function connectDatabase() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not configured");
    }

    const client = new MongoClient(MONGODB_URI);

    await client.connect();

    const database = client.db("portfolio");
    projectsCollection = database.collection("projects");

    console.log("Connected to MongoDB");
}

app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

app.get("/api/projects", async (req, res) => {
    try {
        const projects = await projectsCollection
            .find({})
            .toArray();

        res.json(projects);
    } catch (error) {
        console.error("Failed to load projects");

        res.status(500).json({
            error: "Unable to load portfolio projects"
        });
    }
});

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
});
