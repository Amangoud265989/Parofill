import JSZip from 'jszip';
import { UserProfile } from '../types';

export async function downloadExtensionZip(profile: UserProfile): Promise<void> {
  const zip = new JSZip();

  const manifest = {
    manifest_version: 3,
    name: "ParroFill — AI Job Application Autofill & Assistant",
    version: "1.0.0",
    description: "Autofill job application forms on Workday, Greenhouse, Lever, LinkedIn, Indeed, and more with 1 click using your verified ParroFill profile.",
    icons: {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    },
    action: {
      default_popup: "popup.html",
      default_icon: "icon.png",
      default_title: "ParroFill Job Autofill"
    },
    permissions: [
      "activeTab",
      "storage",
      "scripting"
    ],
    host_permissions: [
      "<all_urls>"
    ],
    background: {
      "service_worker": "background.js"
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.js"],
        css: ["content.css"],
        run_at: "document_idle"
      }
    ],
    web_accessible_resources: [
      {
        resources: ["icon.png", "icon.svg"],
        matches: ["<all_urls>"]
      }
    ]
  };

  const popupHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ParroFill Extension</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { width: 360px; background: #fbfbfc; color: #0f172a; padding: 16px; font-size: 13px; }
    .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; margin-bottom: 14px; }
    .brand { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800; color: #0f172a; }
    .brand span { color: #059669; }
    .sync-status { display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 3px 8px; border-radius: 6px; border: 1px solid #a7f3d0; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
    .profile-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; margin-bottom: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .profile-card-header { font-size: 10px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; display: flex; justify-content: space-between; }
    .profile-name { font-size: 13px; font-weight: 700; color: #0f172a; }
    .profile-role { font-size: 11px; color: #64748b; }
    .detection-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 14px; }
    .detection-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .detection-title { font-weight: 700; font-size: 12px; color: #1e293b; }
    .fields-count { background: #ecfdf5; color: #065f46; font-weight: 700; font-size: 11px; padding: 2px 7px; border-radius: 4px; }
    .fields-list { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; max-height: 90px; overflow-y: auto; }
    .field-tag { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 3px 6px; border-radius: 5px; font-size: 10px; color: #334155; }
    .field-tag.filled { background: #ecfdf5; border-color: #6ee7b7; color: #065f46; font-weight: 600; }
    .btn-autofill { width: 100%; background: #059669; color: #ffffff; border: none; border-radius: 10px; padding: 12px; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.25); }
    .btn-autofill:hover { background: #047857; }
    .review-banner { margin-top: 10px; padding: 8px 10px; border-radius: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 11px; line-height: 1.4; display: none; }
    .helper-text { font-size: 11px; color: #64748b; text-align: center; margin-top: 8px; }
    .footer-links { display: flex; justify-content: space-between; margin-top: 14px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 11px; }
    .footer-links a { color: #059669; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">🦜 Parro<span>Fill</span></div>
    <div class="sync-status"><div class="dot"></div><span>Synced</span></div>
  </div>
  <div class="profile-card">
    <div class="profile-card-header"><span>Active Profile</span><span>Verified</span></div>
    <div class="profile-name" id="userName">${profile.firstName} ${profile.lastName}</div>
    <div class="profile-role" id="userRole">${profile.headline}</div>
  </div>
  <div class="detection-box">
    <div class="detection-header">
      <div class="detection-title">Job Form Fields</div>
      <div class="fields-count" id="fieldsCountBadge">Ready on Tab</div>
    </div>
    <div class="fields-list" id="fieldsList">
      <div class="field-tag">First Name</div>
      <div class="field-tag">Last Name</div>
      <div class="field-tag">Email</div>
      <div class="field-tag">Phone</div>
      <div class="field-tag">LinkedIn</div>
      <div class="field-tag">Resume</div>
      <div class="field-tag">Custom Questions</div>
    </div>
  </div>
  <button class="btn-autofill" id="autofillBtn"><span>⚡ 1-Click Autofill Form</span></button>
  <div class="review-banner" id="reviewBanner">
    <strong>ParroFill finished the repetitive work!</strong><br>Review populated fields before submitting.
  </div>
  <div class="helper-text">Human-in-the-loop: Zero blind submissions.</div>
  <div class="footer-links">
    <a href="https://ais-dev-k7vtg4wf62arivqubuvg6r-488314433943.asia-southeast1.run.app" target="_blank">Open Cloud Dashboard</a>
    <a href="#" id="syncProfileLink">Refresh Profile</a>
  </div>
  <script src="popup.js"></script>
</body>
</html>`;

  const popupJs = `const userProfile = ${JSON.stringify(profile, null, 2)};

document.addEventListener('DOMContentLoaded', async () => {
  const autofillBtn = document.getElementById('autofillBtn');
  const reviewBanner = document.getElementById('reviewBanner');
  const fieldsCountBadge = document.getElementById('fieldsCountBadge');
  const fieldsList = document.getElementById('fieldsList');

  let activeTabId = null;
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      activeTabId = tab.id;
      chrome.tabs.sendMessage(activeTabId, { action: 'DETECT_FIELDS' }, (response) => {
        if (response && response.detectedFields) {
          fieldsCountBadge.textContent = response.detectedFields.length + ' Detected';
          fieldsList.innerHTML = '';
          response.detectedFields.forEach(f => {
            const d = document.createElement('div');
            d.className = 'field-tag' + (f.filled ? ' filled' : '');
            d.textContent = f.label;
            fieldsList.appendChild(d);
          });
        }
      });
    }
  }

  if (autofillBtn) {
    autofillBtn.addEventListener('click', () => {
      autofillBtn.disabled = true;
      autofillBtn.innerHTML = '<span>⚡ Autofilling Page...</span>';
      if (typeof chrome !== 'undefined' && chrome.tabs && activeTabId) {
        chrome.tabs.sendMessage(activeTabId, { action: 'AUTOFILL_PAGE', profile: userProfile }, (resp) => {
          autofillBtn.disabled = false;
          autofillBtn.innerHTML = '<span>✓ Autofill Complete</span>';
          if (reviewBanner) reviewBanner.style.display = 'block';
        });
      } else {
        setTimeout(() => {
          autofillBtn.disabled = false;
          autofillBtn.innerHTML = '<span>✓ Autofill Complete</span>';
          if (reviewBanner) reviewBanner.style.display = 'block';
        }, 500);
      }
    });
  }
});`;

  const contentJs = `(function () {
  console.log('[ParroFill Extension] Active on this page.');

  function setNativeValue(element, value) {
    if (!element) return;
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  function getFieldDescriptor(el) {
    let labelText = '';
    if (el.id) {
      const label = document.querySelector('label[for="' + el.id + '"]');
      if (label) labelText = label.innerText.trim();
    }
    if (!labelText && el.closest('label')) labelText = el.closest('label').innerText.trim();
    if (!labelText && el.getAttribute('aria-label')) labelText = el.getAttribute('aria-label');
    if (!labelText && el.getAttribute('placeholder')) labelText = el.getAttribute('placeholder');
    if (!labelText && el.name) labelText = el.name;

    const combined = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '') + ' ' + labelText).toLowerCase();
    return { element: el, combinedText: combined, displayLabel: labelText || el.name || 'Field' };
  }

  function scanFormFields() {
    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select'));
    return inputs.map(input => {
      const desc = getFieldDescriptor(input);
      const str = desc.combinedText;
      let type = 'unknown';

      if (str.includes('first') && (str.includes('name') || str.includes('fname'))) type = 'firstName';
      else if (str.includes('last') && (str.includes('name') || str.includes('lname'))) type = 'lastName';
      else if (str.includes('name') && !str.includes('company')) type = 'fullName';
      else if (str.includes('email')) type = 'email';
      else if (str.includes('phone') || str.includes('mobile') || str.includes('tel')) type = 'phone';
      else if (str.includes('city') || str.includes('location') || str.includes('address')) type = 'location';
      else if (str.includes('country')) type = 'country';
      else if (str.includes('linkedin')) type = 'linkedInUrl';
      else if (str.includes('github')) type = 'githubUrl';
      else if (str.includes('portfolio') || str.includes('website') || str.includes('url')) type = 'portfolioUrl';
      else if (str.includes('headline') || str.includes('title')) type = 'headline';
      else if (str.includes('why') || str.includes('cover') || input.tagName === 'TEXTAREA') type = 'customEssay';

      return { element: input, type, label: desc.displayLabel, filled: Boolean(input.value && input.value.trim().length > 0) };
    });
  }

  function autofillPage(profile) {
    if (!profile) return { count: 0 };
    const fields = scanFormFields();
    let filledCount = 0;

    fields.forEach(item => {
      const el = item.element;
      let targetValue = '';

      switch (item.type) {
        case 'firstName': targetValue = profile.firstName || ''; break;
        case 'lastName': targetValue = profile.lastName || ''; break;
        case 'fullName': targetValue = ((profile.firstName || '') + ' ' + (profile.lastName || '')).trim(); break;
        case 'email': targetValue = profile.email || ''; break;
        case 'phone': targetValue = profile.phone || ''; break;
        case 'location': targetValue = ((profile.city || '') + ', ' + (profile.country || '')).replace(/^,\\s*/, ''); break;
        case 'country': targetValue = profile.country || ''; break;
        case 'linkedInUrl': targetValue = profile.linkedInUrl || ''; break;
        case 'githubUrl': targetValue = profile.githubUrl || ''; break;
        case 'portfolioUrl': targetValue = profile.portfolioUrl || ''; break;
        case 'headline': targetValue = profile.headline || ''; break;
        case 'customEssay':
          if (!el.value || el.value.trim().length === 0) {
            targetValue = 'With proven expertise as ' + (profile.headline || 'a software professional') + ', I focus on high-quality product delivery, scalable systems, and continuous improvement. I am excited about the opportunity to contribute to your team goals.';
          }
          break;
      }

      if (targetValue) {
        setNativeValue(el, targetValue);
        el.classList.add('parrofill-autofilled-field');
        filledCount++;
      }
    });

    showToast(filledCount);
    return { count: filledCount, detectedFields: scanFormFields().map(f => ({ label: f.label, filled: f.filled })) };
  }

  function showToast(count) {
    let t = document.getElementById('parrofill-toast-banner');
    if (!t) {
      t = document.createElement('div');
      t.id = 'parrofill-toast-banner';
      t.className = 'parrofill-toast';
      document.body.appendChild(t);
    }
    t.innerHTML = '<div class="parrofill-toast-content"><span class="parrofill-parrot-icon">🦜</span><div><strong>ParroFill finished the repetitive work!</strong><div style="font-size:11px;opacity:0.9;">Autofilled ' + count + ' fields. Ready for review.</div></div></div>';
    t.style.display = 'block';
    setTimeout(() => { if (t) t.style.display = 'none'; }, 4500);
  }

  function injectBadge() {
    if (document.getElementById('parrofill-page-badge')) return;
    const b = document.createElement('div');
    b.id = 'parrofill-page-badge';
    b.className = 'parrofill-floating-widget';
    b.innerHTML = '<div class="parrofill-badge-pill" id="parrofill-badge-btn"><span class="parrofill-parrot-emoji">🦜</span><span>Autofill with ParroFill</span></div>';
    document.body.appendChild(b);
    document.getElementById('parrofill-badge-btn')?.addEventListener('click', () => {
      chrome.storage?.local?.get(['parrofill_profile'], (res) => {
        autofillPage(res?.parrofill_profile || ${JSON.stringify(profile)});
      });
    });
  }

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      if (req.action === 'DETECT_FIELDS') sendResponse({ detectedFields: scanFormFields().map(f => ({ label: f.label, filled: f.filled })) });
      else if (req.action === 'AUTOFILL_PAGE') sendResponse(autofillPage(req.profile));
      return true;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectBadge);
  else injectBadge();
})();`;

  const contentCss = `/* ParroFill Content Styles */
.parrofill-autofilled-field {
  border-color: #10b981 !important;
  background-color: #f0fdf4 !important;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
}
.parrofill-floating-widget {
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 2147483640 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}
.parrofill-badge-pill {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #0f172a !important;
  color: #ffffff !important;
  padding: 10px 16px !important;
  border-radius: 9999px !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
  cursor: pointer !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  border: 1.5px solid #10b981 !important;
}
.parrofill-toast {
  position: fixed !important;
  top: 24px !important;
  right: 24px !important;
  z-index: 2147483645 !important;
  background: #0f172a !important;
  color: #ffffff !important;
  border: 1px solid #10b981 !important;
  border-radius: 12px !important;
  padding: 14px 18px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
  display: none;
}
.parrofill-toast-content {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  font-size: 13px !important;
}`;

  const backgroundJs = `chrome.runtime.onInstalled.addListener(() => {
  console.log('[ParroFill Background] Extension active.');
  chrome.storage.local.set({
    parrofill_profile: ${JSON.stringify(profile)},
    installedAt: new Date().toISOString()
  });
});`;

  const readmeMd = `# ParroFill — AI Job Application Autofill Extension

## How to Install in Google Chrome, Brave, Edge, or Arc:

1. **Unzip this archive** to a folder on your computer (e.g. \`Downloads/parrofill-extension\`).
2. Open Google Chrome and navigate to:
   \`chrome://extensions\`
3. In the top-right corner, turn ON the **"Developer mode"** toggle switch.
4. In the top-left corner, click the **"Load unpacked"** button.
5. Select the unzipped folder containing \`manifest.json\`.
6. Done! The ParroFill parrot icon is now in your browser toolbar.

## How to Autofill:
1. Open any job application on **Workday, Greenhouse, Lever, Ashby, LinkedIn, Indeed**, or any company career page.
2. Click the **ParroFill extension icon** (or the on-page floating parrot badge).
3. Click **"1-Click Autofill Form"**.
4. ParroFill immediately populates your verified name, email, phone, location, links, experience, and custom answers.
5. Review the highlighted fields and submit!`;

  // Fetch icon bytes or add SVG
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  zip.file("popup.html", popupHtml);
  zip.file("popup.js", popupJs);
  zip.file("content.js", contentJs);
  zip.file("content.css", contentCss);
  zip.file("background.js", backgroundJs);
  zip.file("README.md", readmeMd);

  // Read the existing icon.png from public if available
  try {
    const iconRes = await fetch('/extension/icon.png');
    if (iconRes.ok) {
      const blob = await iconRes.blob();
      zip.file("icon.png", blob);
    }
  } catch (e) {
    console.log('Using default icon fallback');
  }

  // Generate ZIP
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ParroFill-Chrome-Extension-v1.0.0.zip";
  a.click();
  URL.revokeObjectURL(url);
}
