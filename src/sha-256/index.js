export class Sha256 {

  // Fractional parts of the cube roots of the first 64 prime numbers
  K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
    0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
    0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
    0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
    0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  // Fractional parts of the square roots of the first 8 prime numbers
  H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  // Cyclic right shift function
  rightShift(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  // Pre-process the input string (padding)
  preProcess(message) {
    // Calculate the original message length in bits
    const originalBitLength = message.length * 8;
    // Append the '1' bit and pad with '0' bits until message length is 448 bits mod 512
    message += '\x80';
    while ((message.length * 8) % 512 !== 448) {
      message += '\x00';
    }
    // Append the original message length as a 64-bit big-endian integer
    for (let i = 7; i >= 0; i--) {
      message += String.fromCharCode((originalBitLength >>> (i * 8)) & 0xff);
    }
    return message;
  }

  // Process the padded message to produce the hash
  process(message) {
    // Copy the initial hash values
    const H = [...this.H];
    // Pre-process the message (padding)
    message = this.preProcess(message);

    // Process each 512-bit chunk of the message
    for (let i = 0; i < message.length; i += 64) {
      const chunk = message.slice(i, i + 64);
      const words = new Array(64);

      // Break chunk into sixteen 32-bit words
      for (let j = 0; j < 16; j++) {
        words[j] =
          (chunk.charCodeAt(j * 4) << 24) |
          (chunk.charCodeAt(j * 4 + 1) << 16) |
          (chunk.charCodeAt(j * 4 + 2) << 8) |
          chunk.charCodeAt(j * 4 + 3);
      }

      // Extend the sixteen 32-bit words into sixty-four 32-bit words
      for (let j = 16; j < 64; j++) {
        const sigma0 = this.rightShift(words[j - 15], 7) ^ this.rightShift(words[j - 15], 18) ^ (words[j - 15] >>> 3);
        const sigma1 = this.rightShift(words[j - 2], 17) ^ this.rightShift(words[j - 2], 19) ^ (words[j - 2] >>> 10);
        words[j] = (words[j - 16] + sigma0 + words[j - 7] + sigma1) | 0;
      }

      // Initialize hash value for this chunk
      let [a, b, c, d, e, f, g, h] = H;

      // Main loop: process the chunk
      for (let j = 0; j < 64; j++) {
        const sigma0 = this.rightShift(a, 2) ^ this.rightShift(a, 13) ^ this.rightShift(a, 22);
        const Ma = (a & b) ^ (a & c) ^ (b & c);
        const t2 = sigma0 + Ma;

        const sigma1 = this.rightShift(e, 6) ^ this.rightShift(e, 11) ^ this.rightShift(e, 25);
        const Ch = (e & f) ^ (~e & g);
        const t1 = h + sigma1 + Ch + this.K[j] + words[j];

        // Update the working variables
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }

      // Add the compressed chunk to the current hash value
      H[0] = (H[0] + a) | 0;
      H[1] = (H[1] + b) | 0;
      H[2] = (H[2] + c) | 0;
      H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0;
      H[5] = (H[5] + f) | 0;
      H[6] = (H[6] + g) | 0;
      H[7] = (H[7] + h) | 0;
    }

    // Produce the final hash value (big-endian) as a hexadecimal string
    return H.map(h => ('00000000' + h.toString(16)).slice(-8)).join('');
  }

}