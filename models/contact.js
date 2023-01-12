var mongoose = require("mongoose");
require("mongoose-type-url");

//name, phone, email, linkedin profile url

var contactSchema = new mongoose.Schema({
	Name: {
		type: String,
	},
	Email: {
		type: String,
	},
	Phone: {
		type: Number,
     },
     Linkedin: {
          type: mongoose.SchemaTypes.Url,
     }
});

// const contactSchema = new mongoose.Schema({
// 	fileName: { type: String, required: true },
// 	csvData: { type: [csvdataSchema], required: true },
// });

module.exports = mongoose.model("contact", contactSchema);
