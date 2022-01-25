const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
const { logErrors, wrapError, errorHandler } = require('./middleware/v1/errorHandler.middleware');




const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(express.json());
app.use(cors());



const authRouter = require("./routes/v1/authRoutes");
app.get('/', (req, res, next)=>{
	res.status(200);
})
app.use('/auth', authRouter);

//manejadores de errores
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


module.exports = app;
