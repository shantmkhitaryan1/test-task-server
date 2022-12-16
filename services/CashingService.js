const NodeCache = require("node-cache");

class CashingService {
  constructor() {
    this.cashe = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  setValue({ key, value, ttl = 43200 }) {
    this.cashe.set(key, value, ttl);
  }

  getValue(key) {
    return this.cashe.get(key);
  }
}

module.exports = CashingService;
