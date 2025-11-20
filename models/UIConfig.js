const mongoose = require('mongoose');

const UIConfigSchema = new mongoose.Schema({
    screenName: { type: String, required: true, unique: true }, 
        layout: { type: Array, default: [] }, 
            lastUpdatedBy: { type: String, default: "AI_DEV_AGENT" }
            });

            module.exports = mongoose.model('UIConfig', UIConfigSchema);
            