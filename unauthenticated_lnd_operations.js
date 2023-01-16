const {
  unauthenticatedLndGrpc,
  getWalletStatus,
  unlockWallet,
  createWallet,
  createSeed,
} = require("lightning");

const { tls_cert } = require("./read_macroon_and_tslcert");

const { lnd } = unauthenticatedLndGrpc({
  cert: tls_cert,
  socket: "127.0.0.1:10009",
});

class UnAuthenticatedLndOperations {

  get_wallet_status = async () => {
    try {
      console.log("get_wallet_status");
      let resp = await getWalletStatus({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: JSON.stringify(err) };
    }
  };

  unlock_wallet = async (params) => {
    try {
      console.log("unlock_wallet");
      let { password } = params;
      let resp = await unlockWallet({ lnd: lnd, password: password });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: JSON.stringify(err) };
    }
  };

  create_wallet = async (params) => {
    try { 
      console.log("create_wallet");
      let { password } = params;
      const { seed } = await createSeed({ lnd });
      let resp = await createWallet({ lnd: lnd, seed, password: password });
      resp["seed"] = seed;
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: JSON.stringify(err) };
    }
  };

  create_seed = async () => {
    try { 
      console.log("create_seed");
      let resp = await createSeed({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: JSON.stringify(err) };
    }
  };
}

module.exports = { UnAuthenticatedLndOperations };
