const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname,'../public'))
// console.log(__filename)
// console.log(__dirname)

//To generate the application
const app = express() 

//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title :'Weather',
        name : 'Karun Gupta'
    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
       title : 'About Me',
       name : 'Karun Gupta'
   }) 
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'Help',
        message : 'These are testing times. Be at home and stay safe. Jai Hind Jai Bharat!',
        name : 'Karun Gupta'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        })
    }
    //geoCode(req.query.address,(error,data)=>{
    geoCode(req.query.address,(error,{ latitude,longitude,location } = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })

    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'Help article not found',
        name : 'Karun Gupta'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'Page not found',
        name : 'Karun Gupta'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port ',port)
})