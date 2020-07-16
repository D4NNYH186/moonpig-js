const {Schema, model} = require ("mongoose");

const factorySchema = new Schema ({
    factoryName: {type: String, required: true, unique: false },
    productType: {type: [String], required: true, unique: false },
    remainingCapacity: {type: Number, required: false, unique: false},
    totalCapacity: {type: Number, required: true, unique: false},
    orders: {type: [Schema.Types.ObjectId]},
},
{
    toObject: {
        virtuals: true
    }
})

factorySchema.statics.findFactory = async function({findMe}) {
    await this.find({findMe})
}

module.exports = model("factory", factorySchema)