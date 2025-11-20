const axios = require('axios');
const User = require('../models/User');
const Content = require('../models/Content');
const Ad = require('../models/Ad');

// STREAM PROXY (Video Chori se bachane ke liye)
exports.streamVideo = async (req, res) => {
    try {
            const { id } = req.params;
                    const content = await Content.findById(id);
                            if (!content) return res.status(404).json({ msg: 'Content not found' });

                                    const videoUrl = content.sourceUrl; 
                                            const range = req.headers.range;
                                                    if (!range) return res.status(400).send("Requires Range header");

                                                            const response = await axios({
                                                                        method: 'GET', url: videoUrl, responseType: 'stream', headers: { Range: range }
                                                                                });

                                                                                        res.writeHead(206, {
                                                                                                    "Content-Range": response.headers['content-range'],
                                                                                                                "Accept-Ranges": "bytes",
                                                                                                                            "Content-Length": response.headers['content-length'],
                                                                                                                                        "Content-Type": "video/mp4",
                                                                                                                                                });
                                                                                                                                                        response.data.pipe(res);
                                                                                                                                                            } catch (error) {
                                                                                                                                                                    console.error("Stream Error:", error.message);
                                                                                                                                                                            res.status(500).send("Server Error");
                                                                                                                                                                                }
                                                                                                                                                                                };

                                                                                                                                                                                // PLAYER CONFIG (Ads check karega)
                                                                                                                                                                                exports.getPlayerConfig = async (req, res) => {
                                                                                                                                                                                    try {
                                                                                                                                                                                            const { id } = req.params;
                                                                                                                                                                                                    const user = await User.findById(req.user.id);
                                                                                                                                                                                                            
                                                                                                                                                                                                                    // Backend URL set karein
                                                                                                                                                                                                                            const baseUrl = process.env.BACKEND_URL || 'http://localhost:3000';
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                            let responsePayload = {
                                                                                                                                                                                                                                                        streamUrl: `${baseUrl}/api/stream/${id}`,
                                                                                                                                                                                                                                                                    showAds: false,
                                                                                                                                                                                                                                                                                ads: []
                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                // Agar User FREE (Bronze) hai, toh Ads dikhao
                                                                                                                                                                                                                                                                                                        if (user.plan === 'BRONZE') {
                                                                                                                                                                                                                                                                                                                    responsePayload.showAds = true;
                                                                                                                                                                                                                                                                                                                                // Yahan hum Dummy Ads bhej rahe hain (bad mein AI se aayega)
                                                                                                                                                                                                                                                                                                                                            responsePayload.ads = [
                                                                                                                                                                                                                                                                                                                                                            { type: 'PRE_ROLL', src: 'https://www.w3schools.com/html/mov_bbb.mp4', skippable: true },
                                                                                                                                                                                                                                                                                                                                                                            { type: 'OVERLAY', text: 'Upgrade to Gold to Remove Ads' }
                                                                                                                                                                                                                                                                                                                                                                                        ];
                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                        res.json(responsePayload);
                                                                                                                                                                                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                    res.status(500).send("Error fetching config");
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                        };
                                                                                                                                                                                                                                                                                                                                                                                                                        