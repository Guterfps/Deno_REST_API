// @deno-types="npm:@types/express@4"
import express, {NextFunction, Request, Response} from "npm:express@4.18.2";

const app = express();
const port = Number(Deno.env.get("PORT") || 3000);

const reqLogger = function (req, _res, next){
    console.log(`${req.method} request to "${req.url}" by ${req.hostname}`);
    next();
};

app.use(reqLogger);

app.get("/", (_req, res) => {
    res.status(200).send("Hello from Deno!");
});



app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});
