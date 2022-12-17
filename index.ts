
import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: number = 8000;

let vehicles: {model: string, color: string, year: number, power: number}[] = [];

app.get('/hello', (req: Request, res: Response) => 
{
    let text: String = "Hello world";
    res.send(text);
});

app.listen(port, () =>
{
    console.log("Server running on port: " + port);
});

app.post('/vehicle/add', (req, res) =>
{
    const newVehicle = req.body.vehicle;
    vehicles.push(
        {
            "model": newVehicle.model,
            "color": newVehicle.color,
            "year": newVehicle.year,
            "power": newVehicle.power,
        }
    );
    res.status(201);
    res.send("Vehicle added");
});

app.get('/vehicle/search/:model', (req, res) =>
{
    const model: string = req.params.model;
    let found: boolean = false;

    vehicles.forEach((item) => {
        if (item.model === model)
        {
            found = true;
            res.send(item);
        }
    });

    if (!found)
    {
        res.status(404);
        res.send("Model not found");
    }
});
