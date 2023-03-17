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
  sendToChainAddress,
  getNetworkGraph,
  getNetworkCentrality,
  getFeeRates,
  getForwardingReputations,
  getForwardingConfidence,
  getForwards,
  getPathfindingSettings,
  getPayment,
  getRouteToDestination
} = require("lightning");
const fs = require("fs");


class AuthenticatedLndOperations {


  get_authenticated_lnd = () =>{

    const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
      encoding: "utf8",
      flag: "r",
    });
    
    const macroon = fs.readFileSync(
      "/etc/birkeland/btc_admin_macroon",
      {
        encoding: "utf8",
        flag: "r",
      }
    );

    const {lnd} = authenticatedLndGrpc({
      cert: tls_cert,
      macaroon: macroon,
      socket: "127.0.0.1:10009",
    });

    return lnd;
  }


  get_closed_channels = async () => {
    try {
      console.log("get_closed_channels");
      let lnd = this.get_authenticated_lnd();
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
      let lnd = this.get_authenticated_lnd();
      const resp = await closeChannel({lnd, id });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_network_graph = async() =>{
    try {
      console.log("get_network_graph");
      let lnd = this.get_authenticated_lnd();
      let resp = await getNetworkGraph({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_network_centrality = async() =>{
    try {
      console.log("get_network_centrality");
      let lnd = this.get_authenticated_lnd();
      let resp = await getNetworkCentrality({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_fee_rates = async() =>{
    try {
      console.log("get_fee_rates");
      let lnd = this.get_authenticated_lnd();
      let resp = await getFeeRates({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_forwading_reputation = async() =>{
    try {
      console.log("get_forwading_reputation");
      let lnd = this.get_authenticated_lnd();
      let resp = await getForwardingReputations({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_forwading_confidence = async(body) =>{
    try {
      let { from,to,mtokens } = body;
      console.log("get_forwading_confidence");
      let lnd = this.get_authenticated_lnd();
      let resp = await getForwardingConfidence({ lnd:lnd, from:from,to:to,mtokens:mtokens});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_forwards = async () =>{
    try {
      console.log("get_forwards");
      let lnd = this.get_authenticated_lnd();
      let resp = await getForwards({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  get_path_finding_settings = async () =>{
    try {
      console.log("get_path_finding_settings");
      let lnd = this.get_authenticated_lnd();
      let resp = await getPathfindingSettings({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }
  

  send_to_chain_address = async (body) => {
    try {
      console.log("send_to_chain_address");
      let { address, tokens } = body;
      let lnd = this.get_authenticated_lnd();
      let params_object = {
        "address" : address,
        lnd,
        "tokens" : parseInt(tokens)
      };

      const resp = await sendToChainAddress(params_object);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  pay_via_payment_details = async (body) => {
    try {
      console.log("pay_via_payment_details");
      let { request_id, destination, token } = body;
      let request_id_object = { id: request_id };
      let lnd = this.get_authenticated_lnd();
      const resp = await payViaPaymentDetails({
        request_id_object,
        destination,
        token,
        lnd,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  cancel_hodl_invoices = async (body) => {
    try {
      console.log("cancel_hodl_invoices");
      let { request_id } = body;
      let request_id_object = { id: request_id };
      let lnd = this.get_authenticated_lnd();
      const resp = await cancelHodlInvoice({ request_id_object, lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_identity = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
      const resp = await getIdentity({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_payments = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
      const resp = await getPayments({lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_payment = async (body) => {
    try {
      let id= {body}
      let lnd = this.get_authenticated_lnd();
      const resp = await getPayment({lnd :lnd,id:id });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_route_to_destination = async(body) =>{
    try {
      let {destination,tokens}= {body};
      let lnd = this.get_authenticated_lnd();
      const resp = await getRouteToDestination({lnd :lnd,destination:destination,tokens:tokens });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }
  
  get_backups = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
      const resp = await getBackups({lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_backup = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
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
      let lnd = this.get_authenticated_lnd();
      let resp = await pay({ lnd:lnd, request: request });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  add_peer = async (body) => {
    try {
      console.log("add_peer");
      let { socket, public_key } = body;
      let lnd = this.get_authenticated_lnd();
      let resp = await addPeer({
        lnd:lnd,
        public_key: public_key,
        socket: socket,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_u_txos = async (params) => {
    try {
      let {min_confirmations} = params;
      console.log("get_u_txos");
      let lnd = this.get_authenticated_lnd();
      let resp = await getUtxos({ lnd:lnd,min_confirmations :min_confirmations });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  create_chain_address = async () => {
    try {
      console.log("create_chain_address");
      let lnd = this.get_authenticated_lnd();
      let resp = await createChainAddress({ lnd:lnd, format: "p2wpkh" });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  open_channel = async (body) => {
    try {
      let { local_tokens, partner_public_key } = body;
      console.log("open_channel");
      let lnd = this.get_authenticated_lnd();
      let resp = await openChannel({
        local_tokens: local_tokens,
        partner_public_key: partner_public_key,
        lnd:lnd,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_chain_balance = async () => {
    try {
      console.log("get_chain_balance");
      let lnd = this.get_authenticated_lnd();
      let resp = await getChainBalance({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_channel = async (body) => {
    try {
      console.log("get_channel");
      let { channel_id } = body;
      let lnd = this.get_authenticated_lnd();
      let resp = await getChannel({ id: channel_id, lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_channel_balance = async () => {
    try {
      console.log("get_channel_balance");
      let lnd = this.get_authenticated_lnd();
      let resp = await getChannelBalance({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_channels = async () => {
    try {
      console.log("get_channels");
      let lnd = this.get_authenticated_lnd();
      let resp = await getChannels({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_methods = async () => {
    try {
      console.log("get_methods");
      let lnd = this.get_authenticated_lnd();
      let resp = await getMethods({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_node = async (body) => {
    try {
      let { public_key } = body;
      console.log("get_node");
      let lnd = this.get_authenticated_lnd();
      let resp = await getNode({ lnd:lnd, public_key: public_key });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
 get_network_info = async () => {
    try {
      console.log("get_network_info");
      let lnd = this.get_authenticated_lnd();
      let resp = await getNetworkInfo({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_peers = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
      let resp = await getPeers({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_wallet_version = async () => {
    try {
      let lnd = this.get_authenticated_lnd();
      let resp = await getWalletVersion({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_wallet_info = async () => {
    try {
      console.log("get_wallet_info");
      let lnd = this.get_authenticated_lnd();
      let resp = await getWalletInfo({ lnd:lnd});
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_pending_channels = async () => {
    try {
      console.log("get_pending_channels");
      let lnd = this.get_authenticated_lnd();
      let resp = await getPendingChannels({ lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_public_key = async () => {
    try {
      console.log("get_public_key");
      let lnd = this.get_authenticated_lnd();
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
      let lnd = this.get_authenticated_lnd();
      let resp = await createInvoice({ lnd:lnd, mtokens: mtokens,description:description,description_hash:description_hash });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
  
  get_invoices = async () => {
    try {
      console.log("get_invoices");
      let lnd = this.get_authenticated_lnd();
      let resp = await getInvoices({ lnd:lnd });
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
      let lnd = this.get_authenticated_lnd();
      let resp = await getInvoice({ id, lnd:lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  
}
}


module.exports={AuthenticatedLndOperations}
