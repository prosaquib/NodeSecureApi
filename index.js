import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel';


const app = express();
const PORT = 3000;

app.get('/', (req, res) =>
    res.send(`Node and Express is running on ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`My server is running on ${PORT}`)
);

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true
});

//body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//JWT Setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err,decode) => {
            if(err) req.user = undefined;
            req.user = decode;
            next();
        });
    }else{
        req.user = undefined;
        next();
    }
});

routes(app);

//Serve static file
app.use(express.static('public'))


