const express = require('express');
const app = express();
const Twitter = require("./helpers/twitter");
const twitter = new Twitter();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.get("/", (req,res) => {
    res.status(200).send("hi")
})

app.get("/tweets", (req,res) => {
    const query = req.query.q;
    const count = req.query.count;
    twitter.get(query, count).then((response) => {
        res.status(200).send(response.data);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.listen(process.env.PORT || 3000, () => {
    console.log("http://localhost:3000");
})