const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number, required: true },
            type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
                source: { type: String, required: true }, // e.g., "REFERRAL", "WITHDRAWAL"
                    status: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
                        aiRiskScore: { type: Number, default: 0 }
                        }, { timestamps: true });

                        module.exports = mongoose.model('Transaction', TransactionSchema);
                        