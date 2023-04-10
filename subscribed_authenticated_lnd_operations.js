const { authenticatedLndGrpc, subscribeToForwards } = require("lightning");
const fs = require("fs");

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

  listenToSubscribeToForwards = async () => {
    console.log("subscribe_to_forwards");
    let lnd = this.get_authenticated_lnd();
    const forwardEventEmitter = subscribeToForwards({ lnd });

    forwardEventEmitter.on("forward", (forward) => {
      console.log("Forward event:", forward);

      return {
        operation: "subscribe_to_forwards",
        event_status: "forward",
        response: forward,
      };
    });

    forwardEventEmitter.on("error", (err) => {
      console.error("Error:", err);
      return {
        operation: "subscribe_to_forwards",
        event_status: "error",
        response: err,
      };
    });

    forwardEventEmitter.on("end", () => {
      console.log("End of subscription");
    });
  };

}

module.exports = { SubscribedAuthenticatedLndOperations };
