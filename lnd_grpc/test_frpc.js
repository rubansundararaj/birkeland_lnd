const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');



const GRPC_HOST = ''
const MACAROON_PATH = '';
const TLS_PATH = ''

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(`${__dirname}/faraday.proto`, loaderOptions);
const frdrpc = grpc.loadPackageDefinition(packageDefinition).frdrpc;
console.log(frdrpc)
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
let client = new frdrpc.FaradayServer(GRPC_HOST, creds);
let request = {};
console.log(client)
client.channelInsights(request, function(err, response) {
    if(err) {
        console.log(err);
    }
  console.log(response);
});
// Console output:
//  {
//    "channel_insights": <ChannelInsight>,
//  }