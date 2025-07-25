import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Sequelize } from 'sequelize';

import AnimalModel from './models/animal.js';

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://animals-tinder-client.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Unable to connect to PostgreSQL:', err));
sequelize
  .sync({ force: false })
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error during synchronization:', err));

const Animal = AnimalModel(sequelize, Sequelize.DataTypes);

app.get('/animals', async (req, res) => {
  try {
    const animals = await sequelize.query('SELECT * FROM "Animals"', {
      type: Sequelize.QueryTypes.SELECT,
    });
    const prepearAnimals = animals.map((animal) => {
      return {
        id: animal.id,
        name: animal.name,
        imageURL: animal.urlimg,
        comment: animal.commentary,
        isCat: animal.iscat,
        isLike: animal.like,
      };
    });
    res.json(prepearAnimals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка получения Animals' });
  }
});

app.post('/animals', async (req, res) => {
  console.log('Полученные данные', req.body);
  try {
    const { imageURL, comment, isCat, isLike } = req.body;
    await Animal.create({
      urlimg: imageURL,
      commentary: comment,
      iscat: isCat,
      like: isLike,
    });
    res.status(201).json({ message: 'Зверушка добавлена!' });
  } catch (error) {
    console.error('Ошибка добавления зверушки', error.message);
    res.status(500).json({ error: 'Ошибка при сохранении зверушки' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
