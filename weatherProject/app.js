//using express to render a website with live API data
// requiring express module
const express = require("express");
// requiring node https module => to make a get request to an external server
const https = require("https");
// requiring body parser using bodyParser to parse POST Request to the server
const bodyParser = require("body-parser");

// initializing a new express app and a port
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 4000;
app.listen(port,()=>{
    console.log(`server is runnig on port ${port}`);
})

// get request => what happen when a user enter the address /localhost:3000; which is the home page
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>{
    //using bodyParser to parse POST Request to the server
    const queryCityName = req.body.cityName;
    // Weather API url
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queryCityName+"&appid=fd06f0d5975abeeddd6f8192e9fb9fda&units=metric";
    // using the https module to make a GET request to the API server and use the response given back to access data
    https.get(url, (response)=>{
        // this method get hold of the response data
        response.on("data",(data)=>{
            //changes the response to a JS object
            const weatherData = JSON.parse(data);
            //manipulating the response object to get what we want
            const temp = weatherData.main.temp;
            const descrpt = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The weather is currently ${descrpt}</h1>`);
            res.write(`<h1>The temperature in ${queryCityName} is ${temp} degrees celcius.</h1>`);
            res.write("<img src=" +imgURL+ ">");
            res.send();
            

        });

    });

});

        


