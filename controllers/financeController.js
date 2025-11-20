const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.purchasePlan = async (req, res) => {
    const { planType } = req.body; // SILVER or GOLD
        const userId = req.user.id;

            const user = await User.findById(userId);
                user.plan = planType;
                    await user.save();

                        // REFERRAL COMMISSION LOGIC
                            if (user.referredBy) {
                                    const referrer = await User.findOne({ referralCode: user.referredBy });
                                            if (referrer) {
                                                        let commission = (planType === 'SILVER') ? 50 : 100; // Commission Amount
                                                                    referrer.walletBalance += commission;
                                                                                referrer.lifetimeEarnings += commission;
                                                                                            await referrer.save();

                                                                                                        await Transaction.create({
                                                                                                                        userId: referrer._id, amount: commission, type: 'CREDIT', source: `REF_COMMISSION_${planType}`, status: 'VERIFIED'
                                                                                                                                    });
                                                                                                                                            }
                                                                                                                                                }
                                                                                                                                                    res.json({ msg: `${planType} Plan Activated` });
                                                                                                                                                    };

                                                                                                                                                    exports.requestWithdrawal = async (req, res) => {
                                                                                                                                                        const { amount } = req.body;
                                                                                                                                                            const userId = req.user.id;
                                                                                                                                                                const user = await User.findById(userId);

                                                                                                                                                                    if (user.walletBalance < amount) return res.status(400).json({ msg: "Insufficient Funds" });

                                                                                                                                                                        user.walletBalance -= amount;
                                                                                                                                                                            await user.save();

                                                                                                                                                                                await Transaction.create({
                                                                                                                                                                                        userId, amount, type: 'DEBIT', source: 'WITHDRAWAL', status: 'PENDING'
                                                                                                                                                                                            });

                                                                                                                                                                                                res.json({ msg: "Withdrawal Request Sent" });
                                                                                                                                                                                                };
                                                                                                                                                                                                