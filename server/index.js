import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Formation from "./models/formation.js";
import Medicament from "./models/medicament.js";
import cors from "cors";
import Error from "./models/error.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }))


const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;
const API_KEY = process.env.API_KEY

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb connected successfully");
    app.listen(PORT, () => {
      console.log(`Server started on port${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// Middleware to check API key
function checkAPIKey(req, res, next) {
  const apiKey = req.headers.authorization;

  // Check if the API key matches the admin API key
  if (apiKey && apiKey === API_KEY) {
    next(); // API key is valid, proceed to the route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post("/add-formation",checkAPIKey ,async (req, res) => {
  const {title, description, content, image} = req.body;
  if (!title || !image || !description || !content)
    return res.status(400).send({ message: "THE FORMATION BODY IS MISSING" });
  const formation = new Formation({
    title: title,
    description: description,
      content: content, 
      image: image,

  });

  formation
    .save()
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      res.status(500).send({ message: error.message });
      console.log(error.message);
    });
});

app.post("/add-medicament",checkAPIKey , async (req, res) => {
  const {title, description, content, image} = req.body;
  if (!title || !image || !description || !content)
    return res.status(400).send({ message: "THE MEDICAMENT BODY IS MISSING" });
  const medicament = new Medicament({
    title: title,
    description: description,
      content: content, 
      image: image,

  });

  medicament
    .save()
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      res.status(500).send({ message: error.message });
      console.log(error.message);
    });
});

app.post("/add-error", async (req, res) => {
  const {title, errorType, content, grad} = req.body;
  if (!title || !grad || !errorType || !content)
    return res.status(400).send({ message: "THE ERROR POST BODY IS MISSING" });
  const error = new Error({
    title: title,
    type: errorType,
      content: content, 
      grad: grad,

  });

    error
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      res.status(500).send({ message: err.message });
      console.log(err.message);
    });
});

app.get("/get-formation", async (req, res) => {
  try {
    const formations = await Formation.find(
      {},
      "_id title description createdAt image"
    );
    res.status(200).send(formations);
  } catch (error) {
    console.log("error");
    return res.send({ message: error.message });
  }
});

app.get("/get-medicament", async (req, res) => {
  try {
    const medicament = await Medicament.find(
      {},
      "_id title description createdAt image"
    );
    if (!medicament)
      return res.status(200).send({ message: "Medicament is empty" });
    res.status(200).send(medicament);
  } catch (error) {
    console.log("ERROR IN GET MEDICAMENT", error);
    return res.send({ message: error.message });
  }
});

app.get("/get-error", async (req, res) => {
  try {
    const error = await Error.find(
      {},
      "_id title type createdAt grad"
    );
    if (!error)
      return res.status(200).send({ message: "Error is empty" });
    res.status(200).send(error);
  } catch (err) {
    console.log("ERROR IN GET ERRORS", err);
    return res.send({ message: err.message });
  }
});


app.get("/get-formation/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "FORMATION ID IS MISSING" });
  }

  try {
    const formation = await Formation.findById(id);

    if (!formation) {
      res.status(404).send("THE FORMATION IS NOT FOUND"); 
    }
      res.status(200).send(formation);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/get-medicament/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "MEDICAMENT ID IS MISSING" });
  }

  try {
    const medicament= await Medicament.findById(id);

    if (!medicament) {
      res.status(404).send("THE FORMATION IS NOT FOUND"); 
    }
      res.status(200).send(medicament);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/get-error/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "ERROR POST ID IS MISSING" });
  }

  try {
    const error = await Error.findById(id);

    if (!error) {
      res.status(404).send("THE ERROR POST IS NOT FOUND"); 
    }
      res.status(200).send(error);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});


app.delete("/delete-formation/:id",checkAPIKey , async(req, res)=>{
const id = req.params.id;
if (!id) {
    res.status(400).send({ message: "FORMATION ID IS MISSING" });
  }

try {
    await Formation.deleteOne({_id : id})
    res.status(200).send("formation deleted")
    
} catch (error) {
    res.status(500).send({ message: error.message });
}

})

app.delete("/delete-medicament/:id",checkAPIKey , async(req, res)=>{
const id = req.params.id;
if (!id) {
    res.status(400).send({ message: "MEDICAMENTS ID IS MISSING" });
  }

try {
    await Medicament.deleteOne({_id : id})
    res.status(200).send("medicament deleted")
    
} catch (error) {
    res.status(500).send({ message: error.message });
}

})

app.delete("/delete-error/:id",checkAPIKey , async(req, res)=>{
const id = req.params.id;
if (!id) {
    res.status(400).send({ message: "ERROR POST ID IS MISSING" }); }

try {
    await Error.deleteOne({_id : id})
    res.status(200).send("Error post deleted")
    
} catch (err) {
    res.status(500).send({ message: err.message });
}

})


