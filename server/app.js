'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const sequelize = require('./dbConnection');
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get('/ping', async (req, res) => {
  res.json('pong')
})

app.post('/mark', async (req, res) => {
  const link = req.body.link;
  const [hide, fav] = req.body.action === 'hide' ? [1,0] : [0,1];
  const sql = "INSERT INTO `vacancy` (`link`, `hide`, `fav`) VALUES (:link, :hide, :fav);"
  const inRes = await sequelize.query(sql, { replacements: { link, hide, fav }, type: sequelize.QueryTypes.INSERT })
  res.json(inRes);
});

app.post('/check', async (req, res) => {
  const links = req.body.links;
  const sql = "SELECT * FROM  `vacancy` WHERE `link` in (:links);"
  const result = await sequelize.query(sql, { replacements: { links }, type: sequelize.QueryTypes.SELECT })
  res.json(result);
});


const PORT = process.env.SERVER_PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
