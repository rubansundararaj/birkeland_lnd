const {
  unauthenticatedLndGrpc,
  getWalletStatus,
  unlockWallet,
  createWallet,
  createSeed,
} = require("lightning");
const fs = require("fs");



class UnAuthenticatedLndOperations {

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
      
    }
    
  }

  get_wallet_status = async () => {
    try {
      console.log("get_wallet_status");
      let lnd = get_unauthenticated_lnd();
      let resp = await getWalletStatus({ lnd: lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  unlock_wallet = async (params) => {
    try {
      console.log("unlock_wallet");
      let { password } = params;
      let lnd = get_unauthenticated_lnd();
      let resp = await unlockWallet({ lnd: lnd, password: password });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  create_wallet = async (params) => {
    try { 
      console.log("create_wallet");
      let { password } = params;
      let lnd = get_unauthenticated_lnd();
      const { seed } = await createSeed({ lnd });
      let resp = await createWallet({ lnd: lnd, seed, password: password });
      resp["seed"] = seed;
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  create_seed = async () => {
    try { 
      console.log("create_seed");
      let lnd = get_unauthenticated_lnd();
      let resp = await createSeed({ lnd });
      return { success: true, message: resp };
    } catch (err) {
      return { success: false, message: err };
    }
  };
}

module.exports = { UnAuthenticatedLndOperations };
