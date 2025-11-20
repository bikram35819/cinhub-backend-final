const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    title: { type: String },
        type: { type: String, enum: ['PRE_ROLL', 'MID_ROLL', 'OVERLAY', 'IN_FEED'], required: true },
            videoUrl: { type: String }, // Video ads ke liye
                imageUrl: { type: String }, // Overlay/Banner ke liye
                    redirectUrl: { type: String }, // Click karne par kahan jaye
                        isActive: { type: Boolean, default: true }
                        });

                        module.exports = mongoose.model('Ad', AdSchema);
                        