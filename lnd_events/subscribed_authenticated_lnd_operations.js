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

    forwardEventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.BACKUP, async (forward) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_BACKUPS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.BACKUP,
        response: forward,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_blocks = async () => {
    console.log("listen_to_subscribe_to_blocks");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToBlocks({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.BLOCK, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_BLCOKS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.BLOCK,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_channels = async () => {
    console.log("listen_to_subscribe_to_channels");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToChannels({ lnd });

    eventEmitter.on(
      LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_ACTIVE_CHANGED,
      async (object) => {
        let event_object = {
          operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
          event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_ACTIVE_CHANGED,
          response: object,
        };

        await this.update_local_db(event_object);
      }
    );

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENING, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_CHANNELS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_OPENING,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_forward_requests = async () => {
    console.log("listen_to_subscribe_to_forward_requests");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToForwardRequests({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FORWARD_REQUEST, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARD_REQUESTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FORWARD_REQUEST,
        response: object,
      };

    await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_forwards = async () => {
    console.log("subscribe_to_forwards");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToForwards({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FORWARD, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARDS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FORWARD,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, async(err) => {
      console.error("Error:", err);
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_FORWARDS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: err,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_graph = async () => {
    console.log("listen_to_subscribe_to_graph");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToGraph({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_UPDATED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_UPDATED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_CLOSED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.NODE_UPDATED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.NODE_UPDATED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, async (err) => {
      console.error("Error:", err);
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_GRAPH,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: err,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_invoices = async () => {
    console.log("listen_to_subscribe_to_invoices");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToInvoices({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.INVOICE_UPDATED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_INVOICES,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.INVOICE_UPDATED,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_open_requests = async () => {
    console.log("listen_to_subscribe_to_open_requests");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToOpenRequests({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_REQUEST, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_OPEN_REQUESTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHANNEL_REQUEST,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_past_payments = async () => {
    console.log("listen_to_subscribe_to_past_payments");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPastPayments({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.PAYMENT, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAST_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.PAYMENT,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_payments = async () => {
    console.log("listen_to_subscribe_to_payments");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPayments({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CONFIRMED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CONFIRMED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.FAILED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.FAILED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.PAYING, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PAYMENTS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.PAYING,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_peer_messages = async () => {
    console.log("listen_to_subscribe_to_peer_messages");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPeerMessages({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.MESSAGE_RECEIVED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PEER_MESSAGES,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.MESSAGE_RECEIVED,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_peers = async () => {
    console.log("listen_to_subscribe_to_peers");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToPeers({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.CONNECTED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_PEERS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.CONNECTED,
        response: object,
      };

      await this.update_local_db(event_object);
    });
  };

  listen_to_subscribe_to_transactions = async () => {
    console.log("listen_to_subscribe_to_transactions");
    let lnd = this.get_authenticated_lnd();
    const eventEmitter = subscribeToTransactions({ lnd });

    eventEmitter.on(
      LND_SUBSCRIPTION_EVENT_TYPES.CHAIN_TRANSACTION,
      async (object) => {
        let event_object = {
          operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_TRANSACTIONS,
          event_type: LND_SUBSCRIPTION_EVENT_TYPES.CHAIN_TRANSACTION,
          response: object,
        };

        await this.update_local_db(event_object);
      }
    );
  };

  listen_to_subscribe_to_wallet_status = async () => {
    console.log("listen_to_subscribe_to_wallet_status");
    try{
    let lnd = this.get_unauthenticated_lnd();
    const eventEmitter = subscribeToWalletStatus({ lnd });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ABSENT, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ABSENT,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ACTIVE, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ACTIVE,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.ERROR, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.ERROR,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.LOCKED, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.LOCKED,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.READY, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.READY,
        response: object,
      };

      await this.update_local_db(event_object);
    });

    eventEmitter.on(LND_SUBSCRIPTION_EVENT_TYPES.STARTING, async (object) => {
      let event_object = {
        operation: LND_SUBSCRIPTION_OPERATIONS.SUBSCRIBE_TO_WALLET_STATUS,
        event_type: LND_SUBSCRIPTION_EVENT_TYPES.STARTING,
        response: object,
      };

      await this.update_local_db(event_object);
    });
   }catch(e){
    console.log("Error subscribing to wallet status");
    console.log(e)
  }
  };
}

module.exports = { SubscribedAuthenticatedLndOperations };
