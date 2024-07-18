const TelegramBot = require('node-telegram-bot-api');
//const instagramGetUrl = require("instagram-url-direct");
const fetch = require("node-fetch")
const cheerio = require('cheerio');

/*const Instaloader = require('instaloader');
const fs = require('fs');
const glob = require('glob');*/

// Initialize Instaloader
//const L = new Instaloader();

// Telegram Bot API token
const API_TOKEN = '7476910522:AAFiun8K__9RvmrtXbq3L9GPIbDkQquH9xY';

// Initialize Telegram Bot
const bot = new TelegramBot(API_TOKEN, { polling: true });

// Command: /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Bhaag chutiyaa Hello!!! I can download Instagram reels/stories. Send an Instagram link to download media.');
});

// Detect Instagram links in any message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
 if (msg.text.includes('instagram.com') == true) {
    bot.sendMessage(msg.chat.id, 'Ruk chutiya Download Karke Deta hu 🥱');
  //  const shortcode = link.split('/').filter(Boolean).slice(-1)[0]; //kaam nhi aaya bad me aayega rakhe rakhiye isko
  fetch("https://v3.igdownloader.app/api/ajaxSearch", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "priority": "u=1, i",
      "referrer-policy": "strict-origin-when-cross-origin",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Microsoft Edge\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://igdownloader.app/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `recaptchaToken=&q=${msg.text}&t=media&lang=en`,
    "method": "POST"
  }).then(res=> res.json())
	  .then(data=> {
      console.log(data)
                    if(data != undefined ) {
			console.log(data)
if(data.data != "") {
const $ = cheerio.load(data.data);

// href attribute ko extract karna
const downloadLink = $('.download-items__btn a').attr('href');
bot.sendVideo(msg.chat.id, downloadLink, {
reply_to_message_id: msg.message_id})
}
}
})
   /* 
    try {
      bot.sendMessage(msg.chat.id, 'Ruko Download Karke Deta hu 🥱');
      const response = await instagramGetUrl(messageText);
      if (response.url_list.length > 0) {
        await bot.sendVideo(chatId, response.url_list[0]);
      } else {
        bot.sendMessage(chatId, 'Lund nhi mila re video tumhara maiyaa blast kar denge lomdike bhag ja yaha se. Mera dev @NemesisRoy tumhara maiyaa blast karne aarha hai');
      }
    } catch (error) {
      console.error('Error:', error);
      bot.sendMessage(chatId, 'Are code me kuch maiyaa blast hogya. developer ko pakad ke pelo @NemesisRoy');
    }
    */
 }
});
/*
// Function to download Instagram media
async function downloadInstagramMedia(msg) {
    try {
        const link = msg.text;
        // Get shortcode from the link
        const shortcode = link.split('/').filter(Boolean).slice(-1)[0];

        // Download the post
        const post = await L.downloadPost(shortcode, 'downloads');

        // Find the downloaded video file
        const downloadedFiles = glob.sync('downloads/*.mp4');
        if (downloadedFiles.length > 0) {
            const videoFilePath = downloadedFiles[0];
            bot.sendVideo(msg.chat.id, videoFilePath).then(() => {
                fs.unlinkSync(videoFilePath); // Remove the downloaded video file after sending
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Download nahi hua , sorry pookie');
        }
    } catch (error) {
        bot.sendMessage(msg.chat.id, `Failed to download the content: ${error.message}`);
    }
}
*/
