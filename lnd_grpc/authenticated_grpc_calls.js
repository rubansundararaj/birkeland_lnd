const { InitializeAuthenticatedGrpcCommCredentials } = require("./initialize_authenticated_grpc_comm_credentials")

const GRPC_HOST = 'dragons-pearl.m.voltageapp.io:10009'
const MACAROON_PATH = '0201036C6E6402F801030A10D8DCB00976161A1C0B49D05DC39FDA651201301A160A0761646472657373120472656164120577726974651A130A04696E666F120472656164120577726974651A170A08696E766F69636573120472656164120577726974651A210A086D616361726F6F6E120867656E6572617465120472656164120577726974651A160A076D657373616765120472656164120577726974651A170A086F6666636861696E120472656164120577726974651A160A076F6E636861696E120472656164120577726974651A140A057065657273120472656164120577726974651A180A067369676E6572120867656E657261746512047265616400000620324C00031E19EBB2567D5A30339CF3250C6625C41F8B3E4FD74BA83A22302A0C';
const TLS_PATH = ''

class AuthenticatedGrpcCalls {

    get_client = (params) =>{
        let {grpc_host,macaroon_path,tls_path} = params;
        const initializeAuthenticatedGrpcCommCredentials =  new InitializeAuthenticatedGrpcCommCredentials(); 
        return initializeAuthenticatedGrpcCommCredentials.get_lnrpc_client(grpc_host,macaroon_path,tls_path);
    }

     grpc_forwarding_history = async (params) => {
        const { request} = params;
        const client = this.get_client(params)
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
}


module.exports = { AuthenticatedGrpcCalls };

// (async () => {
    
//     try {

//         const start_date = new Date('2023-04-19');
//         const start_timestamp = BigInt(start_date.getTime()) * 1000000n; // Convert milliseconds to nanoseconds
//         console.log(start_timestamp);

//         const end_date = new Date('2023-04-19');
//         const end_timestamp = BigInt(end_date.getTime()) * 1000000n; // Convert milliseconds to nanoseconds
//         console.log(end_timestamp);
//       let request = {
//         start_time: start_timestamp, // Example start time in uint64 format (2021-05-11 00:00:00 UTC)
//         end_time: end_timestamp, // Example end time in uint64 format (2021-05-12 00:00:00 UTC)
//        // index_offset: 1, // Example index offset in uint32 format
//         num_max_events: 5, // Example maximum number of events in uint32 format
//       //  peer_alias_lookup: true, // Example boolean value for peer alias lookup
//       };


//       const authenticatedGrpcCalls = new AuthenticatedGrpcCalls();
     
//       const response = await authenticatedGrpcCalls.grpc_forwarding_history({grpc_host:GRPC_HOST,macaroon_path:MACAROON_PATH,tls_path:TLS_PATH, request:request});
//       console.log("=============================")
//       console.log(response?.forwarding_events);
//       console.log("==========")
//     } catch (err) {
//       console.error("Error calling forwardingHistory:", err);
//     }
//   })();