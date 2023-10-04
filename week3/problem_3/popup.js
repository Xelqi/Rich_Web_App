// Popup.js
document.addEventListener("DOMContentLoaded", function () {
  const fontSelect = document.getElementById("font");
  const convertButton = document.getElementById("convert");
  const resetButton = document.getElementById("reset");

  fontSelect.addEventListener("change", function () {
    const selectedFont = fontSelect.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeFont",
        font: selectedFont,
      });
    });
  });

  convertButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeFont",
        font: "cursive",
      });
    });
  });

  resetButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "resetFont" });
    });
  });
});
