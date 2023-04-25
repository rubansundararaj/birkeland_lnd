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
  getRouteToDestination,
  probeForRoute,
  isDestinationPayable,
  decodePaymentRequest,
  payViaRoutes,
  removePeer,
  getPendingChainBalance,
  getPendingPayments,
  signMessage,
  disconnectWatchtower,
  getConnectedWatchtowers,
  connectWatchtower,
  getTowerServerInfo,
  verifyMessage,
} = require("lightning");
const fs = require("fs");

class AuthenticatedLndOperations {
  get_authenticated_lnd = (macaroon) => {


    // {
    //   cert: tls_cert,
    //   macaroon: macaroon,
    //   socket: "127.0.0.1:10009",
    // }

    const { lnd } = authenticatedLndGrpc(macaroon);

    return lnd;
  };

  get_closed_channels = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getClosedChannels({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  close_a_channel = async (body) => {
    try {
      let { channel_id,macaroon } = body;
      let id = channel_id;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await closeChannel({ lnd, id });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_network_graph = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getNetworkGraph({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_network_centrality = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getNetworkCentrality({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_fee_rates = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getFeeRates({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_forwading_reputation = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getForwardingReputations({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_forwading_confidence = async (body) => {
    try {
      let { from, to, mtokens,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getForwardingConfidence({
        lnd: lnd,
        from: from,
        to: to,
        mtokens: mtokens,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_forwards = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getForwards({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_path_finding_settings = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPathfindingSettings({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  send_to_chain_address = async (body) => {
    try {
      let { address, tokens,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let params_object = {
        address: address,
        lnd,
        tokens: parseInt(tokens),
      };

      const resp = await sendToChainAddress(params_object);
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  pay_via_payment_details = async (body) => {
    try {
      let { request_id, destination, token,macaroon } = body;
      let request_id_object = { id: request_id };
      let lnd = this.get_authenticated_lnd(macaroon);
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
      let { request_id,macaroon } = body;
      let request_id_object = { id: request_id };
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await cancelHodlInvoice({ request_id_object, lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_identity = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getIdentity({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_payments = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getPayments({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_payment = async (body) => {
    try {
      let { id,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getPayment({ lnd: lnd, id: id });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_route_to_destination = async (body) => {
    try {
      let { destination, tokens, payment,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getRouteToDestination({
        payment : payment,
        lnd: lnd,
        destination: destination,
        tokens: tokens,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_backups = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const resp = await getBackups({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_backup = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const [channel] = (await getChannels({ lnd })).channels;
      const resp = await getBackup({
        lnd: lnd,
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
      let { request,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await pay({ lnd: lnd, request: request });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  add_peer = async (body) => {
    try {
      let { socket, public_key,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await addPeer({
        lnd: lnd,
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
      let { min_confirmations,macaroon } = params;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getUtxos({
        lnd: lnd,
        min_confirmations: min_confirmations,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  create_chain_address = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await createChainAddress({ lnd: lnd, format: "p2wpkh" });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  open_channel = async (body) => {
    try {
      let { local_tokens, partner_public_key,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await openChannel({
        local_tokens: local_tokens,
        partner_public_key: partner_public_key,
        lnd: lnd,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_chain_balance = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getChainBalance({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_channel = async (body) => {
    try {
      let { channel_id,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getChannel({ id: channel_id, lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_channel_balance = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getChannelBalance({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_channels = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getChannels({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_methods = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getMethods({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_node = async (body) => {
    try {
      let { public_key,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getNode({ lnd: lnd, public_key: public_key });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_network_info = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getNetworkInfo({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_peers = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPeers({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_wallet_version = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getWalletVersion({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_wallet_info = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getWalletInfo({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_pending_channels = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPendingChannels({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_public_key = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPublicKey({ family: 1, index: 1, lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  create_invoice = async (body) => {
    try {
      let { mtokens, description, description_hash,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await createInvoice({
        lnd: lnd,
        mtokens: mtokens,
        description: description,
        description_hash: description_hash,
      });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_invoices = async (body) => {
    try {
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getInvoices({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  get_invoice = async (body) => {
    try {
      let { invoice_id,macaroon } = body;
      let id = invoice_id;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getInvoice({ id, lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  is_destination_payable = async (body) => {
    try {
      let { request,macaroon } = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const { destination, tokens } = await decodePaymentRequest({
        lnd,
        request,
      });
      const is_payable = await isDestinationPayable({
        lnd,
        destination,
        tokens,
      });
      return { success: true, message: is_payable };
    } catch (err) {
      return { success: false, message: err };
    }
  };


  decode_payment_request = async (body) => {
    try {
      let { request,macaroon } = body;
      console.log("decode_payment_request");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await decodePaymentRequest({ lnd: lnd, request: request });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  probe_for_routes = async(body) =>{
    try{
      let {destination, tokens,macaroon} = body;
      console.log("probe_for_routes");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await probeForRoute({destination,lnd, tokens});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  pay_via_routes = async(body) =>{
    try{
      console.log("pay_via_routes under dev")
      let {destination, tokens,id,payment,macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      const {route} = await getRouteToDestination({destination:destination, lnd:lnd,payment:payment,tokens: tokens,total_mtokens : tokens*1000});
      const preimage = (await payViaRoutes({id:id, payment:payment, lnd:lnd, routes: [route]})).secret;
      return { success: true, message: preimage };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  pay_via_path = async(body) =>{
    try{
      console.log("pay_via_path")
      let {request,macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let {tokens,id,payment,destination} = await decodePaymentRequest({ lnd: lnd, request: request });
      const {route} = await getRouteToDestination({destination:destination, lnd:lnd,payment:payment,tokens: tokens,total_mtokens : tokens*1000});
      let path = {id:id, routes : [route]}
      const resp = await pay({lnd:lnd, path: path});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  remove_peer = async(body) =>{
    try{
      let {public_key,macaroon} = body;
      console.log("remove_peer");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await removePeer({lnd: lnd, public_key: public_key});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  get_pending_chain_balance = async(body) =>{
    try{
      console.log("get_pending_chain_balance");
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPendingChainBalance({lnd: lnd});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  get_pending_payments = async(body) =>{
    try{
      console.log("get_pending_payments");
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getPendingPayments({lnd: lnd});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }
  
  sign_message = async(body) =>{
    try{
      let {message,macaroon} = body;
      console.log("sign_message");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await signMessage({lnd: lnd, message: message});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  disconnect_watchtower = async(body) =>{
    try{
      let {public_key,macaroon} = body;
      console.log("disconnect_watchtower");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await disconnectWatchtower({lnd: lnd, public_key: public_key});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

  get_connected_watchtowers = async(body) =>{
    try{
      console.log("get_connected_watchtowers");
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getConnectedWatchtowers({lnd: lnd});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }
  connect_watch_tower = async(body) =>{
    try{
      let {public_key,socket,macaroon} = body;
      console.log("connect_watch_tower");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await connectWatchtower({lnd: lnd, public_key: public_key, socket: socket});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }
  get_tower_server_info = async(body) =>{
    try{
      console.log("get_tower_server_info");
      let {macaroon} = body;
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await getTowerServerInfo({lnd: lnd});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }
  verify_message = async(body)=>{
    try{
      let {message,signature,macaroon} = body;
      console.log("verify_message");
      let lnd = this.get_authenticated_lnd(macaroon);
      let resp = await verifyMessage({lnd: lnd, message: message, signature: signature});
      return { success: true, message: resp };
    }
    catch(err){
      return { success: false, message: err };
    }
  }

}

module.exports = { AuthenticatedLndOperations };
