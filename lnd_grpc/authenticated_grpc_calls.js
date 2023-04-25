const { InitializeAuthenticatedGrpcCommCredentials } = require("./initialize_authenticated_grpc_comm_credentials")

const GRPC_HOST = '';
const MACAROON_PATH = '';
const TLS_PATH = '';
class AuthenticatedGrpcCalls {

    get_client = (params) =>{
        const initializeAuthenticatedGrpcCommCredentials =  new InitializeAuthenticatedGrpcCommCredentials(); 
        return initializeAuthenticatedGrpcCommCredentials.get_lnrpc_client(params);
    }

     grpc_forwarding_history = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.forwardingHistory(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      };     
      
      
      grpc_get_channels = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.listChannels(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      };  

      grpc_get_chan_info = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.getChanInfo(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      };  
}


module.exports = { AuthenticatedGrpcCalls };
