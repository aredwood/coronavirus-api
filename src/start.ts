import express from "express";
import handler from "./index"

const app = express();
app.get("/",handler);

app.listen(process.env.PORT??8080)
