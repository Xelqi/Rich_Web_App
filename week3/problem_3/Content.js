// Content.js
chrome.storage.sync.get("selectedFont", (data) => {
  if (data.selectedFont) {
    document.body.style.fontFamily = data.selectedFont;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeFont") {
    const selectedFont = message.font;
    document.body.style.fontFamily = selectedFont;
    chrome.storage.sync.set({ selectedFont });
  } else if (message.action === "resetFont") {
    document.body.style.fontFamily = "";
    chrome.storage.sync.remove("selectedFont");
  }
});
