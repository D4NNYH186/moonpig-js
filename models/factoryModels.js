const {Schema, model} = require ("mongoose");

const factorySchema = new Schema ({
    factoryName: {type: String, required: true, unique: false },
    productType: {type: Array, required: true, unique: false },
    currentCapacity: {type: Number, required: false, unique: false},
    remainingCapacity: {type: Number, required: false, unique: false},
    totalCapacity: {type: Number, required: true, unique: false}
},
{
    toObject: {
        virtuals: true
    }
})

module.exports = model("factory", factorySchema)