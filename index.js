const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const orderSchema = require('./models/orderModels');
const factorySchema = require('./models/factoryModels');
const { isNull } = require('util');
const { db } = require('./models/orderModels');
const orderModels = require('./models/orderModels');
const factoryModels = require('./models/factoryModels');
const subOrder = require('./models/subOrder')

require('dotenv').config;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

mongoose.connect(`mongodb+srv://dannyh186:codenation@clusterduck-cpzou.mongodb.net/orders?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get('/order', (req, res) => {
    res.render('order')
});



app.post('/order', async (req, res) => {

    const newOrder = new orderSchema({
        fullName: req.body.fullName,
        email: req.body.email,
        orderDate: orderSchema.orderDate,
        billingAddress: req.body.billingAddress,
        dispatchAddress: req.body.dispatchAddress,
        tshirt: req.body.tshirt,
        mug: req.body.mug,
        card: req.body.card,
        gift: req.body.gift,
        factoryToProduce: "empty"
    })

    await newOrder.save()


    let items = []

    items.push({ type: 'T-Shirts', quantity: req.body.tshirt })
    items.push({ type: 'Mugs', quantity: req.body.mug })
    items.push({ type: 'Cards', quantity: req.body.card })
    items.push({ type: 'Gifts', quantity: req.body.gift })


    for (const item of items) {
        if (item.quantity == 'undefined') {
            continue;
        }

        const order = new subOrder({
            parent: newOrder._id,
            item: item.type,
            quantity: item.quantity
        })

        order.save()

        let doc = await factorySchema.find({productType: item.type})
        let highestCap = doc.reduce((prev, current) => {
            return (prev.remainingCapacity > current.remainingCapacity) ? prev : current
        })
        
        highestCap.remainingCapacity -= item.quantity
        highestCap.orders.push(order._id)

        await highestCap.save()
        
    }
    
    res.redirect('orderID')

});

app.get('/orderID', async (req, res) => {
    let id = await orderSchema.findOne({ id: orderSchema._id })
    res.render('orderID', { id: id._id })
})


app.get('/engineer', async (req, res) => {
    let data = await factorySchema.find({});
    data = data.map((item) => item.toObject())
    res.render('engineer', { data })
});


app.get('/factory', async (req, res) => {
    let data1 = await orderSchema.find({});
    data1 = data1.map((item) => item.toObject())
    res.render('factory', { data1 })
});


app.post('/factory', async (req, res) => {
    let findFactory = await factorySchema.find({ factoryName: req.body.findFactory })
    findFactory = findFactory.map((item) => item.toObject())
    console.log(findFactory)
    
    res.render('factory', { findFactory })
    
})


app.listen(3001, () => {
    console.log('server is listening on port 3001')
})



//  const guernseyFactory = new factorySchema({
//                  factoryName: "GuernseyLoveIsland Ltd Factory",
//                  productType: ["Cards", "Mugs", "T-Shirts"],
//                  totalCapacity: 10000,
//                  totalOrders:0,
//                  remainingCapacity: 10000,
//                 mug: 0, 
//                 card: 0, 
//                 tShirt: 0,


//             })
//             guernseyFactory.save();

//             const proFactory = new factorySchema({
//                             factoryName: "ProFulfillingWorld Ltd Factory",
//                             productType: ["Cards", "Gifts"],
//                             totalCapacity: 5000,
//                               totalOrders:0,
//                         remainingCapacity:5000,
//                         gift:0 ,
//                         card: 0, 

//                     })
//                     proFactory.save();

//                     const coolFactory = new factorySchema({
//                                 // factoryName: "CygnificantlyCool Ltd Factory",
//                                 productType: ["Gifts"],
//                                 totalCapacity: 7000,
//                                 totalOrders:0,
//                                 remainingCapacity:7000,
//                                 gift:0 ,

//                             })
//                             coolFactory.save();

//                             const doctorFactory = new factorySchema({
//                                         factoryName: "DoctorsPackingSolutions Ltd Factory",
//                                         productType: ["T-Shirts"],
//                                         totalCapacity: 2000,
//                                         totalOrders:0,
//                                         remainingCapacity:2000,
//                                         tShirt: 0,

//                                     })
//                                     doctorFactory.save();

