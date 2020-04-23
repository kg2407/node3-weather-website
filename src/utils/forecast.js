const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d2184a9c9d0ba6a2d262124d2c921758&query='+ latitude+','+longitude +'&units=f' 
    //request({url:url,json:true},(error,response)=>{
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to Weather API !',undefined)
        }else if(body.error){
            callback('Unable to find the location. Try another search!',undefined)
        }else{
            callback(undefined,' It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + '. Overall weather is '+body.current.weather_descriptions)
        }
    })

}

module.exports = forecast