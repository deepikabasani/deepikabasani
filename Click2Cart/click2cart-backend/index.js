const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// MiddleWare
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orders: [
    {
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
        },
      ],
      totalAmount: Number,
      orderDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  isOrdered: {
    type: Number,
    default: 0
  }
});

app.get("/", (req, res) => {
  res.send("Root");
});

//Create an endpoint at ip/login for login the user and giving token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
			success = true;
      console.log("userId", user.id);

      const userData = {
        name: user.name,
        userId: user.id,
        email: user.email
      }
      console.log("*******", userData)
			const token = jwt.sign(data, 'secret_ecom');
			res.status(200).json({ success, token, userData });
        }
        else {
            return res.status(400).json({success: success, errors: "please try with correct email/password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "please try with correct email/password"})
    }
})

//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
        let success = false;
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let cart = {};
          for (let i = 0; i < 300; i++) {
          cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        success = true;
        res.json({ success, token })
    })

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
  console.log("All Products");
    res.send(products);
});

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

// app.get("/popularinwomen", async (req, res) => {
// 	let products = await Product.find({});
//   let arr = products.splice(0,  4);
//   // console.log("Popular In Women");
//   res.send(arr);
// });

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })

  //Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })

  app.post('/emptyEntireart', fetchuser, async (req, res) => {
    console.log("Remove Entire Cart");
      let userData = await Users.findOne({_id:req.user.id});
      if(userData.cartData){
        // userData.cartData[req.body.itemId] -= 1;
        userData.cartData.forEach(item => {
          if(item !== 0) {
              item = 0
          }
        });
      }
      await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
      // res.send("");
      res.send(200).json({});
    })

  //Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})


app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({success:true,name:req.body.name})
});

app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({success:true,name:req.body.name})
});

// Endpoint to confirm an order
app.post("/confirmOrder", fetchuser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.body.user.userId });
    const order = {
      products: req.body.cartData.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalAmount: req.body.totalAmount,
    };

    for (const productOrder of order.products) {
      const product = await Product.findOne({ id: productOrder.productId });
      if (product) {
        product.available = false;
        product.isOrdered = 1; // Set isOrdered to 1
        await product.save();
      }
    }

    userData.orders.push(order);
    if(userData.cartData){
      for(let item in userData.cartData) {
        console.log(userData.cartData[item])
        if(userData.cartData[item] != 0) {
          userData.cartData[item] = 0
        }
      }
    }
    await Users.findOneAndUpdate({_id:req.body.user.userId}, userData);
    res.json({ success: true, message: "Order confirmed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error confirming the order" });
  }
});

// Endpoint to get order history
app.get("/orderHistory", fetchuser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    res.json({ success: true, orderHistory: userData.orders });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching order history" });
  }
});


app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
