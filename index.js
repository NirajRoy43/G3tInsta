const TelegramBot = require('node-telegram-bot-api');
const Instaloader = require('instaloader');
const fs = require('fs');
const glob = require('glob');

// Initialize Instaloader
const L = new Instaloader();

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
    const message = msg.text;
    if (message.includes('instagram.com')) {
        bot.sendMessage(msg.chat.id, 'Ruko Download Karke Deta hu 🥱');
        await downloadInstagramMedia(msg);
    }
});

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
