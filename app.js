const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const { ClientRequest } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
   
    const query=req.body.cityname;
    const apikey="59ddfacdc12bad17a9cb2cbd237507a9";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather/?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url,function(response){
     console.log(response.statusCode);

     response.on("data",function(data){

         const weatherData=JSON.parse(data);
         const temp=weatherData.main.temp;
         const weatherDescription=weatherData.weather[0].description;
    
         res.write("<div ><h1>The temperature in " + req.body.cityname +" is " + temp + " degrees celcius.</h1></div>");
         res.write("<h1>The weather data is " + weatherDescription + ".</h1>");
         res.write("<h2>Have a great day !</h2>");
         
         

     })
    })
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
})