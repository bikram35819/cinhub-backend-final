const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
                referralCode: { type: String, unique: true }, 
                    referredBy: { type: String, default: null }, 
                        plan: { type: String, enum: ['BRONZE', 'SILVER', 'GOLD'], default: 'BRONZE' },
                            walletBalance: { type: Number, default: 0.00 },
                                lifetimeEarnings: { type: Number, default: 0.00 },
                                    cinTokens: { type: Number, default: 0 },
                                        isAdmin: { type: Boolean, default: false }
                                        }, { timestamps: true });

                                        module.exports = mongoose.model('User', UserSchema);
                                        