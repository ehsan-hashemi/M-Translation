document.getElementById('translateForm').addEventListener('submit', function(e) {
  // جلوگیری از رفتار پیش‌فرض فرم
  e.preventDefault();

  // دریافت مقادیر ورودی‌ها
  const sourceText = document.getElementById('source_text').value.trim();
  const sourceLang = document.getElementById('source_language').value;
  const targetLang = document.getElementById('target_language').value;

  // بررسی اینکه متن وارد شده و زبان مقصد انتخاب شده باشند
  if (!sourceText) {
    alert("Please enter text to translate.");
    return;
  }
  if (!targetLang) {
    alert("Please select a target language.");
    return;
  }

  // ساخت URL برای API ترجمه
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(sourceText)}`;

  // ارسال درخواست به API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching translation');
      }
      return response.json();
    })
    .then(data => {
      // نمایش نتیجه ترجمه
      if (data && data[0] && data[0][0]) {
        document.getElementById('translation').innerText = data[0][0][0];
      } else {
        document.getElementById('translation').innerText = "Error: Unable to fetch translation.";
      }
    })
    .catch(error => {
      // مدیریت خطاها
      console.error('Error:', error);
      document.getElementById('translation').innerText = "Error: " + error;
    });
});

// متغیرهای مرتبط با مدال‌ها
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

// عملکرد دکمه Help
document.getElementById('helpLink').addEventListener('click', function(e) {
  e.preventDefault();
  // نمایش محتوای Help در مدال
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

// عملکرد دکمه About
document.getElementById('aboutLink').addEventListener('click', function(e) {
  e.preventDefault();
  // نمایش محتوای About در مدال
  modalBody.innerHTML = `
    <h2>About</h2>
    <p>M Translation<br>Programming Group M<br>Version: 2.4</p>`;
  modal.style.display = "block";
});

// عملکرد بستن مدال
closeModal.addEventListener('click', function() {
  modal.style.display = "none";
});

// بستن مدال وقتی کاربر خارج از آن کلیک کند
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});