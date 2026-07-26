// ============================================================
// Email Capture — islamiccalculators.com
// Saves every email submission to a Google Sheet via Apps Script
// ============================================================
(function () {
  var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxyfr_TrcSNQa2X7gg-IjOIb1havL0oECAqVYgBzVxJxwfdHHeQobYquVTCJpnysAgBLQ/exec';

  // Detect calculator name from page title or URL
  function getCalculatorName() {
    var title = document.title || '';
    var path = window.location.pathname || '';
    var match = path.match(/\/([^\/]+)\.html/);
    return match ? match[1] : title.split('|')[0].trim() || 'Unknown';
  }

  // Save email to Google Sheet (fire and forget — never blocks the user)
  function saveToSheet(email, name) {
    try {
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Apps Script doesn't return CORS headers; we don't need to read the response
        headers: {
          'Content-Type': 'text/plain' // avoids a CORS preflight, which Apps Script webapps don't handle
        },
        body: JSON.stringify({
          email: email,
          calculator: getCalculatorName(),
          source: window.location.href
        })
      }).catch(function () {}); // silently ignore network errors
    } catch (e) {}
  }

  // Patch the global submitGate function after DOM loads
  // We wrap it so the Sheet save runs alongside whatever the page already does
  function patchSubmitGate() {
    var original = window.submitGate;
    window.submitGate = function () {
      var emailEl = document.getElementById('gateEmail');
      var nameEl = document.getElementById('gateName');
      var email = emailEl ? emailEl.value.trim() : '';
      var name = nameEl ? nameEl.value.trim() : '';
      if (email && email.indexOf('@') !== -1) {
        saveToSheet(email, name);
      }
      if (typeof original === 'function') {
        return original.apply(this, arguments);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchSubmitGate);
  } else {
    // DOMContentLoaded already fired — patch immediately but after
    // the inline script has had a chance to define submitGate
    setTimeout(patchSubmitGate, 0);
  }
})();
