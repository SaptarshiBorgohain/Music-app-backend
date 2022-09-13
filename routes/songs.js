const router = require('express').Router();
const { User } = require('../models/user');
const { Song, validate } = require('../models/song');
const auth = require("../middleware/auth");
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

//create song 

router.post("/", admin, async (req, res) => {
      const { error } = validate(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });

      const song = await Song(req.body).save();
      res.status(201).send({ data: song, message: "Song created successfully" });

})

// get all songs from
router.get('/', async (req, res) => {
      const songs = await Song.find();
      res.status(200).send({ data: songs, message: "Success" });
});

//update song
router.put('/:id', [validateObjectId, admin], async (req, res) => {
      const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send({ data: song, message: "Updated Successfully" });

});

//delete song
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
      await Song.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Song deleted successfully" });
});

//liked songs
router.put('/like/:id', [validateObjectId, auth], async (req, res) => {
      let resMessage = "";
      const song = await Song.findById(req.params.id);
      if(!song) return res.status(404).send({ message: "Song not found" });

      const user = await User.findById(req.user._id);
      const index = user.likedSongs.indexOf(song._id);
      if(index === -1) {
            user.likedSongs.push(song._id);
            resMessage = "Song added to liked songs";
      }else {
            user.likedSongs.splice(index, 1);
            resMessage = "Song removed from liked songs";
      }
      res.status(200).send({ message: resMessage });
});

// get all the liked songs
router.get('/like', auth, async (req, res) => {
      const user = await User.findById(req.user._id);
      const songs = await Song.find({ _id: user.likedSongs });
      res.status(200).send({ data: songs, message: "Success" });
})

module.exports = router;