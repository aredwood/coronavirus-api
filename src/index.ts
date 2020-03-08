// this is the entry point of the application
// this is a web app that listens on 8080, and can be built into a container.
// or deployed as a cloud function on GCP
import express from "express";

const app = express();

app.get("/",(req,res) => {
    res.sendStatus(200);
})


// this is for functionality in a docker container
if(!process.env.PORT){
    throw new Error("NO_PORT_SPECIFIED");
}
else{
    app.listen(Number(process.env.PORT));
}

// this line allows the app to be deployed as a google cloud function
export default app;