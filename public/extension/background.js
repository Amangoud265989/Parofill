// ParroFill Chrome Extension - Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('[ParroFill Background] Extension installed successfully.');

  // Set initial default candidate profile if none exists
  chrome.storage.local.get(['parrofill_profile'], (result) => {
    if (!result.parrofill_profile) {
      chrome.storage.local.set({
        parrofill_profile: {
          firstName: "Elena",
          lastName: "Rostova",
          email: "elena.rostova@example.com",
          phone: "+1 (555) 234-5678",
          headline: "Senior Full-Stack & Frontend Engineer",
          summary: "Product-minded software engineer with 6+ years building scalable, user-centric web applications and distributed interfaces.",
          city: "Toronto",
          country: "Canada",
          postalCode: "M5V 2T6",
          preferredCurrency: "USD",
          workAuthorization: "Authorized to work in Canada and United States (TN eligible)",
          linkedInUrl: "https://linkedin.com/in/elena-rostova-dev",
          githubUrl: "https://github.com/elena-rostova",
          portfolioUrl: "https://elenarostova.dev",
          skills: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Architecture"],
          defaultResumeName: "Elena_Rostova_Senior_Engineer_2026.pdf"
        },
        installedAt: new Date().toISOString()
      });
    }
  });
});
