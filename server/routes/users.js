require('dotenv').config();
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { SECRET = 'secret' } = process.env

const UserModel = require('../models/user')

router.get('/getAll', async (req, res) => {
	try {
		const data = await UserModel.find()
		res.json(data)
	}
	catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/find/:username', async (req, res) => {
	username = req.params.username
	try {
		const user = await UserModel.findOne({ "username": username })
		res.json({
			username: user.username,
			_id: user._id,
			score: user.score,
			predictions: user.predictions,
			roles: user.roles
		})
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}

})

router.post('/register', async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = await UserModel.create(req.body)
		const token = jwt.sign({ username: user.username }, SECRET)
		res.json({
			username: user.username,
			token
		})
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await UserModel.findOne({ username: req.body.username });
		if (user) {
			const result = await bcrypt.compare(req.body.password, user.password)

			if (result) {
				const token = jwt.sign({ username: user.username }, SECRET)
				res.json({
					username: user.username,
					token
				})

			} else {
				res.status(400).json({ message: "password does not match" })
			}

		} else {
			res.status(400).json({ message: "user does not exist" })
		}

	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
});

module.exports = router;
