document.getElementById('translateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    fetch('/translate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.translation) {
        document.getElementById('translation').innerText = data.translation;
      } else if (data.error) {
        document.getElementById('translation').innerText = "Error: " + data.error;
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
  
  // مدال‌های Help و About
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  
  document.getElementById('helpLink').addEventListener('click', function(e) {
    e.preventDefault();
    modalBody.innerHTML = "<h2>Help</h2><p>To use this program , enter your translation input text in the Source Text field . Then select your translation input language from the Source Language field . To select a smart language , select the Auto option . Then select the target language from the Target Language field . Then click the Translate button . The output text of your translation is in the Translation Result field and you can copy the output text by clicking the Copy button. © M Translation Version 2.4</p>";
    modal.style.display = "block";
  });
  
  document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();
    modalBody.innerHTML = "<h2>About</h2><p>M Translation<br>Programming Group M<br>Version: 2.4</p>";
    modal.style.display = "block";
  });
  
  closeModal.addEventListener('click', function() {
    modal.style.display = "none";
  });
  
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });  