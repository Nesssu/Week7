"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
let vehicles = [];
app.get('/hello', (req, res) => {
    let text = "Hello world";
    res.send(text);
});
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
app.post('/vehicle/add', (req, res) => {
    const newVehicle = req.body.vehicle;
    vehicles.push({
        "model": newVehicle.model,
        "color": newVehicle.color,
        "year": newVehicle.year,
        "power": newVehicle.power,
    });
    res.status(201);
    res.send("Vehicle added");
});
app.get('/vehicle/search/:model', (req, res) => {
    const model = req.params.model;
    let found = false;
    vehicles.forEach((item) => {
        if (item.model === model) {
            found = true;
            res.send(item);
        }
    });
    if (!found) {
        res.status(404);
        res.send("Model not found");
    }
});
