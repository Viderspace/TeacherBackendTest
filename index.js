const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let classMaterial = "";

app.post('/set-material', (req, res) => {
  classMaterial = req.body.text;
  console.log("Received class material:", classMaterial?.slice(0, 100));
  res.json({ status: 'ok', message: 'Lesson uploaded!' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});