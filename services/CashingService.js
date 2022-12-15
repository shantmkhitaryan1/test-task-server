const NodeCache = require( "node-cache" );


class CashingService {
    constructor() { 
        this.cashe = new NodeCache( { stdTTL: 100, checkperiod: 120 } )
    }


    setValue({ key, value }) {
        this.cashe.set(key, value)
    }

    getValue(key) {
        return this.cashe.get(key)
    }
}

module.exports = CashingService;