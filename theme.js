const themeToggleButton = document.getElementById('theme-toggle');
let currentTheme = 'light-blue-theme';

themeToggleButton.addEventListener('click', () => {
    document.body.classList.remove(currentTheme); // Remove the current theme
    if (currentTheme === 'light-blue-theme') {
      currentTheme = 'light-mint-theme'; // Switch to mint green light theme
    } else if (currentTheme === 'light-mint-theme') {
      currentTheme = 'dark-blue-theme'; // Switch to blue dark theme
    } else if (currentTheme === 'dark-blue-theme') {
      currentTheme = 'dark-mint-theme'; // Switch to mint green dark theme
    } else {
      currentTheme = 'light-blue-theme'; // Switch back to blue light theme
    }
    document.body.classList.add(currentTheme); // Add the new theme class to the body
  });