import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import 'dotenv/config';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// * routes file
app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});