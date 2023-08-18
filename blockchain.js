const Block = require('./block');
const cryptoHash = require('./crypto_hash');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length -1],
            data: data
        })
        this.chain.push(newBlock)
    }

    static isValidChain(chain){
        // checking if first block is genesis block 
        if(JSON.stringify(chain[0])  !== JSON.stringify(Block.genesis())) return false;

        // checking for each block 
        for(let i = 1; i < chain.length; i++){
            const {timestamp, prevHash, hash, nonce, difficulty, data} = chain[i]

            // checking if linking is correct 
            const realPrevHash = chain[i-1].hash
            if (prevHash !== realPrevHash) return false

            // checking if hash encryption is correct
            const validHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data)
            if (hash !== validHash) return false
        }
        return true
    }

    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error("Chain isn't longer!")
        }
        else if(!BlockChain.isValidChain(chain)){
            console.error("Chain isn't valid!")
        }
        else{
            this.chain = chain
            console.log("Chain replaced successfully!")
        }
    }
}

const blockChain = new BlockChain()
blockChain.addBlock({data:"new data"})
blockChain.addBlock({data:"another data"})
console.log(blockChain)

// const blockChain2 = new BlockChain()
// blockChain2.addBlock({data:"new data"})

// console.log(BlockChain.isValidChain(blockChain.chain))
// blockChain2.replaceChain(blockChain.chain)
// console.log(blockChain2)

module.exports = BlockChain