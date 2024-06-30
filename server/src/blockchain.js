const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.launchChain();
    }

    async launchChain() {
        if (this.height === -1) {
            const block = new Block({ data: "Genesis Block" });
            await this.addBlock(block);
        }
    }

    async addBlock(block) {
        let self = this;
        block.height = self.chain.length;
        block.time = new Date().getTime().toString();

        if (self.chain.length > 0) {
            block.previousBlockHash = self.chain[self.chain.length - 1].hash;
        }

        block.hash = SHA256(JSON.stringify(block)).toString();
        self.chain.push(block);
        return block;
    }

    async validateChain() {
        let self = this;
        const errors = [];

        for (const block of self.chain) {
            const isValid = await block.validator();
            if (!isValid) {
                errors.push(new Error(`The block ${block.height} is not valid.`));
            }
        }

        return errors;
    }

    print() {
        let self = this;
        for (let block of self.chain) {
            console.log(block.toString());
        }
    }
}

module.exports = Blockchain;
