const axios = require('axios');

const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/wK4XuEnZf98gYOYYgwShNpNo4W9Xz3Tu";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0x791AFE27366c8AD8F04481ebBD72b37948Cc52d2",
  ]
}).then((response) => {
  const res = response.data.result;
    console.log(parseInt(res, 16) / 1e18);
});