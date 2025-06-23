require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/model");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const Product = require("./model/image");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://gen-z-admin.onrender.com","http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb atlas connected"))
  .catch((err) => console.log(err));
console.log("MONGO_URI:", process.env.MONGO_URI);

// resgister

app.post("/register", async (req, res) => {
  const { email } = req.body;

  let check = await User.findOne({ email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "User Email already exist" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "periya_ragasiyam");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const data = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };

        const token = jwt.sign(data, "periya_ragasiyam");
        res.json({ token: token, user: data });
      } else {
        res.json({ error: "password is incorrect" });
      }
    } else {
      res.json("no user found");
    }
  });
});

// image storage engine

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dgjkhhzru",
  api_key: "296736478373897",
  api_secret: "l1eY9PmD3GqcCw3ADTEKpBWG99w",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gen-z-products", // optional folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("product"), (req, res) => {
  console.log("📸 FILE INFO:", req.file);
  res.json({
    success: 1,
    image_url: req.file.path,
  });
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let maxId = Math.max(...products.map((p) => p.id));
    id = maxId + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.status(200).json({ success: true, name: req.body.name });
});

// get all products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});

// creating new collection

app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Newcollection fetched");
  res.send(newcollection);
});

// end point for popular

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("popular in  women fetched");
  res.send(popular_in_women);
});

app.get("/test", (req, res) => {
  res.send("Backend is alive!");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
