from flask import Flask, render_template, request, jsonify
from googletrans import Translator
import os

app = Flask(__name__)
translator = Translator()

# لیست زبان‌های پشتیبانی شده (می‌توانید آن را گسترش دهید)
supported_languages = {
    "Persian": "fa",
    "English": "en",
    "Arabic": "ar",
    "Chinese (Simplified)": "zh-cn",
    "Korean": "ko",
    "French": "fr",
    "Italian": "it",
    "Japanese": "ja"
}

@app.route('/')
def index():
    return render_template('index.html', supported_languages=supported_languages)

@app.route('/translate', methods=['POST'])
def translate_text():
    source_text = request.form.get('source_text', '')
    source_lang = request.form.get('source_language', 'Auto')
    target_lang = request.form.get('target_language', '')
    if target_lang not in supported_languages.values():
        return jsonify({"error": "Please select a valid target language"}), 400

    # اگر زبان مبدا "Auto" باشد، تشخیص زبان انجام می‌شود
    if source_lang == 'Auto':
        detected_lang = translator.detect(source_text).lang
    else:
        detected_lang = source_lang

    try:
        translation = translator.translate(source_text, src=detected_lang, dest=target_lang)
        return jsonify({"translation": translation.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)