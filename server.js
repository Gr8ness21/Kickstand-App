const express = require('express');
const app = express();

//calling all established functions in respective APIs
const cityAPI = require('./API/cityAPI.js');
const eventsAPI = require('./API/eventsAPI.js');
const singleEventAPI = require('./API/singleEventAPI.js');

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Linking CSS
app.use('/client/public', express.static("public"))

app.use(express.static(__dirname + '/client/build/'));

// _____________________________________
//              City Model 
// _____________________________________


app.get('/API/city', (req, res) => {
    cityAPI.getAllCities()
        .then(cities => {
            res.send(cities);
        });
});

// Posting a new City
app.post('/API/city', (req, res) => {
    cityAPI.createNewCity(req.body)
        .then((cities) => {
            res.send(cities);
        });
});

// Deleting a new City
app.delete('/API/city/:cityId', (req, res) => {
    cityAPI.deleteCityById(req.params.cityId)
        .then((cities) => {
            res.send(cities);
        });
});

// Access a single City
app.get('/API/city/:cityId', (req, res) => {
    //gets city
    cityAPI.getCityById(req.params.cityId)
        .then((city) => {
            parkApi.getParksByCityId(req.params.cityId)
                .then((parks) => {
                    console.log(city)
                    
                    console.log(events)
                  
                    res.send({ city, events });
                });
        });
});

// Update a City
app.put('/api/city/:cityId', (req, res) => {
    cityAPI.updateCityById(req.params.cityId, req.body)
        .then((city) => {
            res.send(city)
        });
});


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
   })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})


