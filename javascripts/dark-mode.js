/* eslint block-scoped-var: "off" */

// required for loading into a NodeJS context
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define([], () => {
  const storedValue = window.sessionStorage.getItem('mode');
  // default to light mode if no stored value found, or stored value is anything else
  let lightModeEnabled = !(storedValue && storedValue === 'dark');

  const root = document.documentElement;

  /**
   * Apply changes to document to put the page into "dark" mode
   *
   * @param {HTMLElement} viewModeElement
   * @param {HTMLElement} viewModeAnchor
   * @param {HTMLElement} logo
   */
  function setDarkMode(viewModeElement, viewModeAnchor, logo) {
    root.style.setProperty('--body-back', '#111111');
    root.style.setProperty('--body-color', '#eeeded');
    root.style.setProperty('--abs', 'rgb(37, 37, 37)');
    root.style.setProperty('--box-shadow-color', 'rgba(7, 58, 97,0.5)');
    root.style.setProperty('--box-back-color', '#333');
    root.style.setProperty('--visiblue', '#94d6ff');
    root.style.setProperty('--back-to-top-back', '#555');
    root.style.setProperty('--back-to-top-color', '#ddd');

    viewModeElement.setAttribute('src', '/images/sun-light.png');
    viewModeAnchor.title = 'light-mode';
    logo.setAttribute('src', '/images/up_for_grabs_logo_long_white.svg');
  }

  /**
   * Apply changes to document to put the page into "light" mode
   *
   * @param {HTMLElement} viewModeElement
   * @param {HTMLElement} viewModeAnchor
   * @param {HTMLElement} logo
   */
  function setLightMode(viewModeElement, viewModeAnchor, logo) {
    root.style.setProperty('--body-back', '#f9f9f9');
    root.style.setProperty('--body-color', '#303030');
    root.style.setProperty('--abs', '#FFF');
    root.style.setProperty('--box-shadow-color', 'rgba(0,0,0,0.2)');
    root.style.setProperty('--box-back-color', '#eee');
    root.style.setProperty('--visiblue', '#2e7ba9');
    root.style.setProperty('--back-to-top-back', '#ddd');
    root.style.setProperty('--back-to-top-color', '#555');

    viewModeElement.setAttribute('src', '/images/Dim-Night.png');
    viewModeAnchor.title = 'dark-mode';
    logo.setAttribute('src', '/images/up_for_grabs_logo_long_blue.svg');
  }

  /**
   * Update the stored value for the current mode
   * @param {"dark" | "light"} value
   */
  function updateValue(value) {
    window.sessionStorage.setItem('mode', value);
    lightModeEnabled = value === 'light';
  }

  function setupDarkModeListener() {
    var r = document.querySelector(':root');
    if (!r) {
      return;
    }

    const viewModeElement = document.getElementById('view-mode');
    if (!viewModeElement) {
      return;
    }

    const viewModeAnchor = document.getElementById('view-mode-a');
    if (!viewModeAnchor) {
      return;
    }

    const logo = document.getElementById('go-back-home-image');
    if(!logo) {
      return;
    }

    if (!lightModeEnabled) {
      setDarkMode(viewModeElement, viewModeAnchor, logo);
    }

    viewModeAnchor.addEventListener('click', () => {
      if (lightModeEnabled) {
        setDarkMode(viewModeElement, viewModeAnchor, logo);
        updateValue('dark');
      } else {
        setLightMode(viewModeElement, viewModeAnchor, logo);
        updateValue('light');
      }
    });
  }

  return setupDarkModeListener;
});
