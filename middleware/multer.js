const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[1] === "csv") {
		cb(null, true);
	} else {
		cb(new Error("Only CSV file allowed"), false);
	}
};

const uploads = multer({
	storage: storage,
	fileFilter: multerFilter,
});

module.exports = uploads;