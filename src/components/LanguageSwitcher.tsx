import { useI18n } from '../i18n'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="language-switcher">
      <label htmlFor="locale-select" className="language-label">
        {t('language')}:
      </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(event) => setLocale(event.target.value as 'pt' | 'en')}
        className="language-select"
      >
        <option value="pt">{t('languagePortuguese')}</option>
        <option value="en">{t('languageEnglish')}</option>
      </select>
    </div>
  )
}
