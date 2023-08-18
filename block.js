const {GENESIS_DATA} = require('./config')
const cryptoHash = require('./crypto_hash')

class Block {
    constructor( timestamp, prevHash, hash, nonce, difficulty, data ) {
        this.timestamp = timestamp
        this.prevHash = prevHash
        this.hash = hash
        this.nonce = nonce
        this.difficulty = difficulty
        this.data = data
    }
    // creating genesis block 
    static genesis() {
        // console.log(GENESIS_DATA.GENESIS_DATA.data)
        return new Block(GENESIS_DATA.timestamp, GENESIS_DATA.prevBlock, GENESIS_DATA.hash, GENESIS_DATA.nonce, GENESIS_DATA.difficulty, GENESIS_DATA.data)
    }
    // mining block 
    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prevHash = prevBlock.hash
        const difficulty = prevBlock.difficulty

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now()
            hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block(timestamp, prevHash, hash, nonce, difficulty, data)
    }
}

// const block0 = Block.genesis()
// console.log(block0)

// const block1 = Block.mineBlock({prevBlock:block0, data:"Hello world"})
// console.log(block1)

module.exports = Block