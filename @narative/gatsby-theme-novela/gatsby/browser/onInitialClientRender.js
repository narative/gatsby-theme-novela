/* eslint-disable */

const { globalHistory } = require('@reach/router');

function handleAccessibilityFocus() {
  const elementsWithA11yFocus = [...document.querySelectorAll('[data-a11y]')];

  document.addEventListener('keyup', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'true');
      } else {
        element.setAttribute('data-a11y', 'false');
      }
    });
  });

  // On mouse click change data-a11y attribute false
  document.addEventListener('mousedown', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'false');
      }
    });
  });
}

module.exports = () => {
  localStorage.removeItem('previousPath');

  setTimeout(() => {
    handleAccessibilityFocus();
  }, 1000);

  /**
   * This is a workaround for a bug in Gatsby
   * See https://github.com/gatsbyjs/gatsby/issues/8357 for more details
   */
  globalHistory._onTransitionComplete();
};
