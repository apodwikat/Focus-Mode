# Focus-Mode Chrome Extension

This Chrome Extension pairs directly with your Web Focus Mode application to automatically block distracting websites and AI tools whenever a focus session is active.

---

## 🚀 Easy 1-Click Installation (Chrome Web Store)

1. Open the [Focus-Mode Chrome Web Store Page](#) *(Replace link once published)*.
2. Click **"Add to Chrome"**.
3. Confirm by clicking **"Add Extension"**.
4. That's it! Focus-Mode will automatically connect with your web app.

---

## 🚫 Blocked Sites During Active Focus Session

When a session is active, the extension blocks:
1. **AI Assistant Tools**: ChatGPT (`chatgpt.com`), Gemini (`gemini.google.com`), Claude (`claude.ai`), Kimi AI (`kimi.ai`, `kimi.com`, `moonshot.cn`), DeepSeek (`deepseek.com`).
2. **Social Media & Messaging**: Instagram (`instagram.com`), TikTok (`tiktok.com`), LinkedIn (`linkedin.com`), Telegram (`telegram.org`, `web.telegram.org`, `t.me`), WhatsApp Web (`whatsapp.com`, `web.whatsapp.com`), YouTube (`youtube.com`).

---

## ⚡ Seamless Automatic Workflow

1. Open your Web App Focus Mode screen.
2. Select your focus duration and click **Start Focus**.
3. The extension automatically detects session start and blocks distracting sites across all Chrome tabs.
4. When the session timer finishes or you stop the timer, site blocking automatically turns off.

---

## 🛠️ Developer Setup & Store Packaging

If you are modifying source code or preparing a release build for Chrome Web Store:

1. **Test Locally**:
   - Open `chrome://extensions` in Chrome.
   - Enable **Developer mode** toggle.
   - Click **Load unpacked** and select the root directory of this repository (`Focus-Mode`).

2. **Publish to Chrome Web Store**:
   - Zip the root contents of this folder (exclude `.git` / `.github` if any):
     ```bash
     zip -r focus-mode-extension.zip manifest.json background.js content.js
     ```
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
   - Upload `focus-mode-extension.zip` and submit for review.
