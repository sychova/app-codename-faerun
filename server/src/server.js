const express = require("express");

const pool = require("./db");

const app = express();

app.use(express.json());

// routes
app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    res.status(200).send({ users: data.rows });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    await pool.query("INSERT INTO users (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send("Successfully added user");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    res.status(200).send("Successfully created user db");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
