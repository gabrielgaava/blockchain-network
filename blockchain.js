// Imports / Dependencies
import sha256 from "sha256";

class Blockchain {

  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  /**
   * Creates a new hashed block in the Blockchain
   * @param {Number} nonce : Used for proof of work metho.
   * @param {String} previousBlockHash : The hased data from the previous block in the Blockchain
   * @param {String} hash : The hashed data of the new block
   */
  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    }

    this.pendingTransactions = []; // Clena transactions
    this.chain.push(newBlock); // Add the block

    return newBlock;
  }

  /**
   * @returns The last block in the Blockchain
   */
  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }

  /**
   * Creates a new transaction in the Blockchain. Transactions are not stored in the final chain
   * they are pending, until been validated
   * @param {Number} amount : The amount transfered
   * @param {String} sender : Who sent the money
   * @param {String} recipient : Who recived the money
   */
  createNewTransaction(amount, sender, recipient){

    // Creates the transaction object
    const transaction = {amount,sender,recipient};

    // Adds this transaction to the Blockchain
    this.pendingTransactions.push(transaction);

    return this.getLastBlock()['index'] + 1;

  }

  /**
   * Hash the data from a block object using SHA-256
   * @param {String} previousBlockHash : The previous block hash
   * @param {Object} currentBlockData : The block object with the data
   * @param {Number} nonce : The blockchain nonce
   * @returns {String}: the hashed data
   */
  hashBlock(previousBlockHash, currentBlockData, nonce){

    // Store all parameters like a String for hash purpose
    const stringData = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hashedData = sha256(stringData);

    return hashedData;

  }

  /**
   * Repeatedly hash block until it finds corret hash for new block. 
   * Continuosly changes nonce value until it finds the correct hash
   * @param {*} previousBlockHash : The previous hash data block
   * @param {*} currentBlockData : Uses curretn block data for create the hash
   * @returns: return the nonce value that creates the correct hash
   */
  proofOfWork(previousBlockHash, currentBlockData){

    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    while(hash.substring(0, 4) !== 'fdf7'){
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;

  }

}

export default Blockchain;