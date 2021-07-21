const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');

router.get('/', auth, saucesCtrl.getAllStuff);
router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.put('/:id', auth, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);
router.post('/:id/like', auth, saucesCtrl.likesDislikes);

module.exports = router;
