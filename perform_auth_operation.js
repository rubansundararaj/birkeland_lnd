const {
  AuthenticatedLndOperations, get_channel_balance,
} = require("./authenticated_lnd_operations");
const { LND_GRPC_OPERATION } = require("./operations");

const authenticatedLndOperations = new AuthenticatedLndOperations();

const PerformAuthenticatedOperation = async (params) => {
  let { operation } = params;

  switch (operation) {

    case LND_GRPC_OPERATION.GET_U_TXOS:
      let get_u_txos_resp = await authenticatedLndOperations.get_u_txos();
      return get_u_txos_resp;

    case LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS:
      return await authenticatedLndOperations.create_chain_address();

    case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
      return await authenticatedLndOperations.get_chain_balance();

    case LND_GRPC_OPERATION.GET_CHANNEL:
      return await authenticatedLndOperations.get_channel(req.body);

    case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
      let get_channel_balance_resp = await authenticatedLndOperations.get_channel_balance();
      return get_channel_balance_resp;

    case LND_GRPC_OPERATION.GET_CHANNELS:
      return await authenticatedLndOperations.get_channels();

    case LND_GRPC_OPERATION.GET_METHODS:
      return await authenticatedLndOperations.get_methods();

    case LND_GRPC_OPERATION.GET_NODE:
      return await authenticatedLndOperations.get_node(req.body);

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
      return await authenticatedLndOperations.open_channel(req.body);

    case LND_GRPC_OPERATION.ADD_PEER:
      return await authenticatedLndOperations.add_peer(req.body);

    case LND_GRPC_OPERATION.PAY:
      return await authenticatedLndOperations.make_payment(req.body);

    case LND_GRPC_OPERATION.GET_BACKUP:
      return await authenticatedLndOperations.get_backup();

    case LND_GRPC_OPERATION.GET_BACKUPS:
      return await authenticatedLndOperations.get_backups();

    case LND_GRPC_OPERATION.GET_PENDING_CHANNELS:
      return await authenticatedLndOperations.get_pending_channels();

    case LND_GRPC_OPERATION.CREATE_INVOICE:
      return await authenticatedLndOperations.create_invoice(req.body);

    case LND_GRPC_OPERATION.GET_INVOICES:
      return await authenticatedLndOperations.get_invoices();

    case LND_GRPC_OPERATION.GET_IDENTITY:
      return await authenticatedLndOperations.get_identity();

    case LND_GRPC_OPERATION.CANCEL_HODL_INVOICE:
      return await authenticatedLndOperations.cancel_hodl_invoices(req.body);

    case LND_GRPC_OPERATION.PAY_VIA_PAYMENT_DETAILS:
      return await authenticatedLndOperations.pay_via_payment_details(req.body);

    case LND_GRPC_OPERATION.GET_PAYMENTS:
      return await authenticatedLndOperations.get_payments();

    case LND_GRPC_OPERATION.CLOSE_A_CHANNEL:
      return authenticatedLndOperations.close_a_channel(req.body);

    case LND_GRPC_OPERATION.GET_CLOSED_CHANNELS:
      return await authenticatedLndOperations.get_closed_channels();

    case LND_GRPC_OPERATION.GET_INVOICE:
      return await authenticatedLndOperations.get_invoice(req.body);

    default:
      return { success: false, message: "Invalid operation" };
  }
};


// (async () => {
//   try {
//       console.log("here we test it");
//       const ind_resp = await get_channel_balance();
//       console.log(ind_resp)
//       const text = await PerformAuthenticatedOperation({operation :LND_GRPC_OPERATION.GET_CHANNEL_BALANCE });
      
//       console.log(text);
//   } catch (e) {
//       // Deal with the fact the chain failed
//   }
//   // `text` is not available here
// })();

module.exports={PerformAuthenticatedOperation}