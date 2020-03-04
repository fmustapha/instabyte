const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Instabyte is here!')
});

app.listen(3000, ()=> {
 console.log(`App listening on port http://127.0.0.1:3000/`)
});