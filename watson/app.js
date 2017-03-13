const TelegramBot = require('node-telegram-bot-api');
var gcloud = require('google-cloud');
var vision = gcloud.vision;

const token = 'API TOKEN';
const bot = new TelegramBot(token, {polling: true});

var vision = vision({
    projectId: 'telegram-160918', 
    keyFilename: './path/to/api/key'
});

bot.onText(/\/help/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
    
  var text = `Do you ever look at porn and wonder if what you're looking at is actually porn? Watson is here to help. Watson is an artificially intelligent sentient with vision capabilities. It can detect sentiment in faces, discern landmarks, logos, extract text from images, and more. Send Watson a pic and give it a try`;
  bot.sendMessage(chatId, text);
});


bot.on('photo', function(msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hmm let\'s see..');
    var photoId = msg.photo[msg.photo.length-1].file_id;
    var path = bot.downloadFile(photoId, "./public/img").then(function (path) {
        var types = [
            'face', 
            'label', 
            'landmark', 
            'logo', 
            'text',
            'safeSearch'
        ];

        vision.detect(path, types, function(err, detections, apiResponse) {
            
  // detections = [
  //   // Detections for image.jpg:
  //   {
  //     faces: [...],
  //     labels: [...], 
  //     landmarks: [...], 
  //     logos: [...], 
  //     text: [...], 
  //     safeSearch: {...},
  //   },
  // ]


  // faces = [
  //   {
  //     angles: {
  //       pan: -8.1090336,
  //       roll: -5.0002542,
  //       tilt: 18.012161
  //     },
  //     bounds: {
  //       head: [
  //         {
  //           x: 1
  //         },
  //         {
  //           x: 295
  //         },
  //         {
  //           x: 295,
  //           y: 301
  //         },
  //         {
  //           x: 1,
  //           y: 301
  //         }
  //       ],
  //       face: [
  //         {
  //           x: 28,
  //           y: 40
  //         },
  //         {
  //           x: 250,
  //           y: 40
  //         },
  //         {
  //           x: 250,
  //           y: 262
  //         },
  //         {
  //           x: 28,
  //           y: 262
  //         }
  //       ]
  //     },
  //     features: {
  //       confidence: 34.489909,
  //       chin: {
  //         center: {
  //           x: 143.34183,
  //           y: 262.22998,
  //           z: -57.388493
  //         },
  //         left: {
  //           x: 63.102425,
  //           y: 248.99081,
  //           z: 44.207638
  //         },
  //         right: {
  //           x: 241.72728,
  //           y: 225.53488,
  //           z: 19.758242
  //         }
  //       },
  //       ears: {
  //         left: {
  //           x: 54.872219,
  //           y: 207.23712,
  //           z: 97.030685
  //         },
  //         right: {
  //           x: 252.67567,
  //           y: 180.43124,
  //           z: 70.15992
  //         }
  //       },
  //       eyebrows: {
  //         left: {
  //           left: {
  //             x: 58.790176,
  //             y: 113.28249,
  //             z: 17.89735
  //           },
  //           right: {
  //             x: 106.14151,
  //             y: 98.593758,
  //             z: -13.116687
  //           },
  //           top: {
  //             x: 80.248711,
  //             y: 94.04303,
  //             z: 0.21131183
  //           }
  //         },
  //         right: {
  //           left: {
  //             x: 148.61565,
  //             y: 92.294594,
  //             z: -18.804882
  //           },
  //           right: {
  //             x: 204.40808,
  //             y: 94.300117,
  //             z: -2.0009689
  //           },
  //           top: {
  //             x: 174.70135,
  //             y: 81.580917,
  //             z: -12.702137
  //           }
  //         }
  //       },
  //       eyes: {
  //         left: {
  //           bottom: {
  //             x: 84.883934,
  //             y: 134.59479,
  //             z: -2.8677137
  //           },
  //           center: {
  //             x: 83.707092,
  //             y: 128.34,
  //             z: -0.00013388535
  //           },
  //           left: {
  //             x: 72.213913,
  //             y: 132.04138,
  //             z: 9.6985674
  //           },
  //           pupil: {
  //             x: 86.531624,
  //             y: 126.49807,
  //             z: -2.2496929
  //           },
  //           right: {
  //             x: 105.28892,
  //             y: 125.57655,
  //             z: -2.51554
  //           },
  //           top: {
  //             x: 86.706947,
  //             y: 119.47144,
  //             z: -4.1606765
  //           }
  //         },
  //         right: {
  //           bottom: {
  //             x: 179.30353,
  //             y: 121.03307,
  //             z: -14.843414
  //           },
  //           center: {
  //             x: 181.17694,
  //             y: 115.16437,
  //             z: -12.82961
  //           },
  //           left: {
  //             x: 158.2863,
  //             y: 118.491,
  //             z: -9.723031
  //           },
  //           pupil: {
  //             x: 175.99976,
  //             y: 114.64407,
  //             z: -14.53744
  //           },
  //           right: {
  //             x: 194.59413,
  //             y: 115.91954,
  //             z: -6.952745
  //           },
  //           top: {
  //             x: 173.99446,
  //             y: 107.94287,
  //             z: -16.050705
  //           }
  //         }
  //       },
  //       forehead: {
  //         x: 126.53813,
  //         y: 93.812057,
  //         z: -18.863352
  //       },
  //       lips: {
  //         bottom: {
  //           x: 137.28528,
  //           y: 219.23564,
  //           z: -56.663128
  //         },
  //         top: {
  //           x: 134.74164,
  //           y: 192.50438,
  //           z: -53.876408
  //         }
  //       },
  //       mouth: {
  //         center: {
  //           x: 136.43481,
  //           y: 204.37952,
  //           z: -51.620205
  //         },
  //         left: {
  //           x: 104.53558,
  //           y: 214.05037,
  //           z: -30.056231
  //         },
  //         right: {
  //           x: 173.79134,
  //           y: 204.99333,
  //           z: -39.725758
  //         }
  //       },
  //       nose: {
  //         bottom: {
  //           center: {
  //             x: 133.81947,
  //             y: 173.16437,
  //             z: -48.287724
  //           },
  //           left: {
  //             x: 110.98372,
  //             y: 173.61331,
  //             z: -29.7784
  //           },
  //           right: {
  //             x: 161.31354,
  //             y: 168.24527,
  //             z: -36.1628
  //           }
  //         },
  //         tip: {
  //           x: 128.14919,
  //           y: 153.68129,
  //           z: -63.198204
  //         },
  //         top: {
  //           x: 127.83745,
  //           y: 110.17557,
  //           z: -22.650913
  //         }
  //       }
  //     },
  //     confidence: 56.748849,
  //     anger: false,
  //     blurred: false,
  //     headwear: false,
  //     joy: false,
  //     sorrow: false,
  //     surprise: false,
  //     underExposed: false
  //   }
  // ]

  // labels = [
  //   'classical sculpture',
  //   'statue',
  //   'landmark',
  //   'ancient history',
  //   'artwork'
  // ]

  // landmarks = [
  //   {
  //     desc: 'Mount Rushmore',
  //     id: '/m/019dvv',
  //     score: 28.651705,
  //     bounds: [
  //       {
  //         x: 79,
  //         y: 130
  //       },
  //       {
  //         x: 284,
  //         y: 130
  //       },
  //       {
  //         x: 284,
  //         y: 226
  //       },
  //       {
  //         x: 79,
  //         y: 226
  //       }
  //     ],
  //     locations: [
  //       {
  //         latitude: 43.878264,
  //         longitude: -103.45700740814209
  //       }
  //     ]
  //   }
  // ]

  // logos = [
  //   {
  //     desc: 'Google',
  //     id: '/m/045c7b',
  //     score: 64.35439,
  //     bounds: [
  //       {
  //         x: 11,
  //         y: 11
  //       },
  //       {
  //         x: 330,
  //         y: 11
  //       },
  //       {
  //         x: 330,
  //         y: 72
  //       },
  //       {
  //         x: 11,
  //         y: 72
  //       }
  //     ]
  //   }
  // ]

  // safeSearch = {
  //   adult: false,
  //   medical: false,
  //   spoof: false,
  //   violence: true
  // }


            var response = '';

            if(detections['faces']) {
                if(detections['faces'].length > 0) {
                var faceSentiment = 'I\'m seeing a face. ';

                if(detections['faces'][0]['joy']) {
                    faceSentiment += 'Looks very happy :)';
                }

                if(detections['faces'][0]['sorrow']) {
                    faceSentiment += 'Face full of sorrow :(';
                }

                if(detections['faces'][0]['anger']) {
                    faceSentiment += 'Looks angry';
                }

                if(detections['faces'][0]['surprise']) {
                    faceSentiment += 'Looks surprised';
                }

                response += faceSentiment += '/n';
                }
            } 

            if(detections['labels']) {
                    if(detections['labels'].length > 0) {
                        var chosenValue = Math.random() < 0.5 ? 1 : 2;
                        if(chosenValue === 1) { 
                            var text = "Getting a " + detections['labels'][0] + " or " + detections['labels'][1] + " vibe. \n";
                            response += text;
                        } else {
                            var text = "Looks like a " + detections['labels'][0] + " or " + detections['labels'][1] + ". \n";
                            response += text;
                        }
                        
                    }
            }
        
            
            if(detections['landmarks']) {
                if(detections['landmarks'].length > 0) {
                    var landmark = '\nI\ think i\'m seeing ' + detections['landmarks'][0] + '\n';
                    response += landmark;
                }
            }
            
            if(detections['logos']) {
                if(detections['logos'].length > 0) {
                    var logo = "I think that's the logo of " + detections['logos'];
                    response += logo;
                }
            }
            

            if(detections['text']) {
                if(detections['text'].length > 0) {
                    var text = "\nI'm seeing ";
                    text += " some text in the image. It says\n\n";
                    text += "\"\n";
                    text +=  detections['text'][0];
                    text += "\"";

                    response += text;
                }
            }
            

            if(detections['safeSearch']['adult']) {
                var text = "GULP. I'm seeing naughty content.";
                response += text;
            }

            bot.sendMessage(chatId, response);
        });

    });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        var text = `I'm textually impaired. Just images please. help for more on what I could do`;
        bot.sendMessage(chatId, text);
        // send a message to the chat acknowledging receipt of their message
    });
});
