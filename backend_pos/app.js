const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
// app.use(cors({
//     //origin: 'http://ec708b19.ngrok.io'
//     origin: 'http://localhost:3000'
// }));

// app.use(cors({
//     origin: function(origin, callback){    // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
//         var msg = 'The CORS policy for this site does not ' +
//                     'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//         }    return callback(null, true);
//     }
// }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/point_of_sale', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("connected")})
.catch((err) =>{console.log("err",err);})

const product = require('./routes/product.route');
const payment = require('./routes/payment.route');

const port = process.env.PORT || 3100;

app.use('/api/product', product);
app.use('/api/payment', payment)

app.listen(port, () => {
    console.log('App listening on port: ' + port);
});