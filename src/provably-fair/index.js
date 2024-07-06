const crypto = require('crypto');

export class ProvablyFairExample {

  constructor(clientSeed) {
    if (!clientSeed) {
      throw new Error("Client seed must be provided");
    }

    this.serverSeed = this.generateRandomSeed();
    this.serverSeedHashed = this.hash(this.serverSeed);
    this.clientSeed = clientSeed;
    this.nonce = 1;
  }

  generateRandomSeed() {
    return crypto.randomBytes(32).toString('hex');
  }

  hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
  }

  generateFinalSeed() {
    const finalSeed = this.hash(`${this.serverSeed} ${this.clientSeed} ${this.nonce}`);
    this.nonce++;
    return { serverSeedHashed: this.serverSeedHashed, finalSeed: finalSeed }
  }

  close() {
    const result = { serverSeed: this.serverSeed, clientSeed: this.clientSeed };
    for (let prop in this) {
      if (this.hasOwnProperty(prop)) {
        delete this[prop];
      }
    }
    return result;
  }
}