const express = require('express');
const app = express();
const methodOverride = require('method-override');

//calling all established functions in respective APIs
const cityAPI = require('./API/cityAPI.js');
const eventsAPI = require('./API/eventsAPI.js');
const singleEventAPI = require('./API/singleEventAPI.js');

app.use(express.json());

app.use(express.static(__dirname + '/client/build/'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
   })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})


