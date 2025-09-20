const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    done:{
        type: Boolean,
        default: false
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Note", noteSchema);