// ParroFill Chrome Extension - Popup Logic

const defaultProfile = {
  firstName: "Aman",
  lastName: "Goud",
  email: "amangoud@example.com",
  phone: "+1 (555) 234-5678",
  headline: "Senior Full-Stack & Frontend Engineer",
  summary: "Product-minded software engineer with 6+ years building scalable, user-centric web applications and distributed interfaces.",
  city: "Toronto",
  country: "Canada",
  postalCode: "M5V 2T6",
  linkedInUrl: "https://linkedin.com/in/amangoud",
  githubUrl: "https://github.com/amangoud",
  portfolioUrl: "https://amangoud.dev",
  workAuthorization: "Authorized to work in Canada and United States (TN eligible)",
  skills: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Architecture"],
  defaultResumeName: "Aman_Goud_Senior_Engineer_2026.pdf"
};

document.addEventListener('DOMContentLoaded', async () => {
  const userNameEl = document.getElementById('userName');
  const userRoleEl = document.getElementById('userRole');
  const fieldsCountBadge = document.getElementById('fieldsCountBadge');
  const fieldsList = document.getElementById('fieldsList');
  const autofillBtn = document.getElementById('autofillBtn');
  const reviewBanner = document.getElementById('reviewBanner');
  const openDashboardLink = document.getElementById('openDashboardLink');
  const syncProfileLink = document.getElementById('syncProfileLink');

  // Load profile from chrome.storage if available
  let candidateProfile = defaultProfile;
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    try {
      const data = await chrome.storage.local.get(['parrofill_profile']);
      if (data && data.parrofill_profile) {
        candidateProfile = data.parrofill_profile;
      }
    } catch (e) {
      console.log('Using default profile in popup context', e);
    }
  }

  // Update UI with candidate profile
  if (userNameEl) userNameEl.textContent = `${candidateProfile.firstName} ${candidateProfile.lastName}`;
  if (userRoleEl) userRoleEl.textContent = candidateProfile.headline;

  // Query active tab and request field detection
  let activeTabId = null;
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.id) {
        activeTabId = tab.id;
        chrome.tabs.sendMessage(activeTabId, { action: 'DETECT_FIELDS' }, (response) => {
          if (chrome.runtime.lastError) {
            fieldsCountBadge.textContent = 'Ready on this page';
            return;
          }
          if (response && response.detectedFields) {
            renderDetectedFields(response.detectedFields);
          }
        });
      }
    } catch (e) {
      console.log('Tab query exception:', e);
    }
  } else {
    fieldsCountBadge.textContent = 'Simulator Mode';
  }

  function renderDetectedFields(fields) {
    if (!fieldsList || !fieldsCountBadge) return;
    fieldsCountBadge.textContent = `${fields.length} Detected`;
    fieldsList.innerHTML = '';
    fields.forEach((f) => {
      const div = document.createElement('div');
      div.className = 'field-tag' + (f.filled ? ' filled' : '');
      div.textContent = f.label;
      fieldsList.appendChild(div);
    });
  }

  // Handle Autofill Action
  if (autofillBtn) {
    autofillBtn.addEventListener('click', async () => {
      autofillBtn.disabled = true;
      autofillBtn.innerHTML = '<span>⚡ Autofilling Page...</span>';

      if (typeof chrome !== 'undefined' && chrome.tabs && activeTabId) {
        chrome.tabs.sendMessage(
          activeTabId,
          {
            action: 'AUTOFILL_PAGE',
            profile: candidateProfile
          },
          (response) => {
            autofillBtn.disabled = false;
            autofillBtn.innerHTML = '<span>✓ Autofill Complete</span>';
            if (reviewBanner) reviewBanner.style.display = 'block';

            if (response && response.detectedFields) {
              renderDetectedFields(response.detectedFields);
            }
          }
        );
      } else {
        setTimeout(() => {
          autofillBtn.disabled = false;
          autofillBtn.innerHTML = '<span>✓ Autofill Complete</span>';
          if (reviewBanner) reviewBanner.style.display = 'block';
        }, 600);
      }
    });
  }

  // Open Dashboard link
  if (openDashboardLink) {
    openDashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: 'https://ais-dev-k7vtg4wf62arivqubuvg6r-488314433943.asia-southeast1.run.app' });
      } else {
        window.open('https://ais-dev-k7vtg4wf62arivqubuvg6r-488314433943.asia-southeast1.run.app', '_blank');
      }
    });
  }

  // Sync profile link
  if (syncProfileLink) {
    syncProfileLink.addEventListener('click', (e) => {
      e.preventDefault();
      syncProfileLink.textContent = 'Syncing...';
      setTimeout(() => {
        syncProfileLink.textContent = '✓ Synced with Vault';
        setTimeout(() => {
          syncProfileLink.textContent = 'Sync Latest Data';
        }, 2000);
      }, 500);
    });
  }
});
