"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
let vehicles = [];
app.get('/hello', (req, res) => {
    let text = "Hello world";
    res.send(text);
});
app.post('/vehicle/add', (req, res) => {
    if (req.body.bodyType === undefined) {
        if (req.body.draft === undefined) {
            vehicles.push({
                "model": req.body.model,
                "color": req.body.color,
                "year": req.body.year,
                "power": req.body.power,
                "wingspan": req.body.wingspan
            });
        }
        else if (req.body.wingspan === undefined) {
            vehicles.push({
                "model": req.body.model,
                "color": req.body.color,
                "year": req.body.year,
                "power": req.body.power,
                "draft": req.body.draft
            });
        }
        else {
            vehicles.push({
                "model": req.body.model,
                "color": req.body.color,
                "year": req.body.year,
                "power": req.body.power,
            });
        }
    }
    else {
        vehicles.push({
            "model": req.body.model,
            "color": req.body.color,
            "year": req.body.year,
            "power": req.body.power,
            "bodyType": req.body.bodyType,
            "wheelCount": req.body.wheelCount
        });
    }
    res.status(201);
    res.send("Vehicle added");
});
app.get('/vehicle/search/:model', (req, res) => {
    const model = req.params.model;
    let found = false;
    vehicles.forEach((item) => {
        if (item.model === model && !found) {
            found = true;
            res.send(item);
        }
    });
    if (!found) {
        res.status(404);
        res.send("Model not found");
    }
});
