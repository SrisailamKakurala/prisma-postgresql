import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import 'dotenv/config';


const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// * routes file
app.use(routes);

app.listen(3000);