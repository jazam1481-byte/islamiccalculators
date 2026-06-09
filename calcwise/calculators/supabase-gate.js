// ============================================================
// Supabase Email Capture — islamiccalculators.com
// Saves every email submission to Supabase email_leads table
// ============================================================
(function () {
  var SUPABASE_URL = 'https://jwrbuzkmxnfyhpymbncc.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cmJ1emtteG5meWhweW1ibmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDUyODQsImV4cCI6MjA5NjU4MTI4NH0.NCgrhwqhq3hxv5z5pducSeYAwr_EFiOH3TDBSYLqTug';

  // Detect calculator name from page title or URL
  function getCalculatorName() {
    var title = document.title || '';
    var path = window.location.pathname || '';
    var match = path.match(/\/([^\/]+)\.html/);
    return match ? match[1] : title.split('|')[0].trim() || 'Unknown';
  }

  // Save email to Supabase (fire and forget — never blocks the user)
  function saveToSupabase(email, name) {
    try {
      fetch(SUPABASE_URL + '/rest/v1/email_leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: email,
          calculator_name: getCalculatorName(),
          source_url: window.location.href
        })
      }).catch(function () {}); // silently ignore network errors
    } catch (e) {}
  }

  // Patch the global submitGate function after DOM loads
  // We wrap it so Supabase save runs alongside whatever the page already does
  function patchSubmitGate() {
    var original = window.submitGate;
    window.submitGate = function () {
      var emailEl = document.getElementById('gateEmail');
      var nameEl = document.getElementById('gateName');
      var email = emailEl ? emailEl.value.trim() : '';
      var name = nameEl ? nameEl.value.trim() : '';
      if (email && email.indexOf('@') !== -1) {
        saveToSupabase(email, name);
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
