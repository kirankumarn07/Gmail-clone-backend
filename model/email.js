const mongoose = require("mongoose");


const EmailSchema =new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: String,
    name: {
        type: String,
        required: true,
        default:"0"

    },
    starred: {
        type: Boolean,
        required: true,
        default: false
    },
    bin: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: false

    }
});
const Email = mongoose.model("Email", EmailSchema);

exports.Email = Email;