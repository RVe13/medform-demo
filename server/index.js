import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Formation from "./models/formation.js";
import Medicament from "./models/medicament.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }))


const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb connected successfully");
    app.listen(PORT, () => {
      console.log(`Server started on port${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.post("/add-formation", async (req, res) => {
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

app.post("/add-medicament", async (req, res) => {
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

app.get("/get-formation/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "FORMATION ID IS MISSING" });
  }

  try {
    const formation = await Formation.findById(id);

    if (!formation) {
      res.status(404).send("THE FORMATION IS NOT FOUND");

      res.status(200).send(formation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/get-medicament/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "MEDICAMENTS ID IS MISSING" });
  }

  try {
    const medicament = await Medicament.findById(id);
    if (!medicament) res.status(404).send("THE MEDICAMENT IS NOT FOUND");

    res.status(200).send(medicament);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});


app.delete("/delete-formation/:id", async(req, res)=>{
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

app.delete("/delete-medicament/:id", async(req, res)=>{
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




