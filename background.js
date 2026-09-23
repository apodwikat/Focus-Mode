// Service Worker for English App Focus Guard Extension

const DOMAINS_TO_BLOCK = [
  "chatgpt.com",
  "openai.com",
  "gemini.google.com",
  "youtube.com",
  "claude.ai",
  "instagram.com",
  "linkedin.com",
  "tiktok.com",
  "telegram.org",
  "web.telegram.org",
  "t.me",
  "whatsapp.com",
  "web.whatsapp.com",
  "kimi.com",
  "kimi.ai",
  "moonshot.cn",
  "deepseek.com"
];

const BLOCK_RULES = DOMAINS_TO_BLOCK.map((domain, index) => ({
  id: 1000 + index + 1,
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: `||${domain}`,
    resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest"]
  }
}));

const RULE_IDS = BLOCK_RULES.map(r => r.id);

// Listen for messages from content script bridge
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TOGGLE_FOCUS_MODE") {
    const isEnabled = !!request.enabled;
    const sessionName = request.sessionName || "Focus Session";
    const durationMinutes = request.durationMinutes || 25;

    if (isEnabled) {
      enableBlocking(sessionName, durationMinutes);
      sendResponse({ status: "ACTIVE", success: true });
    } else {
      disableBlocking();
      sendResponse({ status: "INACTIVE", success: true });
    }
    return true;
  }

  if (request.type === "GET_FOCUS_STATUS") {
    chrome.storage.local.get(["focusActive", "sessionName", "endTime"], (res) => {
      sendResponse(res);
    });
    return true;
  }
});

// On Alarm trigger (auto unblock when timer ends)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "FOCUS_SESSION_EXPIRED") {
    disableBlocking();
  }
});

async function enableBlocking(sessionName, durationMinutes) {
  const endTime = Date.now() + durationMinutes * 60 * 1000;
  await chrome.storage.local.set({
    focusActive: true,
    sessionName,
    endTime
  });

  // Enable dynamic net request blocking rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULE_IDS,
    addRules: BLOCK_RULES
  });

  // Set alarm for auto-unblock when timer finishes
  chrome.alarms.create("FOCUS_SESSION_EXPIRED", { delayInMinutes: durationMinutes });

  console.log("🔒 Focus Mode Activated. Blocked Domains:", DOMAINS_TO_BLOCK);
}

async function disableBlocking() {
  await chrome.storage.local.set({
    focusActive: false,
    sessionName: "",
    endTime: 0
  });

  // Clear alarm
  chrome.alarms.clear("FOCUS_SESSION_EXPIRED");

  // Remove dynamic net request blocking rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULE_IDS
  });

  console.log("🔓 Focus Mode Deactivated. All blocks removed.");
}

// On Startup check reset
chrome.runtime.onInstalled.addListener(() => {
  disableBlocking();
});
