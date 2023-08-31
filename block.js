const {GENESIS_DATA, MINE_RATE} = require('./config')
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
        let difficulty = prevBlock.difficulty

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty({originalBlock:prevBlock, timestamp})
            hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block(timestamp, prevHash, hash, nonce, difficulty, data)
    }

    // adjusting difficulty
    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;

        let diff = timestamp - originalBlock.timestamp;

        if (difficulty < 1) return 1;

        // decreasing diff as mining taking more time 
        if(diff > MINE_RATE) return difficulty - 1
        // decreasing diff as mining taking more time 
        else return difficulty + 1
    }
}

const block0 = Block.genesis()
// console.log(block0)

const block1 = Block.mineBlock({prevBlock:block0, data:"Hello world"})
console.log(block1)

module.exports = Block