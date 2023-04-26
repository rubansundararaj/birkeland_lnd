const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');




class InitializeFaradayGrpcCommCredentials {

    get_lnrpc_client = (cred) => {
     const {macaroon,tls_cert,socket} = cred
        const loaderOptions = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          };

        const packageDefinition = protoLoader.loadSync(`${__dirname}/faraday.proto`, loaderOptions);
        const frdrpc = grpc.loadPackageDefinition(packageDefinition).frdrpc;
        process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
        const tlsCert = tls_cert;
        const sslCreds = grpc.credentials.createSsl(tlsCert);
        const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
        let metadata = new grpc.Metadata();
        metadata.add('macaroon', macaroon);
        callback(null, metadata);
        });
        let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
        return new frdrpc.FaradayServer(socket, creds);

    }

}

module.exports = { InitializeFaradayGrpcCommCredentials };