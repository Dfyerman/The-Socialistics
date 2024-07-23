const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;