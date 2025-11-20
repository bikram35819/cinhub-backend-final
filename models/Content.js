const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
        thumbnail: { type: String }, 
            sourceUrl: { type: String, required: true }, // Hidden Google Drive/Terabox link
                category: { type: String },
                    isPremium: { type: Boolean, default: false },
                        views: { type: Number, default: 0 }
                        });

                        module.exports = mongoose.model('Content', ContentSchema);
                        