// نمایش و مدیریت پنجره‌های مدال برای Help و About
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

document.getElementById('helpLink').addEventListener('click', function(e) {
  e.preventDefault();
  modalBody.innerHTML = `
    <h2>Help</h2>
    <p>To use this program, enter your translation input text in the Source Text field. 
    Then select your translation input language from the Source Language field. 
    To select a smart language, select the Auto option. 
    Then select the target language from the Target Language field. 
    Then click the Translate button. 
    The output text of your translation is in the Translation Result field and you can copy the output text by clicking the Copy button.<br> 
    © M Translation Version 2.4</p>`;
  modal.style.display = "block";
});

document.getElementById('aboutLink').addEventListener('click', function(e) {
  e.preventDefault();
  modalBody.innerHTML = `
    <h2>About</h2>
    <p>M Translation<br>Programming Group M<br>Version: 2.4</p>`;
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