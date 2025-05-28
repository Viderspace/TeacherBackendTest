const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let classMaterial = "";

app.post('/set-material', (req, res) => {
  classMaterial = req.body.text;
  console.log("Lesson material received:", classMaterial.slice(0, 100));
  res.json({ status: 'ok' });
});

app.listen(10000, () => {
  console.log('Server running on port 10000');
});