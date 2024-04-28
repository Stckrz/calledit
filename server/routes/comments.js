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
//
// router.get('/getByCategory/:category', async (req, res) => {
// 	const category = req.params.category
//
// 	let page = req.query.page;
// 	const limit = 10;
// 	let skip;
// 	skip = (page - 1) * limit;
//
// 	try {
// 		const total = await PredictionModel.countDocuments({ "category": category })
// 		const data = await PredictionModel.find({ "category": category }).skip(skip).limit(limit)
// 		res.json({ data, total })
// 	}
// 	catch (error) {
// 		res.status(500).json({ message: error.message })
// 	}
// })

router.get('/getByPredictionId/:id', async (req, res) => {
	const predictionId = req.params.id;

	let page = req.query.page;
	const limit = 10;
	let skip;
	skip = (page - 1) * limit;

	try {
		const total = await CommentModel.countDocuments({ predictionId: predictionId })
		const comments = await CommentModel.find({ predictionId: predictionId })
		res.json(({ comments, total }))
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

router.patch('/update/:id', isLoggedIn, async (req, res) => {
	const { username } = req.user;
	req.body.username = username;
	try {
		const id = req.params.id;
		const commentUpdateInfo = req.body;
		// const options = { new: true }
		const result = await CommentModel.findByIdAndUpdate(id, commentUpdateInfo)
		res.send(result)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = router;
