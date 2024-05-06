var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const connectToDB = require('./db');
const Item = require('../modules/Item');
const Category = require('../modules/Category');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
connectToDB().catch((err)=> console.log(err));
let items = [];
let categories = [];
let categoryName = []
async function getItems() {
  items = await Item.find();
  return items;
}
async function getCategories() {
  categories = await Category.find();
  return categories;
}
// window.onload = function() {
  getItems().then((items) => console.log(items));
  getCategories().then((categories) => console.log(categories));
// };




getCategories().then((categories) => {
  categories.forEach((category) => {
    categoryName.push(category.name);
  }
  )
});


getItems().then((items) => console.log(items));

async function createItem(name, category, quantity, price, description, imageurl) {
  const item = new Item({
    name: name,
    category: category,
    quantity: quantity,
    price: price,
    description: description,
    imageurl: imageurl
  });
  await item.save();
  return item;
}

async function AddCategory(name, description) {
  const category = new Category({
    name: name,
    description: description
  });
  await category.save();
  return category;
}

// categories = getCategories().then((categories) => {
  // ['Electronics', 'Clothing', 'Food', 'Furniture'].forEach((category) => {
  //   AddCategory(category | 'hi', 'This is a category');
  // }
  // )
  
// });

async function updateItem(id, name, category, quantity, price, description, imageurl) {
  const item = await Item.findById(id);
  item.name = name;
  item.category = category;
  item.quantity = quantity;
  item.price = price;
  item.description = description;
  item.imageurl = imageurl;
  await item.save();
  return item;
}

async function updateCategory(id, name, description) {
  const category = await Category.findById(id)
  category.name = name;
  category.description = description;
  await category.save();
  return category;
}

async function delItem(id) {
  const item = await Item.findByIdAndDelete(id);
  return item;
}

async function delCategory(id) {
  const category = await Category.findByIdAndDelete(id);
  return category;
}





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Garage', items: items });
});

router.get('/items', function(req, res, next) {
  res.render('items', { title: 'Item List', items: items });
})

// CRUD For each item 

// Search 

// Create 
router.get('/items/new', function(req, res, next) {
  res.render('newItem', { title: 'New Item', categories: categoryName});
})

router.post('/items/new', async function(req, res, next) {
  createItem(req.body.name, req.body.category, req.body.quantity, req.body.price, req.body.description, req.body.imageurl);
  res.redirect('/items');
})


router.get('/items/:id', function(req, res, next) {
  const item = items.find(item => item.id === req.params.id);
  res.render('ItemDetail', { title: 'Edit Item' , item: item});
  
})
// Update 
router.get('/items/edit/:id/', function(req, res, next) {
  const item = items.find(item => item.id === req.params.id);
  res.render('thisItem', { title: 'Edit Item',item: item, categories: categoryName});
  })

router.post('/items/edit/:id/', function(req, res, next) {
  // const item = items.find(item => item.id === req.params.id);
  updateItem(req.params.id, req.body.name, req.body.category, req.body.quantity, req.body.price, req.body.description, req.body.imageurl);
  res.redirect('/items');
  })
// Delete
router.post('/items/delete/:id/', function(req, res, next) {
  delItem(req.params.id);
  res.redirect('/items');
})

// ------------------------------------------------------------

// CRUD For each category
router.get('/category', function(req, res, next) {
  res.render('category', { title: 'Categories', categories: categories});
})


// Create 
router.get('/category/new', function(req, res, next) {
  res.render('newcategory', { title: 'New Category' });
})

router.post('/category/new', async function(req, res, next) {
  AddCategory(req.body.name, req.body.description);
  res.redirect('/category');
}
)

// Edit 
router.get('/category/:id', function(req, res, next) {
  const category = categories.find(category => category.id === req.params.id);
  res.render('thisCategory', { title: 'Edit Category', category: category});
})

router.post('/category/edit/:id/', function(req, res, next) {
  updateCategory(req.params.id, req.body.name, req.body.description);
  res.redirect('/category');
}
)


// Delete
router.post('/category/delete/:id/', function(req, res, next) {
  delCategory(req.params.id);
  res.redirect('/category');
})



module.exports = router;
