// ParroFill Chrome Extension - Content Script
// Detects form fields on job application portals and autofills them safely

(function () {
  console.log('[ParroFill] Job Assistant Extension content script initialized.');

  // Helper to safely dispatch React/Vue/Angular change events
  function setNativeValue(element, value) {
    if (!element) return;
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')
      ? Object.getOwnPropertyDescriptor(element, 'value').set
      : null;

    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')
      ? Object.getOwnPropertyDescriptor(prototype, 'value').set
      : null;

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

  // Get human readable label for any input element
  function getFieldDescriptor(el) {
    let labelText = '';

    // Check associated <label>
    if (el.id) {
      const label = document.querySelector(`label[for="${el.id}"]`);
      if (label) labelText = label.innerText.trim();
    }

    if (!labelText && el.closest('label')) {
      labelText = el.closest('label').innerText.trim();
    }

    if (!labelText && el.getAttribute('aria-label')) {
      labelText = el.getAttribute('aria-label');
    }

    if (!labelText && el.getAttribute('placeholder')) {
      labelText = el.getAttribute('placeholder');
    }

    if (!labelText && el.name) {
      labelText = el.name;
    }

    const nameAttr = (el.name || '').toLowerCase();
    const idAttr = (el.id || '').toLowerCase();
    const placeholder = (el.placeholder || '').toLowerCase();
    const labelLower = labelText.toLowerCase();

    return {
      element: el,
      combinedText: `${labelLower} ${nameAttr} ${idAttr} ${placeholder}`,
      displayLabel: labelText || el.name || 'Application Field',
    };
  }

  // Detect and categorize fillable inputs on the current page
  function scanFormFields() {
    const inputs = Array.from(
      document.querySelectorAll(
        'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select'
      )
    );

    return inputs.map((input) => {
      const desc = getFieldDescriptor(input);
      const str = desc.combinedText;

      let type = 'unknown';

      if (str.includes('first') && (str.includes('name') || str.includes('given') || str.includes('fname'))) {
        type = 'firstName';
      } else if (str.includes('last') && (str.includes('name') || str.includes('family') || str.includes('surname') || str.includes('lname'))) {
        type = 'lastName';
      } else if (str.includes('name') && !str.includes('company') && !str.includes('user') && !str.includes('file')) {
        type = 'fullName';
      } else if (str.includes('email') || str.includes('e-mail')) {
        type = 'email';
      } else if (str.includes('phone') || str.includes('mobile') || str.includes('tel') || str.includes('cell')) {
        type = 'phone';
      } else if (str.includes('city') || str.includes('location') || str.includes('address') || str.includes('residence')) {
        type = 'location';
      } else if (str.includes('country')) {
        type = 'country';
      } else if (str.includes('postal') || str.includes('zip')) {
        type = 'postalCode';
      } else if (str.includes('linkedin')) {
        type = 'linkedInUrl';
      } else if (str.includes('github')) {
        type = 'githubUrl';
      } else if (str.includes('portfolio') || str.includes('website') || str.includes('personal url') || str.includes('link')) {
        type = 'portfolioUrl';
      } else if (str.includes('headline') || str.includes('title')) {
        type = 'headline';
      } else if (str.includes('summary') || str.includes('about you') || str.includes('cover letter') || str.includes('why') || input.tagName === 'TEXTAREA') {
        type = 'customEssay';
      }

      return {
        element: input,
        type,
        label: desc.displayLabel,
        filled: Boolean(input.value && input.value.trim().length > 0),
      };
    });
  }

  // Autofill fields using profile payload
  function autofillPage(profile) {
    if (!profile) return { count: 0 };
    const fields = scanFormFields();
    let filledCount = 0;

    fields.forEach((item) => {
      const el = item.element;
      let targetValue = '';

      switch (item.type) {
        case 'firstName':
          targetValue = profile.firstName || '';
          break;
        case 'lastName':
          targetValue = profile.lastName || '';
          break;
        case 'fullName':
          targetValue = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
          break;
        case 'email':
          targetValue = profile.email || '';
          break;
        case 'phone':
          targetValue = profile.phone || '';
          break;
        case 'location':
          targetValue = `${profile.city || ''}, ${profile.country || ''}`.replace(/^,\s*/, '');
          break;
        case 'country':
          targetValue = profile.country || '';
          break;
        case 'postalCode':
          targetValue = profile.postalCode || '';
          break;
        case 'linkedInUrl':
          targetValue = profile.linkedInUrl || '';
          break;
        case 'githubUrl':
          targetValue = profile.githubUrl || '';
          break;
        case 'portfolioUrl':
          targetValue = profile.portfolioUrl || '';
          break;
        case 'headline':
          targetValue = profile.headline || '';
          break;
        case 'customEssay':
          if (!el.value || el.value.trim().length === 0) {
            targetValue = `With proven experience as ${profile.headline || 'a software professional'}, I bring demonstrated expertise in scalable architectures and cross-functional product execution. I am excited to apply my problem-solving skills to your team's upcoming milestones.`;
          }
          break;
      }

      if (targetValue) {
        setNativeValue(el, targetValue);
        el.classList.add('parrofill-autofilled-field');
        filledCount++;
      }
    });

    // Notify user on-page
    showFloatingFeedbackBanner(filledCount);

    return {
      count: filledCount,
      detectedFields: scanFormFields().map((f) => ({ label: f.label, filled: f.filled })),
    };
  }

  // Floating notification badge on page
  function showFloatingFeedbackBanner(count) {
    let banner = document.getElementById('parrofill-toast-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'parrofill-toast-banner';
      banner.className = 'parrofill-toast';
      document.body.appendChild(banner);
    }

    banner.innerHTML = `
      <div class="parrofill-toast-content">
        <span class="parrofill-parrot-icon">🦜</span>
        <div>
          <strong>ParroFill finished the repetitive work!</strong>
          <div style="font-size: 11px; opacity: 0.9;">Autofilled ${count} application fields. Ready for your review.</div>
        </div>
      </div>
    `;

    banner.style.display = 'block';
    setTimeout(() => {
      if (banner) banner.style.display = 'none';
    }, 4500);
  }

  // Inject floating on-page quick action badge
  function injectFloatingMascotBadge() {
    if (document.getElementById('parrofill-page-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'parrofill-page-badge';
    badge.className = 'parrofill-floating-widget';
    badge.title = 'Click to autofill with ParroFill';

    badge.innerHTML = `
      <div class="parrofill-badge-pill" id="parrofill-badge-btn">
        <span class="parrofill-parrot-emoji">🦜</span>
        <span class="parrofill-badge-text">Autofill with ParroFill</span>
      </div>
    `;

    document.body.appendChild(badge);

    const btn = document.getElementById('parrofill-badge-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        // Try getting profile from storage or fallback
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(['parrofill_profile'], (res) => {
            const p = res && res.parrofill_profile ? res.parrofill_profile : null;
            autofillPage(p || {
              firstName: "Elena",
              lastName: "Rostova",
              email: "elena.rostova@example.com",
              phone: "+1 (555) 234-5678",
              headline: "Senior Full-Stack & Frontend Engineer",
              city: "Toronto",
              country: "Canada",
              linkedInUrl: "https://linkedin.com/in/elena-rostova-dev",
              portfolioUrl: "https://elenarostova.dev"
            });
          });
        } else {
          autofillPage({
            firstName: "Elena",
            lastName: "Rostova",
            email: "elena.rostova@example.com",
            phone: "+1 (555) 234-5678",
            headline: "Senior Full-Stack & Frontend Engineer",
            city: "Toronto",
            country: "Canada",
            linkedInUrl: "https://linkedin.com/in/elena-rostova-dev",
            portfolioUrl: "https://elenarostova.dev"
          });
        }
      });
    }
  }

  // Listen for messages from popup or background service worker
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'DETECT_FIELDS') {
        const fields = scanFormFields().map((f) => ({
          label: f.label,
          type: f.type,
          filled: f.filled,
        }));
        sendResponse({ detectedFields: fields });
      } else if (request.action === 'AUTOFILL_PAGE') {
        const result = autofillPage(request.profile);
        sendResponse(result);
      }
      return true;
    });
  }

  // Initialize floating widget on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFloatingMascotBadge);
  } else {
    injectFloatingMascotBadge();
  }
})();
