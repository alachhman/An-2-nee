// @ts-ignore
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const directory = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\UsableData\\";
const baseUrl = "http://localhost:3000/";
let data = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/trainer', (req, res) => {
    let trainer = req.query.name ?? "";
    let special = req.query.special ?? "false";
    let results = [];
    results = (trainer == "")
        ? data.map(x => {
            return {name: x.name, url: baseUrl + "api/trainer?name=" + encodeURIComponent(x.name.toLowerCase().trim())}
        })
        : data.filter(x => x.name.toLowerCase().includes(trainer))
    res.send(results)
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
    data = getData(directory)
})

let getData = (resourcePath) => {
    let files = fs.readdirSync(resourcePath).filter(file => file.endsWith('.json'));
    let returnArr = [];
    for (let file of files) {
        let rawData = fs.readFileSync(resourcePath + file);
        returnArr.push(JSON.parse(rawData));
    }
    return returnArr;
}
