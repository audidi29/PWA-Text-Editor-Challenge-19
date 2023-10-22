const butInstall = document.getElementById('buttonInstall');

// Store the deferred prompt event
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show your custom "Install" button or UI element
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice (accepted or dismissed)
    const choiceResult = await deferredPrompt.userChoice;

    // Check if the user accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }

    // Reset the deferredPrompt to null
    deferredPrompt = null;

    // Hide the custom "Install" button or UI element
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  // PWA has been successfully installed
  console.log('PWA installed successfully');
  
});