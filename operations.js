

const LND_GRPC_OPERATION = {
    GET_CHAIN_BALANCE: "get_chain_balance", //1
    GET_CHANNEL: "get_channel", //2
    GET_CHANNEL_BALANCE: "get_channel_balance", //3
    GET_CHANNELS: "get_channels", //4
    GET_METHODS: "get_methods", //5
    GET_NODE: "get_node", //6
    GET_NETWORK_INFO: "get_network_info", //7
    GET_PEERS: "get_peers", //8
    GET_WALLET_VERSION: "get_wallet_version", //9
    GET_WALLET_INFO: "get_wallet_info", //10
    GET_PUBLIC_KEY: "get_public_key", //11
    OPEN_CHANNEL: "open_channel", //12
    GET_U_TXOS: "get_u_txos", //13
    CREATE_CHAIN_ADDRESS: "create_chain_address", //14
    ADD_PEER: "add_peer", //15
    PAY: "pay", //16
    GET_BACKUP: "get_backup", //17
    GET_BACKUPS: "get_backups", //18
    GET_PENDING_CHANNELS: "get_pending_channels", //19
    CREATE_INVOICE: "create_invoice", //20
    GET_INVOICES: "get_invoices", //21
    GET_IDENTITY: "get_identity", //22
    CANCEL_HODL_INVOICE: "cancel_hodl_invoices", //23
    PAY_VIA_PAYMENT_DETAILS: "pay_via_payment_details", //24
    GET_PAYMENTS: "get_payments", //25
    CLOSE_A_CHANNEL: "close_a_channel", //26
    GET_CLOSED_CHANNELS: "get_closed_channels", //27
    GET_INVOICE: "get_invoice", //28
    SEND_TO_CHAIN_ADDRESS : "send_to_chain_address", //29
    GET_NETWORK_GRAPH : "get_network_graph", //30
    GET_NETWORK_CENTRALITY :"get_network_centrality",//31
    GET_FEE_RATES : "get_fee_rates",//32
    GET_FORWARDING_REPUTATIONS:"get_forwarding_reputations",//33
    GET_FORWARDING_CONFIDENCE:"get_forwarding_confidence",//34
    GET_FORWARDS : "get_forwards",//35
    GET_FORWARDS_GRPC : "get_forwards_grpc",//36
    
    GET_PATH_FINDING_SETTINGS :"get_path_finding_settings",//36
    GET_PAYMENT : "get_payment",//37
    GET_ROUTE_TO_DESTINATION : "get_route_to_destination",//38
    IS_DESTINATION_PAYABLE : "is_destination_payable",//39
    PROBE_FOR_ROUTE : "probe_for_route",//40
    PAY_VIA_ROUTES : "pay_via_routes", //41,
    DECODE_PAYMENT_REQUEST : "decode_payment_request", //42
    PAY_VIA_PATH : "pay_via_path", //43
    REMOVE_PEER : "remove_peer", //44
    GET_PENDING_CHAIN_BALANCE : "get_pending_chain_balance", //45
    GET_PENDING_PAYMENTS : "get_pending_payments", //46
    SIGN_MESSAGE: "sign_message", //47
    CONNECT_WATCH_TOWER : "connect_watch_tower", //48
    DISCONNECT_WATCH_TOWER : "disconnect_watch_tower", //49
    GET_CONNECTED_WATCH_TOWERS : "get_connected_watch_towers", //50
    GET_TOWER_SERVER_INFO : "get_tower_server_info", //51
    VERIFY_MESSAGE: "verify_message", //52
    GET_FAILED_PAYMENTS : "get_failed_payments", //53

    GET_CHAIN_TRANSACTIONS: "get_chain_transactions", //54
    GET_CHAIN_FEE_RATE : "get_chain_fee_rate", //56
  };

  const LND_GRPC_UNAUTHENTICATED_OPERATION = {
    GET_WALLET_STATUS : "get_wallet_status", //
    UNLOCK_WALLET : "un_lock_wallet",
    CREATE_WALLET : "create_wallet",
    CREATE_SEED : "create_seed"
}

const LND_SUBSCRIPTION_OPERATIONS = {
    SUBSCRIBE_TO_BACKUPS : "subscribe_to_backups",
    SUBSCRIBE_TO_BLCOKS : "subscribe_to_blocks",

    SUBSCRIBE_TO_CHAIN_ADDRESSES : "subscribe_to_chain_addresses",
    SUBSCRIBE_TO_CHAIN_SPEND : "subscribe_to_chain_spend",
    SUBSCRIBE_TO_CHANNELS : "subscribe_to_channels",

    SUBSCRIBE_TO_FORWARD_REQUESTS : "subscribe_to_forward_requests",
    SUBSCRIBE_TO_FORWARDS : "subscribe_to_forwards",

    SUBSCRIBE_TO_GRAPH : "subscribe_to_graph",
    
    SUBSCRIBE_TO_INVOICE : "subscribe_to_invoice",
    SUBSCRIBE_TO_INVOICES : "subscribe_to_invoices",
    
    SUBSCRIBE_TO_OPEN_REQUESTS : "subscribe_to_open_requests",
    
    SUBSCRIBE_TO_PAST_PAYMENT : "subscribe_to_past_payment",
    SUBSCRIBE_TO_PAST_PAYMENTS : "subscribe_to_past_payments",
    SUBSCRIBE_TO_PAY_VIA_DETAILS : "subscribe_to_past_details",
    SUBSCRIBE_TO_PAY_VIA_REQUEST : "subscribe_to_pay_via_request",
    SUBSCRIBE_TO_PAY_VIA_ROUTES : "subscribe_to_pay_via_routes",
    SUBSCRIBE_TO_PAYMENTS : "subscribe_to_payments",

    SUBSCRIBE_TO_PEER_MESSAGES : "subscribe_to_peer_messages",
    SUBSCRIBE_TO_PEERS : "subscribe_to_peers",

    SUBSCRIBE_TO_PROBE : "subscribe_to_probe",
    SUBSCRIBE_TO_PROBE_FOR_ROUTES : "subscribe_to_probe_for_routes",

    SUBSCRIBE_TO_RPC_REQUESTS : "subscribe_to_rpc_requests",
    SUBSCRIBE_TO_TRANSACTIONS : "subscribe_to_transactions",
    SUBSCRIBE_TO_WALLET_STATUS : "subscribe_to_wallet_status"
}

const LND_SUBSCRIPTION_EVENT_TYPES = {
  FORWARD : "forward",
  ERROR : "error",
  BACKUP : "backup",
  BLOCK : "block",
  CONFIRMATION : "confirmation",
  CHANNEL_ACTIVE_CHANGED : "channel_active_changed",
  CHANNEL_CLOSED : "channel_closed",
  CHANNEL_OPENED : "channel_opened",
  CHANNEL_OPENING : "channel_opening",
  FORWARD_REQUEST : "forward_request",
  CHANNEL_UPDATED : "channel_updated",
  NODE_UPDATED : "node_updated",
  INVOICE_UPDATED : "invoice_updated",
  CHANNEL_REQUEST : "channel_request",
  PAYMENT : "payment",
  CONFIRMED : "confirmed",
  FAILED : "failed",
  PAYING : "paying",
  MESSAGE_RECEIVED : "message_received",
  CONNECTED : "connected",
  CHAIN_TRANSACTION : "chain_transaction",
  ABSENT : "absent",
  ACTIVE : "active",
  LOCKED : "locked",
  READY : "ready",
  STARTING : "starting",

}

  module.exports = {LND_GRPC_OPERATION,LND_GRPC_UNAUTHENTICATED_OPERATION,LND_SUBSCRIPTION_OPERATIONS,LND_SUBSCRIPTION_EVENT_TYPES}