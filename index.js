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
// const db1 = require('monk')
// const favicon = require('serve-favicon')

require('dotenv').config;

const app = express();

// Add Couterparts array to order schema. 
// Each order that goes to two factories will be split and given it’s own ID, those id’s will be displayed in the counter parts array of the original order. 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(favicon(path.join(__dirname, 'public/moon-logo.png')));

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
    if (!req.body.email == isNull || !req.body.dispatchAddress == isNull || !req.body.billingAddress == isNull || req.body.fullName == isNull) {

        res.render('order', { err: "EXCUSE ME... Please provide all details" });
        return;
    }
    else {

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

        console.log(newOrder._id);

        // let factoryForTshirts = await factorySchema.find({//productType incudes Tshirt and capacity is greater than the other factory that can produce tshirts.})
        //     let factoryForMugs = await factorySchema.find({productType: "Mugs"} );
        // let totalProductsOrdered = 4
        let factory = await factorySchema.findOne({ productType: "Mugs" })
        factory = factory.toObject()

        const totalOrderQuanity = () => {
            let mug = req.body.mug
            let tshirt = req.body.tshirt
            let gift = req.body.gift
            let card = req.body.card
            let totalProductsOrdered = +mug + +tshirt + +gift + +card

            return totalProductsOrdered
        }


        

        const remainingCapacity = () => {
            let remainingCapacity = factory.remainingCapacity - totalOrderQuanity()
            return remainingCapacity

        }







        /**
         * move remainingcap totalorder to static method on schema
         * 
         * 
         */



        // const highestRemainingCapacityFactory = () => {
        //     let remainingCapacity = factorySchema.find({})
        // }

        /**
         * get the factory
         * 
         */

         console.log(await factorySchema.findOne({productType: "Mugs", productType: "Gifts"}));
         
       
     


        updateFactoryToProduce = await factorySchema.findOneAndUpdate({ productType: "Mugs"}, { $push: { orders: newOrder._id },
         $inc: {
              'mug': req.body.mug,
              'totalOrders': totalOrderQuanity()
            },
            remainingCapacity: remainingCapacity()
        });

        // updateTotalOrders = await factorySchema.findOneAndUpdate({})
        //now working, however the total orders needs a seperate function, as at the moment it is just adding every item ordered and sending it to the factory that handles mugs. 

    }



    //update the factory document with the order id to the orders array. 
    // factoryOrderLink()}
    res.redirect('orderID')

});



// const factoryWithMostCapacity = () => {

//     if (factorySchema.remain)

// }


app.get('/orderID', async (req, res) => {
    let id = await orderSchema.findOne({ id: orderSchema._id })
    console.log(id._id)
    res.render('orderID', { id: id._id })
})


app.get('/engineer', async (req, res) => {
    let data = await factorySchema.find({});
    data = data.map((item) => item.toObject())
    res.render('engineer', { data })
    //: factoryName, productType, totalCapacity, currentCapacity, remainingCapacity
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



app.listen(3000, () => {
    console.log('server is listening on port 3000')
})



// const guernseyFactory = new factorySchema({
//                 factoryName: "GuernseyLoveIsland Ltd Factory",
//                 productType: ["Cards", "Mugs", "T-Shirts"],
//                 totalCapacity: 10000,
//                 totalOrders:0,
//                 remainingCapacity: 10000,
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
//                                 factoryName: "CygnificantlyCool Ltd Factory",
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

                // const cardButton = document.getElementById("card-button");
                // const mugButton = document.getElementById("mug-button");
                // const tshirtButton = document.getElementById("t-shirt-button");
                // const giftButton = document.getElementById("gift-button");
                // cardButton.addEventListener("click", ()=> {
                    //     productType.textContent = ("Card")
                    // });
                    // mugButton.addEventListener("click", ()=> {
                        //     productType.input.textContent = ("Mug")
                        // });
                        // giftButton.addEventListener("click", ()=> {
                            //     productType.input.textContent = ("Gift")
                            // });
                            // tshirtButton.addEventListener("click", ()=> {
                                //     productType.input.textContent = ("T-Shirt")
                                // });
                                // 


                                // search for gurnsey 

                                // + orders Array

                                // search orders db through orders array

// const factoryOrderLink = async () => {
//     let Gorders = await orderSchema.aggregate([
//         {$lookup:
//                 {from: factorySchema,
//                     localField: mug,
//                     foreignField: factoryName,
//                     as: factoryName,
//                 }
//          }
//     ])
//             console.log(Gorders)
//             return Gorders
// }