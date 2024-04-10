var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const connectToDB = require('./db');
const Item = require('../modules/Item');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

connectToDB().catch((err)=> console.log(err));

async function getItems() {
  const items = await Item.find();
  return items;
}
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







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', function(req, res, next) {
  res.render('items', { title: 'New Item' });
})

// CRUD For each item 

// Search 

// Create 
router.get('/items/new', function(req, res, next) {
  res.render('newItem', { title: 'New Item', categories: ['Electronics', 'Clothing', 'Food', 'Furniture']});
})

router.post('/items/new', async function(req, res, next) {
  createItem(req.body.name, req.body.category, req.body.quantity, req.body.price, req.body.description, req.body.imageurl);
  res.redirect('/items');
})


// TODO 

router.get('/items/:id', function(req, res, next) {
  res.render('thisItem', { title: 'Edit Item' });
  
})
// Update 
router.get('/items/edit/:id/', function(req, res, next) {
  res.render('newItem', { title: 'Edit Item' });
  })
// Delete
router.delete('/items/delete/:id/', function(req, res, next) {
  res.render('items', { title: 'Delete Item' });
})

// CRUD For each category
router.get('/category', function(req, res, next) {
  res.render('category', { title: 'New Item' });
})


// Create 
router.get('/category/new', function(req, res, next) {
  res.render('newcategory', { title: 'New Category' });
})
// Search 
router.get('/category/:id', function(req, res, next) {
  res.render('thisCategory', { title: 'Edit Category' });
})
// Update 
router.post('/category/edit/:id/', function(req, res, next) {
  res.render('category', { title: 'Edit Category' });
  })
// Delete
router.delete('/category/delete/:id/', function(req, res, next) {
  res.render('category', { title: 'Delete Category' });
})



module.exports = router;
