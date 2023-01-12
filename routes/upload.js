const router = require('express').Router();
const contactSchema = require("../models/contact");
const csv = require("csvtojson");
const uploads = require("../middleware/multer");

router.get('/', (req, res) => {
     contactSchema.find((err, data) => {
		if (err) {
			console.log(err);
		} else {
			if (data !== "") {
				res.render("index", { data: data });
				console.log("data", data);
			} else {
				res.render("index", { data: "" });
			}
		}
	});
})

router.post("/", uploads.single("csvFile"), (req, res) => {
	// const fileName = req.body.fileName;
	// console.log("fileName",fileName);
	csv()
		.fromFile(req.file.path)
		.then((response) => {
			console.log("response", response);
			for (var x = 0; x < response; x++) {
				var contactResp = parseFloat(response[x].Name);
				response[x].Name = contactResp;
				contactResp = parseFloat(response[x].Email);
				response[x].Email = contactResp;
				contactResp = parseFloat(response[x].Phone);
				response[x].Phone = contactResp;
				contactResp = parseFloat(response[x].Linkedin);
				response[x].Linkedin = contactResp;
				console.log("response", response[x]);
			}
			contactSchema.insertMany(response, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					res.redirect("/");
					console.log("file inserted", req.file);
				}
			});
			// contactSchema.findOneAndUpdate({ fileName: fileName }, {$set: { csvData: response, fileName: fileName}}, (err, data) => {
			// 	 	if (err) {
			// 			console.log(err);
			// 		} else {
			// 	          res.redirect("/");
			// 	          console.log("file inserted",req.file);
			// 		}
			// });
		});
});

module.exports = router;
     