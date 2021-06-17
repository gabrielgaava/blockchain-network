import Blockchain from './blockchain.js';

const BitCoin = new Blockchain();

const nonce = 100;
const previousBlockHash = "AHDKLJASHDLKASJHDAKLJ123893Y12UIJ";

const blockData = [
  { amount: 1000, sender: "Gabriel", recipient: "Maikel" },
  { amount: 5, sender: "Gabriel", recipient: "Maikel" },
  { amount: 200, sender: "Maikel", recipient: "Gabriel" },
];


console.log(BitCoin.hashBlock(previousBlockHash, blockData, BitCoin.proofOfWork(
  previousBlockHash, blockData
)));


console.log(BitCoin);