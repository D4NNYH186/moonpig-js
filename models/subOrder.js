const {Schema, model} = require ("mongoose");

const factorySchema = new Schema ({
    parent: {type: Schema.Types.ObjectId, required: true},
    item: {type: String, require: true}
}, {
    toObject: {
        virtuals: true
    }  
})

module.exports = model("factory", factorySchema)