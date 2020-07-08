const {Schema, model} = require ("mongoose");

const factorySchema = new Schema ({
    factoryName: {type: String, required: true, unique: false },
    productType: {type: [String], required: true, unique: false },
    totalOrders: {type: Number, required: false, unique: false},
    remainingCapacity: {type: Number, required: false, unique: false},
    totalCapacity: {type: Number, required: true, unique: false},
    orders: {type: [Schema.Types.ObjectId]},
    mug: {type: Number},
    tShirt: {type: Number}, 
    gift: {type: Number}, 
    card: {type: Number},
    //orders array that has the ID's of the orders that will be produced in each different factory. 
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