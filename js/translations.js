function updateContent() {
  update();
  $("body").localize();
}

i18next
.use(i18nextXHRBackend)
.use(i18nextBrowserLanguageDetector)
.init({
  fallbackLng: 'en',
  debug: true,
  backend: {
    loadPath: 'locales/{{lng}}.json',
  },
}, (err, t) => {
  const languages = [
    ["en", "English"],
    ["zh-CN", "简体中文"],
    ["zh-TW", "繁體中文"],
  ],
  languageSelector = $('#language');
  languages.map(([code, name]) => {
    languageSelector.append(`<option value="${code}"${code == i18next.language ? ' selected' : ''}>${name}</option>`);
  });
  languageSelector.on('change', function () {
    if (this.value == i18next.language)
      return;
    i18next.changeLanguage(this.value);
  });
  jqueryI18next.init(i18next, $);
  i18next.on('languageChanged', lng => {
    if (!languageSelector.find(`[value=${lng}]`).length) {
      i18next.changeLanguage('en');
      return;
    }
    languageSelector.val(lng);
    updateContent();
  });
  // init set content
  $(document).ready(initialize);
  $(document).on("input", updateContent);
  $('input[type = radio]').on("change", updateContent);
});
