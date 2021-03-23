module.exports = {
  get allow() { return 'Allow'; },
  set allow(val) { throw new TypeError('Cannot set property allow'); },
  get deny() { return 'Deny'; },
  set deny(val) { throw new TypeError('Cannot set property deny'); },
};
