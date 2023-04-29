const {
  AuthenticatedLndOperations,
} = require("./authenticated_lnd_operations");
const {
  AuthenticatedGrpcCalls,
} = require("./lnd_grpc/authenticated_grpc_calls");
const {
  InitializeAuthenticatedGrpcCommCredentials,
} = require("./lnd_grpc/initialize_authenticated_grpc_comm_credentials");
const {
  LND_GRPC_OPERATION,
  LND_GRPC_UNAUTHENTICATED_OPERATION,
} = require("./operations");
const {
  UnAuthenticatedLndOperations,
} = require("./unauthenticated_lnd_operations");

const authenticatedLndOperations = new AuthenticatedLndOperations();
const authenticatedGrpcCalls = new AuthenticatedGrpcCalls();
const PerformAuthenticatedOperation = async (params) => {
  let { operation } = params;

  switch (operation) {
    case LND_GRPC_OPERATION.GET_U_TXOS:
      let get_u_txos_resp = await authenticatedLndOperations.get_u_txos(params);
      return get_u_txos_resp;

    case LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS:
      return await authenticatedLndOperations.create_chain_address(params);

    case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
      return await authenticatedLndOperations.get_chain_balance(params);

    case LND_GRPC_OPERATION.GET_CHANNEL:
      return await authenticatedLndOperations.get_channel(params);

    case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
      let get_channel_balance_resp =
        await authenticatedLndOperations.get_channel_balance(params);
      return get_channel_balance_resp;

    case LND_GRPC_OPERATION.GET_CHANNELS:
      return await authenticatedLndOperations.get_channels(params);

    case LND_GRPC_OPERATION.GET_METHODS:
      return await authenticatedLndOperations.get_methods(params);

    case LND_GRPC_OPERATION.GET_NODE:
      return await authenticatedLndOperations.get_node(params);

    case LND_GRPC_OPERATION.GET_NETWORK_INFO:
      return await authenticatedLndOperations.get_network_info(params);

    case LND_GRPC_OPERATION.GET_PEERS:
      return await authenticatedLndOperations.get_peers(params);

    case LND_GRPC_OPERATION.GET_WALLET_VERSION:
      return await authenticatedLndOperations.get_wallet_version(params);

    case LND_GRPC_OPERATION.GET_WALLET_INFO:
      return await authenticatedLndOperations.get_wallet_info(params);

    case LND_GRPC_OPERATION.GET_PUBLIC_KEY:
      return await authenticatedLndOperations.get_public_key(params);

    case LND_GRPC_OPERATION.OPEN_CHANNEL:
      return await authenticatedLndOperations.open_channel(params);

    case LND_GRPC_OPERATION.ADD_PEER:
      return await authenticatedLndOperations.add_peer(params);

    case LND_GRPC_OPERATION.PAY:
      return await authenticatedLndOperations.make_payment(params);

    case LND_GRPC_OPERATION.GET_BACKUP:
      return await authenticatedLndOperations.get_backup(params);

    case LND_GRPC_OPERATION.GET_BACKUPS:
      return await authenticatedLndOperations.get_backups(params);

    case LND_GRPC_OPERATION.GET_PENDING_CHANNELS:
      return await authenticatedLndOperations.get_pending_channels(params);

    case LND_GRPC_OPERATION.CREATE_INVOICE:
      return await authenticatedLndOperations.create_invoice(params);

    case LND_GRPC_OPERATION.GET_INVOICES:
      return await authenticatedLndOperations.get_invoices(params);

    case LND_GRPC_OPERATION.GET_IDENTITY:
      return await authenticatedLndOperations.get_identity(params);

    case LND_GRPC_OPERATION.CANCEL_HODL_INVOICE:
      return await authenticatedLndOperations.cancel_hodl_invoices(params);

    case LND_GRPC_OPERATION.PAY_VIA_PAYMENT_DETAILS:
      return await authenticatedLndOperations.pay_via_payment_details(params);

    case LND_GRPC_OPERATION.GET_PAYMENTS:
      return await authenticatedLndOperations.get_payments(params);

    case LND_GRPC_OPERATION.CLOSE_A_CHANNEL:
      return authenticatedLndOperations.close_a_channel(params);

    case LND_GRPC_OPERATION.GET_CLOSED_CHANNELS:
      return await authenticatedLndOperations.get_closed_channels(params);

    case LND_GRPC_OPERATION.GET_INVOICE:
      return await authenticatedLndOperations.get_invoice(params);

    case LND_GRPC_OPERATION.SEND_TO_CHAIN_ADDRESS:
      return await authenticatedLndOperations.send_to_chain_address(params);

    //////
    case LND_GRPC_OPERATION.GET_NETWORK_GRAPH:
      return await authenticatedLndOperations.get_network_graph(params);

    case LND_GRPC_OPERATION.GET_NETWORK_CENTRALITY:
      return await authenticatedLndOperations.get_network_centrality(params);

    case LND_GRPC_OPERATION.GET_FEE_RATES:
      return await authenticatedLndOperations.get_fee_rates(params);

    case LND_GRPC_OPERATION.GET_FORWARDING_REPUTATIONS:
      return await authenticatedLndOperations.get_forwading_reputation(params);

    case LND_GRPC_OPERATION.GET_FORWARDING_CONFIDENCE:
      return await authenticatedLndOperations.get_forwading_confidence(params);

    case LND_GRPC_OPERATION.GET_FORWARDS:
      return await authenticatedLndOperations.get_forwards(params);

    case LND_GRPC_OPERATION.GET_PATH_FINDING_SETTINGS:
      return await authenticatedLndOperations.get_path_finding_settings(params);

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
      return await authenticatedLndOperations.get_pending_chain_balance(params);

    case LND_GRPC_OPERATION.GET_PENDING_PAYMENTS:
      return await authenticatedLndOperations.get_pending_payments(params);

    case LND_GRPC_OPERATION.SIGN_MESSAGE:
      return await authenticatedLndOperations.sign_message(params);

    case LND_GRPC_OPERATION.CONNECT_WATCH_TOWER:
      return await authenticatedLndOperations.connect_watch_tower(params);

    case LND_GRPC_OPERATION.DISCONNECT_WATCH_TOWER:
      return await authenticatedLndOperations.disconnect_watchtower(params);

    case LND_GRPC_OPERATION.GET_CONNECTED_WATCH_TOWERS:
      return await authenticatedLndOperations.get_connected_watchtowers(params);

    case LND_GRPC_OPERATION.GET_TOWER_SERVER_INFO:
      return await authenticatedLndOperations.get_tower_server_info(params);

    case LND_GRPC_OPERATION.VERIFY_MESSAGE:
      return await authenticatedLndOperations.verify_message(params);

    case LND_GRPC_OPERATION.GET_FORWARDS_GRPC:
      return await authenticatedGrpcCalls.grpc_forwarding_history(params);

    case LND_GRPC_OPERATION.GET_CHANNELS_GRPC:
      return await authenticatedGrpcCalls.grpc_get_channels(params);

    case LND_GRPC_OPERATION.GET_CHANNEL_GRPC:
      return await authenticatedGrpcCalls.grpc_get_chan_info(params);

    case LND_GRPC_OPERATION.WALLET_BALANCE_GPRC:
      return await authenticatedGrpcCalls.grpc_wallet_balance(params);

    case LND_GRPC_OPERATION.GET_INFO_GRPC:
      return await authenticatedGrpcCalls.grpc_get_info(params);

    case LND_GRPC_OPERATION.CHANNEL_INSIGHTS_GRPC:
      return await authenticatedGrpcCalls.grpc_channel_insights(params);

    case LND_GRPC_OPERATION.CLOSE_REPORTS_GRPC:
      return await authenticatedGrpcCalls.grpc_close_report(params);

    case LND_GRPC_OPERATION.EXCHANGE_RATE_GRPC:
      return await authenticatedGrpcCalls.grpc_exchange_rate(params);

    case LND_GRPC_OPERATION.NODE_AUDIT_GRPC:
      return await authenticatedGrpcCalls.grpc_node_audit(params);

    case LND_GRPC_OPERATION.OUTLIER_RECOMMENDATIONS_GRPC:
      return await authenticatedGrpcCalls.grpc_outlier_recommendations(params);

    case LND_GRPC_OPERATION.REVENUE_REPORT_GRPC:
      return await authenticatedGrpcCalls.grpc_revenue_report(params);

    case LND_GRPC_OPERATION.THRESHOLD_RECOMMENDATIONS_GRPC:
      return await authenticatedGrpcCalls.grpc_threshold_recommendations(
        params
      );
    
    case LND_GRPC_OPERATION.CLOSED_CHANNELS_GRPC:
      return await authenticatedGrpcCalls.grpc_closed_channels(
        params
      );

    case LND_GRPC_OPERATION.LIST_INVOICES_GRPC:
      return await authenticatedGrpcCalls.grpc_list_invoices(params);

      case LND_GRPC_OPERATION.FEE_REPORT_REQUEST_GRPC:
        return await authenticatedGrpcCalls.grpc_fee_report_request(params);

    default:
      return { success: false, message: "Invalid operation" };
  }
};

const unAuthenticatedLndOperations = new UnAuthenticatedLndOperations();

const PerformUnAuthenticatedOperation = async (params) => {
  let { operation } = params;

  switch (operation) {
    case LND_GRPC_UNAUTHENTICATED_OPERATION.CREATE_WALLET:
      let create_wallet_resp = await unAuthenticatedLndOperations.create_wallet(
        params
      );
      return create_wallet_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.GET_WALLET_STATUS:
      let get_wallet_status_resp =
        await unAuthenticatedLndOperations.get_wallet_status();
      return get_wallet_status_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.UNLOCK_WALLET:
      let unlock_wallet_resp = await unAuthenticatedLndOperations.unlock_wallet(
        params
      );
      return unlock_wallet_resp;
    case LND_GRPC_UNAUTHENTICATED_OPERATION.CREATE_SEED:
      let create_seed_resp = await unAuthenticatedLndOperations.create_seed();
      return create_seed_resp;
    default:
      return { success: false, message: "Invalid operation" };
  }
};

module.exports = {
  PerformAuthenticatedOperation,
  PerformUnAuthenticatedOperation,
};
