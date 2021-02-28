const colors = require('colors')
const request = require('request')
const name = "nupur"
console.log(colors.green(name))
const express = require('express')

//ask express.js to look for a folder called views - inbuild functionailty of express.js
const app = express()
app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.render("homepage.ejs")
})
app.get("/result",(req, res) => {
        console.log(req.query.movieName)
        const url = `http://www.omdbapi.com/?apikey=621504fb&s=${req.query.movieName}`
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //parsing json into valid javascript object
                const data = JSON.parse(body)
                console.log(data)
                res.render("result", {movieData: data })
                //res.render("homepage",{movie: data})
                // console.log("success")
            } else {
                res.send("uh oh ! error!!")
            }
        })
    })
app.get("*",(req,res)=>{
    res.send("error page")
})
app.listen(3000,()=>{
     console.log("server has started  ")

})
//port-3000,5000,8000
//app.listen(port no , call back function(arrow funnction))