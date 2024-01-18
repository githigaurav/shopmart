const {mongoose, Schema} = require("mongoose")
const commonSchema = require("./common")
const clothSchema = new mongoose.Schema({
    ...commonSchema
})