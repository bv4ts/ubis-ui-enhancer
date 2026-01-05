
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleEnhancer');
    const status = document.getElementById('statusText');
  
    // Use 'local' storage to match content.js
    chrome.storage.local.get(['enhancerEnabled'], res => {
      const enabled = res.enhancerEnabled !== false; // Default to true if undefined
      toggle.checked = enabled;
      updateStatus(enabled);
    });
  
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;
      chrome.storage.local.set({ enhancerEnabled: isEnabled }, () => {
        updateStatus(isEnabled);
        
        // Reload active tab to apply changes
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('ubis.aydin.edu.tr')) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
      });
    });
    
    function updateStatus(enabled) {
        status.textContent = enabled ? "Active" : "Disabled";
        status.style.color = enabled ? "#16a34a" : "#64748b";
    }
  });
