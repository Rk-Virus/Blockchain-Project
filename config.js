const MINE_RATE = 1000; //1sec
const INITIAL_DIFFICULTY = 3;
const GENESIS_DATA = {
    timestamp : Date.now(),
    prevHash : '0x00',
    hash : '0x012',
    nonce:0,
    difficulty: INITIAL_DIFFICULTY,
    data : 'genesis'
}

module.exports = {GENESIS_DATA, MINE_RATE};

