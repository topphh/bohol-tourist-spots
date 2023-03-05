document.addEventListener('DOMContentLoaded', () => {
    try {
      const textbox = document.getElementById('search-box');
      const tooltip = document.getElementById('tooltip');
  
      // Listen for changes to the text box
      textbox.addEventListener('input', () => {
        // Check if the text box is empty
        if (textbox.value.trim() === '') {
          // Remove the tooltip glow class
          tooltip.classList.remove('tooltip-glow');
        } else {
          // Add the tooltip glow class
          tooltip.classList.add('tooltip-glow');
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
  