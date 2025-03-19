document.getElementById('translateForm').addEventListener('submit', function(e) {
  // جلوگیری از رفتار پیش‌فرض فرم
  e.preventDefault();

  // دریافت مقادیر ورودی‌ها
  const sourceText = document.getElementById('source_text').value;
  const sourceLang = document.getElementById('source_language').value;
  const targetLang = document.getElementById('target_language').value;

  // بررسی اینکه زبان مقصد انتخاب شده باشد
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
        throw new Error('Translation API error');
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