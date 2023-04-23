const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const GRPC_HOST = 'dragons-pearl.m.voltageapp.io:10009'
const MACAROON_PATH = '0201036C6E6402F801030A10D8DCB00976161A1C0B49D05DC39FDA651201301A160A0761646472657373120472656164120577726974651A130A04696E666F120472656164120577726974651A170A08696E766F69636573120472656164120577726974651A210A086D616361726F6F6E120867656E6572617465120472656164120577726974651A160A076D657373616765120472656164120577726974651A170A086F6666636861696E120472656164120577726974651A160A076F6E636861696E120472656164120577726974651A140A057065657273120472656164120577726974651A180A067369676E6572120867656E657261746512047265616400000620324C00031E19EBB2567D5A30339CF3250C6625C41F8B3E4FD74BA83A22302A0C';
const TLS_PATH = ''

// {
//     "cert": "",
//     "macaroon": "AgEDbG5kAvgBAwoQ2NywCXYWGhwLSdBdw5/aZRIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgMkwAAx4Z67JWfVowM5zzJQxmJcQfiz5P10uoOiIwKgw=",
//     "socket": "dragons-pearl.m.voltageapp.io:10009"
//   }


try{
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync('/Users/ruban/Documents/EF_Projects/BitcoinLightining/birkeland_lnd/protofiles/lightning.proto', loaderOptions);
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
//const tlsCert = fs.readFileSync(TLS_PATH);
const tlsCert = '';
const sslCreds = grpc.credentials.createSsl(tlsCert);
const macaroon = MACAROON_PATH;
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
  let metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  console.log(metadata)
  callback(null, metadata);
});
let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
let client = new lnrpc.Lightning(GRPC_HOST, creds);
let request = {};
client.feeReport(request, function(err, response) {
    console.log(err);
  console.log(response);
});
// Console output:
//  {
//    "channel_fees": <ChannelFeeReport>,
//    "day_fee_sum": <uint64>,
//    "week_fee_sum": <uint64>,
//    "month_fee_sum": <uint64>,
//  }

}
catch(err){

    console.log(err)
}