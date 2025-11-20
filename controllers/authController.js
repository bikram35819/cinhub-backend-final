const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
            const { username, email, password, referralCode } = req.body;
                    let user = await User.findOne({ email });
                            if (user) return res.status(400).json({ msg: 'User already exists' });

                                    const salt = await bcrypt.genSalt(10);
                                            const hashedPassword = await bcrypt.hash(password, salt);
                                                    const myCode = 'CIN' + Math.floor(1000 + Math.random() * 9000);

                                                            user = new User({
                                                                        username, email, password: hashedPassword,
                                                                                    referralCode: myCode,
                                                                                                referredBy: referralCode || null
                                                                                                        });

                                                                                                                await user.save();
                                                                                                                        const payload = { user: { id: user.id } };
                                                                                                                                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                                                                                                                                            if (err) throw err;
                                                                                                                                                        res.json({ token });
                                                                                                                                                                });
                                                                                                                                                                    } catch (err) {
                                                                                                                                                                            console.error(err.message);
                                                                                                                                                                                    res.status(500).send('Server error');
                                                                                                                                                                                        }
                                                                                                                                                                                        };

                                                                                                                                                                                        // LOGIN
                                                                                                                                                                                        exports.login = async (req, res) => {
                                                                                                                                                                                            try {
                                                                                                                                                                                                    const { email, password } = req.body;
                                                                                                                                                                                                            let user = await User.findOne({ email });
                                                                                                                                                                                                                    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

                                                                                                                                                                                                                            const isMatch = await bcrypt.compare(password, user.password);
                                                                                                                                                                                                                                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

                                                                                                                                                                                                                                            const payload = { user: { id: user.id } };
                                                                                                                                                                                                                                                    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                                                                                                                                                                                                                                                                if (err) throw err;
                                                                                                                                                                                                                                                                            res.json({ token, user: { id: user.id, plan: user.plan, balance: user.walletBalance } });
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                        } catch (err) {
                                                                                                                                                                                                                                                                                                console.error(err.message);
                                                                                                                                                                                                                                                                                                        res.status(500).send('Server error');
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                                                            