const express = require('express');
const router = express.Router();

// Basic placeholder routes for leaves
router.get('/', (req, res) => {
	res.json({ message: 'Leaves route' });
});

module.exports = router;

