const { Router } = require('express');
const { CreateBlog, GetBlogs ,GetBlog , PublishBlog } = require('../controllers/blog');
const { Verify } = require('../middleware/verify');
const { verify } = require('jsonwebtoken');

const router = Router();

router.post('/create', Verify, CreateBlog);
router.get('/all',Verify, GetBlogs);
router.get('/:id', Verify, GetBlog);
router.put('/publish', Verify, PublishBlog);

module.exports = router;