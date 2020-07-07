const {Schema, model} = require ("mongoose");

const orderSchema = new Schema ({
    fullName: {type: String, required: true, unique: false },
    email: {type: String, required: true, unique: false },
    dispatchAddress: {type: String, required: true, unique: false },
    billingAddress: {type: String, required: true, unique: false },
    orderDate: {type: Date, default: Date.now},
    tshirt: {type: Number, required: false, unique: false },
    mug: {type: Number, required: false, unique: false },
    card: {type: Number, required: false, unique: false },
    gift: {type: Number, required: false, unique: false },
    factoryToProduce: {type: String}
         
 }, {
    toObject: {
        virtuals: true
    }
})


orderSchema.statics.findID = async function({findMe}) {
    await this.findOne({findMe})
}

module.exports = model("orders", orderSchema)