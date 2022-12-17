
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
const app: Express = express();
const port: number = 3000;

app.use(bodyParser.json());

app.listen(port, () =>
{
    console.log("Server running on port: " + port);
});

let vehicles: any[] = [];

app.get('/hello', (req: Request, res: Response) => 
{
    let text: String = "Hello world";
    res.send(text);
});

app.post('/vehicle/add', (req: Request, res: Response) =>
{
    vehicles.push(
        {
            "model": req.body.model,
            "color": req.body.color,
            "year": req.body.year,
            "power": req.body.power,
        }
    );
    res.status(201);
    res.send("Vehicle added");
});

app.get('/vehicle/search/:model', (req: Request, res: Response) =>
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
