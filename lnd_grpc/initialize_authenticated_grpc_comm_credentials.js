const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');




class InitializeAuthenticatedGrpcCommCredentials {

    get_lnrpc_client = (cred) => {
     const {macaroon,tls_cert,socket} = cred
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
        const tlsCert = tls_cert;
        const sslCreds = grpc.credentials.createSsl(tlsCert);
        const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
        let metadata = new grpc.Metadata();
        metadata.add('macaroon', macaroon);
        callback(null, metadata);
        });
        let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
        return new lnrpc.Lightning(socket, creds);

    }

}

module.exports = { InitializeAuthenticatedGrpcCommCredentials };