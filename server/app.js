'use strict';

const express = require('express');
const cors = require('cors');
const sequelize = require('./dbConnection');
const app = express();

//CORS
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());


app.get('/ping', (req, res) => {
  res.json(['djinni', 'helper']);
});

app.get('/hide', async (req, res) => {
  // const words = req.body.words;
  const vacancies = await sequelize.query("select count(*) from vacancy;", { type: sequelize.QueryTypes.SELECT })
  console.log(vacancies);
  res.json(vacancies);
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server running on http://localhost:8080');
});
