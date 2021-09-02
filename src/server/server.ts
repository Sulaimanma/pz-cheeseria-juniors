import express = require('express');
import apiRouter from './routes';
import mongoose = require('mongoose');
import Purchase from './data/models/purchase';

const app = express();

//Connect to mogonDB datatbase
mongoose
  .connect(
    'mongodb+srv://sulaiman:Lgp2755487@pz-cheese.cp3h9.mongodb.net/pz-cheese?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('connect result', result);
    //Clean database
    // Purchase.deleteMany()
    //   .then(function () {
    //     console.log('Data deleted'); // Success
    //   })
    //   .catch(function (error) {
    //     console.log(error); // Failure
    //   });
  })
  .catch((err) => console.log('connection error', err));

//Add middleware to parse json
app.use(express.json());
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
