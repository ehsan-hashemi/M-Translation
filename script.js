document.getElementById('translateForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const sourceText = document.getElementById('source_text').value;
  const sourceLang = document.getElementById('source_language').value;
  const targetLang = document.getElementById('target_language').value;

  if (!targetLang) {
    alert("Please select a target language.");
    return;
  }

  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(sourceText)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data[0] && data[0][0]) {
        document.getElementById('translation').innerText = data[0][0][0];
      } else {
        document.getElementById('translation').innerText = "Error: Unable to fetch translation.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('translation').innerText = "Error: " + error;
    });
});

document.getElementById('copyButton').addEventListener('click', function() {
  const translationText = document.getElementById('translation').innerText;
  navigator.clipboard.writeText(translationText).then(() => {
    alert('Translation copied to clipboard!');
  }).catch(err => {
    alert('Error in copying text: ' + err);
  });
});