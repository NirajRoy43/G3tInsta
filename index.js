const TelegramBot = require('node-telegram-bot-api');
const instagramGetUrl = require("instagram-url-direct");

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
    bot.sendMessage(msg.chat.id, 'Hello! I can download Instagram reels/stories. Send an Instagram link to download media.');
});

// Detect Instagram links in any message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
if (messageText.includes('instagram.com')) {
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
