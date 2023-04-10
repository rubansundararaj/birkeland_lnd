const { authenticatedLndGrpc, subscribeToForwards } = require("lightning");
const fs = require("fs");
const birkeland_lnd_events_item = require("../mongoose_models/birkeland_lnd_event_model");

class SubscribedAuthenticatedLndOperations {
  get_authenticated_lnd = () => {
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
  };

  listen_to_subscribe_to_forwards = async () => {
    console.log("subscribe_to_forwards");
    let lnd = this.get_authenticated_lnd();
    const forwardEventEmitter = subscribeToForwards({ lnd });

    forwardEventEmitter.on("forward", (forward) => {
      let event_object =  {
        operation: "subscribe_to_forwards",
        event_type: "forward",
        response: forward,
      };

      birkeland_lnd_events_item.create(event_object).then((resp) => {
        console.log("Created listenToSubscribeToForwards:");
      }).catch((err) => {
        console.error("Error creating listenToSubscribeToForwards:", err);
      });

    });

    forwardEventEmitter.on("error", (err) => {
      console.error("Error:", err);
      let event_object = {
        operation: "subscribe_to_forwards",
        event_type: "error",
        response: err,
      };

      birkeland_lnd_events_item.create(event_object).then((resp) => {
        console.log("Created listenToSubscribeToForwards:");
      }).catch((err) => {
        console.error("Error creating listenToSubscribeToForwards:", err);
      });

    });

    forwardEventEmitter.on("end", () => {
      console.log("End of subscription");
    });
  };

}

module.exports = { SubscribedAuthenticatedLndOperations };
