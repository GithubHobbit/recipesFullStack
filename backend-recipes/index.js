import express from "express";
import router from './src/routes/index.js';
import fileUpload from 'express-fileupload'
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json({limit: '50mb'}));
// app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
  try {
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (error) {
    console.log(error);
  }
}

startApp();
