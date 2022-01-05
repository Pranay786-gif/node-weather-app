const path = require('path')
const express = require('express');
const hbs = require("hbs")
const app = express();
const geocode =require("./utils/geocode");
const forecast= require("./utils/forecast");
console.log(__dirname)

const port = process.env.PORT||3000
// define path for express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,"../templates/partials")

// setup the handlebars and set location for views
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialPath)

// for serving the static html file
app.use(express.static(publicPathDirectory))

app.get("",(req,res)=>{
    res.render("index",{
        name:"Pranay",
        title:"weather"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Pranay",
        title:"developer"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        name:"Pranay",
        desciption:"please help people",
        title:"help"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Please Privide address term"})
    }

    geocode(req.query.address, (error, {lattitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(lattitude,longitude,(error,{temperature,feelslike,humidity})=>{
          if(error){
            return res.send({error})
          }
          res.send({
            forecast:temperature,
            location:location,
            address:req.query.address,
            humidity
        })
       
       })
      
      });
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        error:"help article not found",
        title:"404 page",
        name:"Pranay"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        error:"Page not found",
        title:"404 page",
        name:"Pranay"
    })
})





app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})