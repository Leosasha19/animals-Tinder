import express from 'express';
import cors from 'cors';
import {Sequelize} from "sequelize";
import AnimalModel from "../models/animal.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

const sequelize = new Sequelize('database_animals', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
})

sequelize
    .authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Unable to connect to PostgreSQL:', err));
sequelize.sync({force: false})
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error during synchronization:', err));

const Animal = AnimalModel(sequelize, Sequelize.DataTypes);

app.get("/animals", async (req, res) => {
   try {
       const animals = await sequelize.query('SELECT * FROM "Animals"', {
           type: Sequelize.QueryTypes.SELECT
       })
       res.json(animals);
   } catch (error) {
       console.log(error);
       res.status(500).json({error: "Ошибка получения Animals"})
   }
})

app.post("/animals", async (req, res) => {
    console.log("Полученные данные", req.body);
    try {
        const {imageURL, comment, isACat, like} = req.body;
        await Animal.create({
            urlimg: imageURL,
            commentary: comment,
            iscat: isACat,
            like: like,
        })
        res.status(201).json({ message: "Зверушка добавлена!" });
    } catch (error) {
        console.error("Ошибка добавления зверушки",error.message)
        res.status(500).json({error: "Ошибка при сохранении зверушки"})
    }
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})