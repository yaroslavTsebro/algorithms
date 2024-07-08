class MD5 {
  constructor() { }

  // Function for addition with overflow
  static h(a, b) {
    let c, d, e, f, g;
    e = a & 2147483648;
    f = b & 2147483648;
    c = a & 1073741824;
    d = b & 1073741824;
    g = (a & 1073741823) + (b & 1073741823);
    return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f;
  }

  // Main functions for MD5 (F, G, H, I)
  static k(a, b, c, d, e, f, g) {
    a = MD5.h(a, MD5.h(MD5.h(b & c | ~b & d, e), g));
    return MD5.h(a << f | a >>> (32 - f), b);
  }

  static l(a, b, c, d, e, f, g) {
    a = MD5.h(a, MD5.h(MD5.h(b & d | c & ~d, e), g));
    return MD5.h(a << f | a >>> (32 - f), b);
  }

  static m(a, b, d, c, e, f, g) {
    a = MD5.h(a, MD5.h(MD5.h(b ^ d ^ c, e), g));
    return MD5.h(a << f | a >>> (32 - f), b);
  }

  static n(a, b, d, c, e, f, g) {
    a = MD5.h(a, MD5.h(MD5.h(d ^ (b | ~c), e), g));
    return MD5.h(a << f | a >>> (32 - f), b);
  }

  // Function to convert numbers to hexadecimal string
  static p(a) {
    let b = "", d = "", c;
    for (c = 0; c <= 3; c++) {
      d = a >>> (8 * c) & 255;
      d = "0" + d.toString(16);
      b += d.substr(d.length - 2, 2);
    }
    return b;
  }

  // Main function to compute the MD5 hash
  static compute(e) {
    // Convert input message to UTF-8
    e = function (a) {
      a = a.replace(/\r\n/g, "\n");
      for (let b = "", d = 0; d < a.length; d++) {
        let c = a.charCodeAt(d);
        if (c < 128) {
          b += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          b += String.fromCharCode((c >> 6) | 192);
          b += String.fromCharCode((c & 63) | 128);
        } else {
          b += String.fromCharCode((c >> 12) | 224);
          b += String.fromCharCode(((c >> 6) & 63) | 128);
          b += String.fromCharCode((c & 63) | 128);
        }
      }
      return b;
    }(e);

    // Pad the message
    let f = function (b) {
      let a, c = b.length;
      a = c + 8;
      for (let d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) {
        a = (g - g % 4) / 4;
        f = g % 4 * 8;
        e[a] |= b.charCodeAt(g) << f;
        g++;
      }
      a = (g - g % 4) / 4;
      e[a] |= 128 << g % 4 * 8;
      e[d - 2] = c << 3;
      e[d - 1] = c >>> 29;
      return e;
    }(e);

    // Initialize buffers
    let a = 1732584193;
    let b = 4023233417;
    let c = 2562383102;
    let d = 271733878;

    // Main processing loop
    for (let e = 0; e < f.length; e += 16) {
      let q = a;
      let r = b;
      let s = c;
      let t = d;
      a = MD5.k(a, b, c, d, f[e + 0], 7, 3614090360);
      d = MD5.k(d, a, b, c, f[e + 1], 12, 3905402710);
      c = MD5.k(c, d, a, b, f[e + 2], 17, 606105819);
      b = MD5.k(b, c, d, a, f[e + 3], 22, 3250441966);
      a = MD5.k(a, b, c, d, f[e + 4], 7, 4118548399);
      d = MD5.k(d, a, b, c, f[e + 5], 12, 1200080426);
      c = MD5.k(c, d, a, b, f[e + 6], 17, 2821735955);
      b = MD5.k(b, c, d, a, f[e + 7], 22, 4249261313);
      a = MD5.k(a, b, c, d, f[e + 8], 7, 1770035416);
      d = MD5.k(d, a, b, c, f[e + 9], 12, 2336552879);
      c = MD5.k(c, d, a, b, f[e + 10], 17, 4294925233);
      b = MD5.k(b, c, d, a, f[e + 11], 22, 2304563134);
      a = MD5.k(a, b, c, d, f[e + 12], 7, 1804603682);
      d = MD5.k(d, a, b, c, f[e + 13], 12, 4254626195);
      c = MD5.k(c, d, a, b, f[e + 14], 17, 2792965006);
      b = MD5.k(b, c, d, a, f[e + 15], 22, 1236535329);
      a = MD5.l(a, b, c, d, f[e + 1], 5, 4129170786);
      d = MD5.l(d, a, b, c, f[e + 6], 9, 3225465664);
      c = MD5.l(c, d, a, b, f[e + 11], 14, 643717713);
      b = MD5.l(b, c, d, a, f[e + 0], 20, 3921069994);
      a = MD5.l(a, b, c, d, f[e + 5], 5, 3593408605);
      d = MD5.l(d, a, b, c, f[e + 10], 9, 38016083);
      c = MD5.l(c, d, a, b, f[e + 15], 14, 3634488961);
      b = MD5.l(b, c, d, a, f[e + 4], 20, 3889429448);
      a = MD5.l(a, b, c, d, f[e + 9], 5, 568446438);
      d = MD5.l(d, a, b, c, f[e + 14], 9, 3275163606);
      c = MD5.l(c, d, a, b, f[e + 3], 14, 4107603335);
      b = MD5.l(b, c, d, a, f[e + 8], 20, 1163531501);
      a = MD5.l(a, b, c, d, f[e + 13], 5, 2850285829);
      d = MD5.l(d, a, b, c, f[e + 2], 9, 4243563512);
      c = MD5.l(c, d, a, b, f[e + 7], 14, 1735328473);
      b = MD5.l(b, c, d, a, f[e + 12], 20, 2368359562);
      a = MD5.m(a, b, c, d, f[e + 5], 4, 4294588738);
      d = MD5.m(d, a, b, c, f[e + 8], 11, 2272392833);
      c = MD5.m(c, d, a, b, f[e + 11], 16, 1839030562);
      b = MD5.m(b, c, d, a, f[e + 14], 23, 4259657740);
      a = MD5.m(a, b, c, d, f[e + 1], 4, 2763975236);
      d = MD5.m(d, a, b, c, f[e + 4], 11, 1272893353);
      c = MD5.m(c, d, a, b, f[e + 7], 16, 4139469664);
      b = MD5.m(b, c, d, a, f[e + 10], 23, 3200236656);
      a = MD5.m(a, b, c, d, f[e + 13], 4, 681279174);
      d = MD5.m(d, a, b, c, f[e + 0], 11, 3936430074);
      c = MD5.m(c, d, a, b, f[e + 3], 16, 3572445317);
      b = MD5.m(b, c, d, a, f[e + 6], 23, 76029189);
      a = MD5.m(a, b, c, d, f[e + 9], 4, 3654602809);
      d = MD5.m(d, a, b, c, f[e + 12], 11, 3873151461);
      c = MD5.m(c, d, a, b, f[e + 15], 16, 530742520);
      b = MD5.m(b, c, d, a, f[e + 2], 23, 3299628645);
      a = MD5.n(a, b, c, d, f[e + 0], 6, 4096336452);
      d = MD5.n(d, a, b, c, f[e + 7], 10, 1126891415);
      c = MD5.n(c, d, a, b, f[e + 14], 15, 2878612391);
      b = MD5.n(b, c, d, a, f[e + 5], 21, 4237533241);
      a = MD5.n(a, b, c, d, f[e + 12], 6, 1700485571);
      d = MD5.n(d, a, b, c, f[e + 3], 10, 2399980690);
      c = MD5.n(c, d, a, b, f[e + 10], 15, 4293915773);
      b = MD5.n(b, c, d, a, f[e + 1], 21, 2240044497);
      a = MD5.n(a, b, c, d, f[e + 8], 6, 1873313359);
      d = MD5.n(d, a, b, c, f[e + 15], 10, 4264355552);
      c = MD5.n(c, d, a, b, f[e + 6], 15, 2734768916);
      b = MD5.n(b, c, d, a, f[e + 13], 21, 1309151649);
      a = MD5.n(a, b, c, d, f[e + 4], 6, 4149444226);
      d = MD5.n(d, a, b, c, f[e + 11], 10, 3174756917);
      c = MD5.n(c, d, a, b, f[e + 2], 15, 718787259);
      b = MD5.n(b, c, d, a, f[e + 9], 21, 3951481745);
      a = MD5.h(a, q);
      b = MD5.h(b, r);
      c = MD5.h(c, s);
      d = MD5.h(d, t);
    }

    // Return the final hash
    return (MD5.p(a) + MD5.p(b) + MD5.p(c) + MD5.p(d)).toLowerCase();
  }
}