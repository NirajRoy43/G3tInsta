import os
from pyrogram import Client, filters
import instaloader
import glob

# Instaloader Initialize karenge 
L = instaloader.Instaloader()

# API Values 
API_TOKEN = os.getenv("TELEGRAM_API_TOKEN")
API_ID = os.getenv("TELEGRAM_API_ID")
API_HASH = os.getenv("TELEGRAM_API_HASH")

# Initialize Pyrogram client
app = Client("insta_bot", bot_token=API_TOKEN, api_id=API_ID, api_hash=API_HASH)

# Command: /start
@app.on_message(filters.command("start"))
def start(client, message):
    message.reply_text("Hello! I can download Instagram reels/stories. Send an Instagram link to download media.")

# Detect Instagram links in any message
@app.on_message(filters.text & filters.private)
def handle_instagram_link(client, message):
    if "instagram.com" in message.text:
        message.reply_text("Ruko Download Karke Deta hu 🥱")
        download_instagram_media(client, message)

# Function to download Instagram media
def download_instagram_media(client, message):
    link = message.text
    try:
        # Get shortcode from the link
        shortcode = link.split("/")[-2]
        post = instaloader.Post.from_shortcode(L.context, shortcode)

        # Create a directory for downloads if it doesn't exist
        download_dir = "downloads"
        if not os.path.exists(download_dir):
            os.makedirs(download_dir)

        # Download the post
        L.download_post(post, target=download_dir)
        
        # Find the downloaded video file
        downloaded_files = glob.glob(os.path.join(download_dir, "*.mp4"))
        if downloaded_files:
            video_file_path = downloaded_files[0]
            message.reply_video(video=video_file_path)
            os.remove(video_file_path)
        else:
            message.reply_text("Download nahi hua , sorry pookie ")
    except Exception as e:
        message.reply_text(f"Failed to download the content: {str(e)}")

# Start the bot
app.run()
