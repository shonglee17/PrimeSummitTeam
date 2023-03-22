import express from 'express';
import bodyParser from 'body-parser'
import testRouter from './routes/routes.js';
import postNewFlow from './routes/postNewFlow.router.js';
import cors from 'cors';


const app = express();

// /** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));
app.use(cors()); // Enable CORS


//this is a test query 
app.use('/', testRouter);
app.use('/addNewFlow', postNewFlow);


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

export default app;