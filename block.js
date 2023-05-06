const GENESIS_DATA = require('./config')
const cryptoHash = require('./crypto_hash')

class Block{
    constructor(timestamp, prevHash, hash, data){
        this.timestamp = timestamp
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
    }
    // creating genesis block 
    static genesis(){
        return new Block(GENESIS_DATA.timestamp, GENESIS_DATA.prevHash, GENESIS_DATA.hash, GENESIS_DATA.data)
    }
    // mining block 
    static mineBlock({prevBlock,data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash
        const hash = cryptoHash(timestamp, prevHash, data)
        return new Block(timestamp, prevHash, hash, data)
    }
}

// const block0 = Block.genesis()
// console.log(block0)

// const block1 = Block.mineBlock({prevBlock:block0, data:"Hello world"})
// console.log(block1)

module.exports = Block