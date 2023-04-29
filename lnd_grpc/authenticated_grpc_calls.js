const { InitializeAuthenticatedGrpcCommCredentials } = require("./initialize_authenticated_grpc_comm_credentials");
const { InitializeFaradayGrpcCommCredentials } = require("./initialize_faraday_grpc_comm_credentials");

const GRPC_HOST = '';
const MACAROON_PATH = '';
const TLS_PATH = '';
class AuthenticatedGrpcCalls {

    get_client = (params) =>{
        const initializeAuthenticatedGrpcCommCredentials =  new InitializeAuthenticatedGrpcCommCredentials(); 
        return initializeAuthenticatedGrpcCommCredentials.get_lnrpc_client(params);
    }
    get_faraday_client = (params) =>{
      const initializeFaradayGrpcCommCredentials =  new InitializeFaradayGrpcCommCredentials(); 
      return initializeFaradayGrpcCommCredentials.get_lnrpc_client(params);
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

      grpc_closed_channels = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.closedChannels(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      };  


      grpc_fee_report_request = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.FeeReportRequest(request, (err, response) => {
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
      
      grpc_wallet_balance = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.walletBalance(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      grpc_get_info = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.getInfo(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      grpc_list_invoices = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_client(macaroon)
        return new Promise((resolve, reject) => {
          client.listInvoices(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      //Faraday Services
      grpc_channel_insights = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.channelInsights(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      //Faraday Services
      grpc_close_report = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.closeReport(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      //Faraday Services
      grpc_exchange_rate = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.exchangeRate(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

       //Faraday Services
       grpc_node_audit = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.nodeAudit(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      //Faraday Services
      grpc_outlier_recommendations = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.outlierRecommendations(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

      //Faraday Services
      grpc_revenue_report = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.revenueReport(request, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });
      }; 

       //Faraday Services
       grpc_threshold_recommendations = async (params) => {
        const { request,macaroon} = params;
        const client = this.get_faraday_client(macaroon)
        return new Promise((resolve, reject) => {
          client.thresholdRecommendations(request, (err, response) => {
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
