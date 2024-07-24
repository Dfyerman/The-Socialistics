const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  removeReaction,
  createReaction,
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

router.route('/:thoughtId/:reactionId')
  .delete(removeReaction);

router.route('/:thoughtId/createReactions')
  .post(createReaction);


module.exports = router;