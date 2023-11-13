const express = require('express');
const cors = require('cors')
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')

// const Jwt = require('jsonwebtoken')     // for authentication token
// const jwtKey = 'e-comm';    // ye key ko .env me bhi rakh sakte hain..isko private rakhna hota hai---

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject(); // to remove password in response
    delete result.password;
    resp.send(result);
    // Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    //     if (err) {
    //         resp.send({ result: 'Something went wrong.. Please try after sometime.' })

    //     }
    //     resp.send({result, auth:token})
    // })

    // abhi hum ek hi email ke kai users input hone de rhe hai jo ki nahi hona chhahiye..iske liye ek validation banayenge..taki unique email ho ske user ko identify krne ke liye...
})

app.post('/login', async (req, resp) => {
    // user ko find tabhi kro jab usne email aur password dono dale hon
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            resp.send(user);
            // first parameter--jo bhi data send krna chhahte hain
            // Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            //     if (err) {
            //         resp.send({ result: 'Something went wrong.. Please try after sometime.' })

            //     }
            //     resp.send({user, auth:token}) 

            // })

        }
        else {
            resp.send({ result: 'No user Found' })

        }
    }
    else {
        resp.send({ result: 'No user Found' })
    }
})


// product api
app.post('/add-product', async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

})


// list product api
app.get('/products', async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product Found" })
    }
})


// delete records---
app.delete('/products/:id', async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})


// api to get single product---
app.get('/product/:id', async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: 'No Record Found' })
    }
})

// api for update
app.put('/product/:id', async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
})

// api for search
app.get('/search/:key', async (req, resp) => {
    let result = await Product.find(
        {
            "$or":
                [
                    { name: { $regex: req.params.key } },
                    { company: { $regex: req.params.key } }
                ]
        }
    )

    resp.send(result)
})



app.listen(4000);