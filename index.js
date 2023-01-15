const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const { PerformAuthenticatedOperation } = require('./perform_auth_operation');
const { LND_GRPC_OPERATION } = require('./operations');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()); 


const test_ldn_ops = async(req,res) =>{
 let resp =   await PerformAuthenticatedOperation({operation :LND_GRPC_OPERATION.GET_CHANNEL_BALANCE})
 return res.status(200).send({ success: true, message: resp });
}



app.post("/", test_ldn_ops);

const port = 9990;

app.listen(port, () => 
{
    console.log('Running on port ' + port);
});

module.exports = app;