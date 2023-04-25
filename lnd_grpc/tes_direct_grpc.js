const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const GRPC_HOST = '';
const MACAROON_PATH = '';
const TLS_PATH = '';
try{
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(`${__dirname}/lightning.proto`, loaderOptions);
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
const tlsCert = '';
const sslCreds = grpc.credentials.createSsl(tlsCert);
const macaroon = MACAROON_PATH;
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
  let metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});
let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
let client = new lnrpc.Lightning(GRPC_HOST, creds);
let request = {};
client.feeReport(request, function(err, response) {
});

}
catch(err){
}