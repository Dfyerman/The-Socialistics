const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes'); // Ensure this file name matches the actual file name
const userRoutes = require('./UserRoutes'); // Update the file name to match the actual file name in your project
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;