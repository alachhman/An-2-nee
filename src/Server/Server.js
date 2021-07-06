// @ts-ignore
var fs = require('fs');
var express = require('express');
var app = express();
var port = 3000;
var directory = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\UsableData\\";
var baseUrl = "http://localhost:3000/";
var data = [];
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/api/trainer', function (req, res) {
    var _a, _b;
    var trainer = (_a = req.query.name) !== null && _a !== void 0 ? _a : "";
    var special = (_b = req.query.special) !== null && _b !== void 0 ? _b : "false";
    var results = [];
    results = (trainer == "")
        ? data.map(function (x) {
            return { name: x.name, url: baseUrl + "api/trainer?name=" + encodeURIComponent(x.name.toLowerCase().trim()) };
        })
        : data.filter(function (x) { return x.name.toLowerCase().includes(trainer); });
    res.send(results);
});
app.listen(port, function () {
    console.log("listening at http://localhost:" + port);
    data = getData(directory);
});
var getData = function (resourcePath) {
    var files = fs.readdirSync(resourcePath).filter(function (file) { return file.endsWith('.json'); });
    var returnArr = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var rawData = fs.readFileSync(resourcePath + file);
        returnArr.push(JSON.parse(rawData));
    }
    return returnArr;
};
//# sourceMappingURL=Server.js.map