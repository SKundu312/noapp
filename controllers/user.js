const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require('../models/user')

const registerUser = async (req, res) => {
	// Get user input
	const { name, email, password, phone } = req.body;
	console.log(name, email, password, phone);
	try {
		// Validate user input
		if (!(email && password && phone && name)) {
			return res.status(400).send({
				success: false,
				message: "Please enter all fields",
			});
		}
		// check if user already exist
		// Validate if user exist in our database
		const em = email.toLowerCase();
		const existingUser = await User.findOne({
			$or: [{ email: em }, { phone }],
		});
		if (existingUser) {
			let message = "E-mail already in use";
			if (existingUser.phone === phone)
				message = "Phone already in use";
			if (existingUser.phone === phone && existingUser.email === email)
				message = "Phone & Email already in use";
			return res.status(400).json({ message });
		}
		//Encrypt user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create user in our database
		const userSummary = {
			name,
			email: em,
			password: hashedPassword,
			phone,
		};
		const user = new User(userSummary);
		await user.save();
		const token = generateToken(user._id);
		return res.status(200).json({
			user: userSummary,
			token,
			message: "New user registered successfully",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			err,
		});
	}
}

const loginUser = async (req, res) => {
 const { email, password } = req.body;
 try {
		if (!(email && password)) {
			res.status(400).send("Missing fields");
		}

		const existingUser = await User.findOne({
			email: email.toLowerCase(),
		});
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordValid)
			return res.status(401).json({ message: "Invalid password" });
		res.status(200).json({
			user: existingUser,
			token: generateToken(existingUser._id),
		});
 } catch (err) {
		res.status(500).json({ message: "Something went wrong" });
 }
}

module.exports = { registerUser, loginUser }