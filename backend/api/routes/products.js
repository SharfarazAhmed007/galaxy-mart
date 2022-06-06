const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const shortid = require('shortid');
const productController = require('../controller/productController');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, shortid.generate() + '-'+ file.originalname);
    }
});

const upload = multer({ storage });
  
  

router.get('/', productController.get_items);
router.post('/create_products', auth, upload.array('images'), productController.post_items);
router.get('/details/:id', productController.get_items_by_id);
// router.put('/:id', productController.update_items);
// router.delete('/:id', productController.delete_items);


module.exports = router;
