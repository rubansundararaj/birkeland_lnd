const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');




class InitializeAuthenticatedGrpcCommCredentials {

    get_lnrpc_client = (GRPC_HOST, MACAROON_PATH,TLS_PATH) => {
     
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
        const tlsCert = TLS_PATH;
        const sslCreds = grpc.credentials.createSsl(tlsCert);
        const macaroon = MACAROON_PATH;
        const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
        let metadata = new grpc.Metadata();
        metadata.add('macaroon', macaroon);
        console.log(metadata)
        callback(null, metadata);
        });
        let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
        return new lnrpc.Lightning(GRPC_HOST, creds);

    }

}

module.exports = { InitializeAuthenticatedGrpcCommCredentials };