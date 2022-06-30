import { Duplex } from 'stream';

export class InitDataDuplex extends Duplex {
  constructor(initData, options) {
    super(options);
    this.push(initData.toString());
  }

  _read(size) {
    // if (this[kSource].length > 0) {
    //   const shifted = this[kSource].shift();
    //   console.log('读出流：', shifted);
    //   this.push(shifted);
    // } else {
    //   this.push(null);
    // }
  }

  _write(chunk, encoding, callback) {
    // The underlying source only deals with strings
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString();
    }
    // console.log('写进流：', chunk);

    this.push(chunk);

    callback();
    return true;
  }
}
