require('dotenv').config();
var express = require('express');
var router = express.Router();
const { isLoggedIn } = require("../middleware/middleware");

const CommentModel = require('../models/comments')

router.get('/getAll', async (req, res) => {
	try {
		const comments = await CommentModel.find()
		res.json(comments)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})
//
// router.delete('/deleteAll', async (req, res) => {
// 	try {
// 		const comments = await CommentModel.deleteMany({})
// 		res.json(comments)
// 	}
// 	catch (error) {
// 		res.status(400).json({ message: error.message })
// 	}
// })

router.get('/getByPredictionId/:id', async (req, res) => {
	const predictionId = req.params.id;
	try {
		const comments = await CommentModel.find({ predictionId: predictionId })
		res.json(comments)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.get('/getVotesById/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const comment = await CommentModel.findById(id)
		res.json(comment.votes)
		
		// res.json(comments)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.post('/post', isLoggedIn, async (req, res) => {
	const { username } = req.user;
	req.body.username = username;
	const data = new CommentModel({
		author: req.body.username,
		title: req.body.title,
		postBody: req.body.postBody,
		votes: req.body.votes,
		predictionId: req.body.predictionId
	})
	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = router;
