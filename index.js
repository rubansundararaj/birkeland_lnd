const {
  AuthenticatedLndOperations,
} = require("./lnd_operations/authenticated_lnd_operations");
const { LND_GRPC_OPERATION, LND_GRPC_UNAUTHENTICATED_OPERATION } = require("./operations");
const { SubscribedAuthenticatedLndOperations } = require("./lnd_events/subscribed_authenticated_lnd_operations");
const { UnAuthenticatedLndOperations } = require("./lnd_operations/unauthenticated_lnd_operations");
const { AuthenticatedGrpcCalls } = require("./lnd_grpc/authenticated_grpc_calls");
require("./config/db");


const authenticatedLndOperations = new AuthenticatedLndOperations();
const authenticatedGrpcCalls = new AuthenticatedGrpcCalls();

const PerformAuthenticatedOperation = async (params) => {
  let { operation } = params;

  switch (operation) {

    case LND_GRPC_OPERATION.GET_U_TXOS:
      let get_u_txos_resp = await authenticatedLndOperations.get_u_txos(params);
      return get_u_txos_resp;

    case LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS:
      return await authenticatedLndOperations.create_chain_address();

    case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
      return await authenticatedLndOperations.get_chain_balance();

    case LND_GRPC_OPERATION.GET_CHANNEL:
      return await authenticatedLndOperations.get_channel(params);

    case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
      let get_channel_balance_resp = await authenticatedLndOperations.get_channel_balance();
      return get_channel_balance_resp;

    case LND_GRPC_OPERATION.GET_CHANNELS:
      return await authenticatedLndOperations.get_channels();

    case LND_GRPC_OPERATION.GET_METHODS:
      return await authenticatedLndOperations.get_methods();

    case LND_GRPC_OPERATION.GET_NODE:
      return await authenticatedLndOperations.get_node(params);

    case LND_GRPC_OPERATION.GET_NETWORK_INFO:
      return await authenticatedLndOperations.get_network_info();

    case LND_GRPC_OPERATION.GET_PEERS:
      return await authenticatedLndOperations.get_peers();

    case LND_GRPC_OPERATION.GET_WALLET_VERSION:
      return await authenticatedLndOperations.get_wallet_version();

    case LND_GRPC_OPERATION.GET_WALLET_INFO:
      return await authenticatedLndOperations.get_wallet_info();

    case LND_GRPC_OPERATION.GET_PUBLIC_KEY:
      return await authenticatedLndOperations.get_public_key();

    case LND_GRPC_OPERATION.OPEN_CHANNEL:
      return await authenticatedLndOperations.open_channel(params);

    case LND_GRPC_OPERATION.ADD_PEER:
      return await authenticatedLndOperations.add_peer(params);

    case LND_GRPC_OPERATION.PAY:
      return await authenticatedLndOperations.make_payment(params);

    case LND_GRPC_OPERATION.GET_BACKUP:
      return await authenticatedLndOperations.get_backup();

    case LND_GRPC_OPERATION.GET_BACKUPS:
      return await authenticatedLndOperations.get_backups();

    case LND_GRPC_OPERATION.GET_PENDING_CHANNELS:
      return await authenticatedLndOperations.get_pending_channels();

    case LND_GRPC_OPERATION.CREATE_INVOICE:
      return await authenticatedLndOperations.create_invoice(params);

    case LND_GRPC_OPERATION.GET_INVOICES:
      return await authenticatedLndOperations.get_invoices();

    case LND_GRPC_OPERATION.GET_IDENTITY:
      return await authenticatedLndOperations.get_identity();

    case LND_GRPC_OPERATION.CANCEL_HODL_INVOICE:
      return await authenticatedLndOperations.cancel_hodl_invoices(params);

    case LND_GRPC_OPERATION.PAY_VIA_PAYMENT_DETAILS:
      return await authenticatedLndOperations.pay_via_payment_details(params);

    case LND_GRPC_OPERATION.GET_PAYMENTS:
      return await authenticatedLndOperations.get_payments();

    case LND_GRPC_OPERATION.CLOSE_A_CHANNEL:
      return authenticatedLndOperations.close_a_channel(params);

    case LND_GRPC_OPERATION.GET_CLOSED_CHANNELS:
      return await authenticatedLndOperations.get_closed_channels();

    case LND_GRPC_OPERATION.GET_INVOICE:
      return await authenticatedLndOperations.get_invoice(params);

    case LND_GRPC_OPERATION.SEND_TO_CHAIN_ADDRESS:
      return await authenticatedLndOperations.send_to_chain_address(params);

     ////// 
    case LND_GRPC_OPERATION.GET_NETWORK_GRAPH:
      return await authenticatedLndOperations.get_network_graph();
    
    case LND_GRPC_OPERATION.GET_NETWORK_CENTRALITY:
      return await authenticatedLndOperations.get_network_centrality();

    case LND_GRPC_OPERATION.GET_FEE_RATES:
      return await authenticatedLndOperations.get_fee_rates();

    case LND_GRPC_OPERATION.GET_FORWARDING_REPUTATIONS:
      return await authenticatedLndOperations.get_forwading_reputation();
 
    case LND_GRPC_OPERATION.GET_FORWARDING_CONFIDENCE:
      return await authenticatedLndOperations.get_forwading_confidence(params);
 
    case LND_GRPC_OPERATION.GET_FORWARDS:
      return await authenticatedLndOperations.get_forwards(params);

    case LND_GRPC_OPERATION.GET_FORWARDS_GRPC:
      return  await authenticatedGrpcCalls.grpc_forwarding_history(params)

    case LND_GRPC_OPERATION.GET_PATH_FINDING_SETTINGS:
      return await authenticatedLndOperations.get_path_finding_settings();

    case LND_GRPC_OPERATION.GET_PAYMENT:
      return await authenticatedLndOperations.get_payment(params);
  
    case LND_GRPC_OPERATION.GET_ROUTE_TO_DESTINATION:
      return await authenticatedLndOperations.get_route_to_destination(params);

    case LND_GRPC_OPERATION.IS_DESTINATION_PAYABLE:
      return await authenticatedLndOperations.is_destination_payable(params);
  
    case LND_GRPC_OPERATION.PROBE_FOR_ROUTE:
      return await authenticatedLndOperations.probe_for_routes(params);

    case LND_GRPC_OPERATION.PAY_VIA_ROUTES:
      return await authenticatedLndOperations.pay_via_routes(params);

    case LND_GRPC_OPERATION.DECODE_PAYMENT_REQUEST:
      return await authenticatedLndOperations.decode_payment_request(params);

    case LND_GRPC_OPERATION.PAY_VIA_PATH:
      return await authenticatedLndOperations.pay_via_path(params);

    case LND_GRPC_OPERATION.REMOVE_PEER:
      return await authenticatedLndOperations.remove_peer(params);

    case LND_GRPC_OPERATION.GET_PENDING_CHAIN_BALANCE:
      return await authenticatedLndOperations.get_pending_chain_balance();
    
    case LND_GRPC_OPERATION.GET_PENDING_PAYMENTS:
      return await authenticatedLndOperations.get_pending_payments();
    
    case LND_GRPC_OPERATION.SIGN_MESSAGE:
      return await authenticatedLndOperations.sign_message(params);
    
    case LND_GRPC_OPERATION.CONNECT_WATCH_TOWER:
      return await authenticatedLndOperations.connect_watch_tower(params);

    case LND_GRPC_OPERATION.DISCONNECT_WATCH_TOWER:
      return await authenticatedLndOperations.disconnect_watchtower(params);
    
      case LND_GRPC_OPERATION.GET_CONNECTED_WATCH_TOWERS:
        return await authenticatedLndOperations.get_connected_watchtowers();
      
    case LND_GRPC_OPERATION.GET_TOWER_SERVER_INFO:
      return await authenticatedLndOperations.get_tower_server_info();

    case LND_GRPC_OPERATION.VERIFY_MESSAGE:
      return await authenticatedLndOperations.verify_message(params);

    case LND_GRPC_OPERATION.GET_FAILED_PAYMENTS:
      return await authenticatedLndOperations.get_failed_payments();

    case LND_GRPC_OPERATION.GET_CHAIN_TRANSACTIONS:
      return await authenticatedLndOperations.get_chain_transactions();

    case LND_GRPC_OPERATION.GET_CHAIN_FEE_RATE:
      return await authenticatedLndOperations.get_chain_fee_rate();

    default:
      return { success: false, message: "Invalid operation" };
  }
};

const unAuthenticatedLndOperations = new UnAuthenticatedLndOperations();

const PerformUnAuthenticatedOperation = async (params) => {
  let { operation } = params;

  switch (operation) {
    case LND_GRPC_UNAUTHENTICATED_OPERATION.CREATE_WALLET:
      let create_wallet_resp = await unAuthenticatedLndOperations.create_wallet(params);
      return create_wallet_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.GET_WALLET_STATUS:
      let get_wallet_status_resp = await unAuthenticatedLndOperations.get_wallet_status();
      return get_wallet_status_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.UNLOCK_WALLET:
      let unlock_wallet_resp = await unAuthenticatedLndOperations.unlock_wallet(params);
      return unlock_wallet_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.CREATE_SEED:
      let create_seed_resp = await unAuthenticatedLndOperations.create_seed();
      return create_seed_resp;
    default:
      return { success: false, message: "Invalid operation" };

  }
}

const ListenToAllEvents = () => {

  const subscribedAuthenticatedLndOperations = new SubscribedAuthenticatedLndOperations();

  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_backups();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_blocks();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_channels();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_forward_requests();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_forwards();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_graph();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_invoices();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_open_requests();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_past_payments();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_payments();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_peer_messages();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_peers();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_transactions();
  // subscribedAuthenticatedLndOperations.listen_to_subscribe_to_wallet_status();


};

const AllEventListeners = () => {

  return new SubscribedAuthenticatedLndOperations();

}


module.exports={PerformAuthenticatedOperation,PerformUnAuthenticatedOperation,ListenToAllEvents,AllEventListeners}