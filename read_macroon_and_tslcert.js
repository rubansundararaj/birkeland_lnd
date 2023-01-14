
const fs = require("fs");
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

module.exports = {tls_cert,macroon}