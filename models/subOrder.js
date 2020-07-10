const {Schema, model} = require ("mongoose");

const subOrder = new Schema ({
    parent: {type: Schema.Types.ObjectId, required: true},
    item: {type: String, required: true},
    quantity: {type:Number, required: true}
}, {
    toObject: {
        virtuals: true
    }  
})

module.exports = model("subOrders", subOrder)