const {Schema, model} = require ("mongoose");

// const counterFunction = ()=>{
//     let orderID = 0
//     let orderArray = []
//     for (let index = 1; index < orderArray.length; index++) {
//         orderID ++
        
//     }
//     return orderID;
// }

// const orderId = counterFunction()


const orderSchema = new Schema ({
    fullName: {type: String, required: true, unique: false },
    email: {type: String, required: true, unique: false },
    dispatchAddress: {type: String, required: true, unique: false },
    billingAddress: {type: String, required: true, unique: false },
    // orderID: {type: Number, default: orderId, required: true, unique: true },
    orderDate: {type: Date, default: Date.now},
    productType: {type: String, required: true, unique: false },
    quantity: {type: Number, required: true, unique: false}
},
{
    toObject: {
        virtuals: true
    }
})

module.exports = model("orders", orderSchema)