// Content Script bridge between website window.postMessage & Chrome Extension Runtime

window.addEventListener("message", (event) => {
  // Only accept messages from same origin/trusted window
  if (event.source !== window) return;

  const data = event.data;
  if (!data || typeof data !== "object") return;

  if (data.type === "EM_PING_EXTENSION") {
    window.postMessage({ type: "EM_FOCUS_EXTENSION_INSTALLED", active: true }, "*");
  }

  if (data.type === "EM_FOCUS_MODE_START") {
    chrome.runtime.sendMessage({
      type: "TOGGLE_FOCUS_MODE",
      enabled: true,
      sessionName: data.timerName || data.sessionName,
      durationMinutes: data.durationMinutes
    }, (response) => {
      window.postMessage({ type: "EM_EXTENSION_STATUS", active: true, response }, "*");
    });
  }

  if (data.type === "EM_FOCUS_MODE_STOP") {
    chrome.runtime.sendMessage({
      type: "TOGGLE_FOCUS_MODE",
      enabled: false
    }, (response) => {
      window.postMessage({ type: "EM_EXTENSION_STATUS", active: false, response }, "*");
    });
  }
});

// Notify page that extension is installed
window.postMessage({ type: "EM_FOCUS_EXTENSION_INSTALLED", active: true }, "*");

