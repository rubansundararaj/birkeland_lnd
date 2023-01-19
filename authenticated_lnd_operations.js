const {
  getWalletInfo,
  authenticatedLndGrpc,
  getChainBalance,
  getChannel,
  getChannelBalance,
  getChannels,
  getMethods,
  getNode,
  getNetworkInfo,
  getPeers,
  getWalletVersion,
  getPublicKey,
  openChannel,
  createChainAddress,
  getUtxos,
  addPeer,
  pay,
  getBackup,
  getBackups,
  getPendingChannels,
  createInvoice,
  getInvoices,
  getIdentity,
  cancelHodlInvoice,
  payViaPaymentDetails,
  getPayments,
  closeChannel,
  getClosedChannels,
  getInvoice,
} = require("lightning");
const { tls_cert, macroon } = require("./read_macroon_and_tslcert");

const {lnd} = authenticatedLndGrpc({
  cert: tls_cert,
  macaroon: macroon,
  socket: "127.0.0.1:10009",
});

class AuthenticatedLndOperations {

  get_closed_channels = async () => {
    try {
      console.log("get_closed_channels");
      const resp = await getClosedChannels({lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
   close_a_channel = async (body) => {
    try {
      console.log("close_a_channel");
      let { channel_id } = body;
      let id = channel_id;
      const resp = await closeChannel({lnd, id });
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  pay_via_payment_details = async (body) => {
    try {
      console.log("pay_via_payment_details");
      let { request_id, destination, token } = body;
      let request_id_object = { id: request_id };
      const resp = await payViaPaymentDetails({
        request_id_object,
        destination,
        token,
        lnd,
      });
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  cancel_hodl_invoices = async (body) => {
    try {
      console.log("cancel_hodl_invoices");
      let { request_id } = body;
      let request_id_object = { id: request_id };
      const resp = await cancelHodlInvoice({ request_id_object, lnd });
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  get_identity = async () => {
    try {
      const resp = await getIdentity({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_payments = async () => {
    try {
      const resp = await getPayments({lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_backups = async () => {
    try {
      const resp = await getBackups({lnd });
  
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_backup = async () => {
    try {
      const [channel] = (await getChannels({lnd })).channels;
      const resp = await getBackup({
        lnd:lnd,
        transaction_id: channel.transaction_id,
        transaction_vout: channel.transaction_vout,
      });
  
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  make_payment = async (body) => {
    try {
      console.log("make_payment");
      let { request } = body;
      console.log(request);
      let resp = await pay({ lnd:lnd, request: request });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  add_peer = async (body) => {
    try {
      console.log("add_peer");
      let { socket, public_key } = body;
      console.log(body);
      let resp = await addPeer({
        lnd:lnd,
        public_key: public_key,
        socket: socket,
      });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  get_u_txos = async (params) => {
    try {
      let {min_confirmations} = params;
      console.log("get_u_txos");
      let resp = await getUtxos({ lnd:lnd,min_confirmations :min_confirmations });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  create_chain_address = async () => {
    try {
      console.log("create_chain_address");
      let resp = await createChainAddress({ lnd:lnd, format: "p2wpkh" });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  open_channel = async (body) => {
    try {
      let { local_tokens, partner_public_key } = body;
      console.log("open_channel");
      let resp = await openChannel({
        local_tokens: local_tokens,
        partner_public_key: partner_public_key,
        lnd:lnd,
      });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_chain_balance = async () => {
    try {
      console.log("get_chain_balance");
      let resp = await getChainBalance({ lnd:lnd});
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_channel = async (body) => {
    try {
      console.log("get_channel");
      let { channel_id } = body;
      let resp = await getChannel({ id: channel_id, lnd:lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_channel_balance = async () => {
    try {
      console.log("get_channel_balance");
      let resp = await getChannelBalance({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      console.log(err)
      return { success: false, message: err };
    }
  };

  get_channels = async () => {
    try {
      console.log("get_channels");
      let resp = await getChannels({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_methods = async () => {
    try {
      console.log("get_methods");
      let resp = await getMethods({ lnd:lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_node = async (body) => {
    try {
      let { public_key } = body;
      console.log("get_node");
      let resp = await getNode({ lnd:lnd, public_key: public_key });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
 get_network_info = async () => {
    try {
      console.log("get_network_info");
      let resp = await getNetworkInfo({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_peers = async () => {
    try {
      let resp = await getPeers({ lnd:lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  };
  
  get_wallet_version = async () => {
    try {
      let resp = await getWalletVersion({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_wallet_info = async () => {
    try {
      console.log("get_wallet_info");
      let resp = await getWalletInfo({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_pending_channels = async () => {
    try {
      console.log("get_pending_channels");
      let resp = await getPendingChannels({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_public_key = async () => {
    try {
      console.log("get_public_key");
      let resp = await getPublicKey({ family: 1, index: 1, lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  create_invoice = async (body) => {
    try {
      let { mtokens,description,description_hash } = body;
      console.log("create_invoice");
      console.log(mtokens);
      let resp = await createInvoice({ lnd:lnd, mtokens: mtokens,description:description,description_hash:description_hash });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_invoices = async () => {
    try {
      console.log("get_invoices");
      let resp = await getInvoices({ lnd:lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_invoice = async (body) => {
    try {
      let { invoice_id } = body;
      let id = invoice_id;
      console.log("get_invoice");
      let resp = await getInvoice({ id, lnd:lnd });
      console.log(resp);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  
}
}


module.exports={AuthenticatedLndOperations}
