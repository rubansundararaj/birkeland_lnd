const {
  authenticatedLndGrpc,
  subscribeToForwards,
  subscribeToBackups,
  subscribeToChainAddress,
  subscribeToChainSpend,
  subscribeToChannels,
  subscribeToForwardRequests,
  subscribeToGraph,
  subscribeToInvoices,
  subscribeToOpenRequests,
  subscribeToPastPayments,
  subscribeToPayments,
  subscribeToPeerMessages,
  subscribeToPeers,
  subscribeToTransactions,
  subscribeToWalletStatus,
  subscribeToBlocks,
} = require("lightning");
const fs = require("fs");
const birkeland_lnd_events_item = require("../mongoose_models/birkeland_lnd_event_model");
const {
  LND_SUBSCRIPTION_OPERATIONS,
  LND_SUBSCRIPTION_EVENT_TYPES,
} = require("../operations");

class SubscribedAuthenticatedLndOperations {

  get_unauthenticated_lnd = () =>{

    try{
      const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
        encoding: "utf8",
        flag: "r",
      });
  
      const { lnd } = unauthenticatedLndGrpc({
        cert: tls_cert,
        socket: "127.0.0.1:10009",
      });
  
      return lnd;
    }
    catch(err){
      return {}
    }
    
  }
  get_authenticated_lnd = () => {
    try {
      const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
        encoding: "utf8",
        flag: "r",
      });

      const macroon = fs.readFileSync("/etc/birkeland/btc_admin_macroon", {
        encoding: "utf8",
        flag: "r",
      });

      const { lnd } = authenticatedLndGrpc({
        cert: tls_cert,
        macaroon: macroon,
        socket: "127.0.0.1:10009",
      });
      return lnd;
    } catch (err) {
      console.log("Error in get_authenticated_lnd:", err);
      return {};
    }
  };

  update_local_db = async (event_object) => {
    birkeland_lnd_events_item
      .create(event_object)
      .then((resp) => {
        console.log("Created a record:", resp);
      })
      .catch((err) => {
        console.error("Error creating record:", err);
      });
  };

  listen_to_subscribe_to_backups = async () => {
    console.log("listen_to_subscribe_to_backups");
    let lnd = this.get_authenticated_lnd();
    const forwardEventEmitter = subscribeToBackups({ lnd });

    forwardEventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.BACKUP, (forward) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_BACKUPS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.BACKUP,
        response: forward,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_blocks = async () => {
    console.log("listen_to_subscribe_to_blocks");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToBlocks({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.BLOCK, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_BLCOKS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.BLOCK,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_channels = async () => {
    console.log("listen_to_subscribe_to_channels");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToChannels({ lnd });

    eventEmitter.on(
      LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_ACTIVE_CHANGED,
      (object) => {
        let event_object = {
          operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
          event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_ACTIVE_CHANGED,
          response: object,
        };

        this.update_local_db(event_object);
      }
    );

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENING, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENING,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_forward_requests = async () => {
    console.log("listen_to_subscribe_to_forward_requests");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToForwardRequests({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FORWARD_REQUEST, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARD_REQUESTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FORWARD_REQUEST,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_forwards = async () => {
    console.log("subscribe_to_forwards");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToForwards({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FORWARD, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARDS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FORWARD,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, (err) => {
      console.error("Error:", err);
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARDS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: err,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_graph = async () => {
    console.log("listen_to_subscribe_to_graph");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToGraph({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_UPDATED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_UPDATED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.NODE_UPDATED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.NODE_UPDATED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, (err) => {
      console.error("Error:", err);
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: err,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_invoices = async () => {
    console.log("listen_to_subscribe_to_invoices");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToInvoices({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.INVOICE_UPDATED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_INVOICES,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.INVOICE_UPDATED,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_open_requests = async () => {
    console.log("listen_to_subscribe_to_open_requests");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToOpenRequests({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_REQUEST, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_OPEN_REQUESTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_REQUEST,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_past_payments = async () => {
    console.log("listen_to_subscribe_to_past_payments");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPastPayments({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.PAYMENT, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAST_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.PAYMENT,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_payments = async () => {
    console.log("listen_to_subscribe_to_payments");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPayments({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CONFIRMED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CONFIRMED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FAILED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FAILED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.PAYING, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.PAYING,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_peer_messages = async () => {
    console.log("listen_to_subscribe_to_peer_messages");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPeerMessages({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.MESSAGE_RECEIVED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PEER_MESSAGES,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.MESSAGE_RECEIVED,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_peers = async () => {
    console.log("listen_to_subscribe_to_peers");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPeers({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CONNECTED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PEERS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CONNECTED,
        response: object,
      };

      this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_transactions = async () => {
    console.log("listen_to_subscribe_to_transactions");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToTransactions({ lnd });

    eventEmitter.on(
      LND_SUBSCRIPTION_EVENT_TYPES.CHAIN_TRANSACTION,
      (object) => {
        let event_object = {
          operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_TRANSACTIONS,
          event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHAIN_TRANSACTION,
          response: object,
        };

        this.update_local_db(event_object);
      }
    );
  };

  listen_to_subscribe_to_wallet_status = async () => {
    console.log("listen_to_subscribe_to_wallet_status");
    try{
    let lnd = this.get_unauthenticated_lnd();
    const eventEmitter = subscribeToWalletStatus({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ABSENT, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ABSENT,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ACTIVE, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ACTIVE,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.LOCKED, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.LOCKED,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.READY, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.READY,
        response: object,
      };

      this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.STARTING, (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.STARTING,
        response: object,
      };

      this.update_local_db(event_object);
    });
   }catch(e){
    console.log("Error subscribing to wallet status");
    console.log(e)
  }
  };
}

module.exports = { SubscribedAuthenticatedLndOperations };
