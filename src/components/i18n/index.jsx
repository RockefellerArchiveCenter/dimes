import { detect, fromNavigator } from "@lingui/detect-locale";
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { messages as deMessages } from '../../locales/de/messages'
import { messages as enMessages } from '../../locales/en/messages'
import { messages as esMessages } from '../../locales/es/messages'
import { messages as frMessages } from '../../locales/fr/messages'
import { messages as itMessages } from '../../locales/it/messages'
import { messages as jaMessages } from '../../locales/ja/messages'
import { messages as koMessages } from '../../locales/ko/messages'
import { messages as ptMessages } from '../../locales/pt/messages'
import { messages as trMessages } from '../../locales/tr/messages'
import { messages as zhMessages } from '../../locales/zh/messages'

i18n.load({
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
  ja: jaMessages,
  ko: koMessages,
  pt: ptMessages,
  tr: trMessages,
  zh: zhMessages,
});

// Keep <html lang> in sync with the active Lingui locale.
export const syncDocumentLang = locale => {
  if (typeof document === 'undefined' || !locale) return
  document.documentElement.lang = locale
}

// Register before activating so the initial locale is applied and any
// later i18n.activate() call updates it too.
i18n.on('change', () => syncDocumentLang(i18n.locale))

// Set language from browser.
const DEFAULT_FALLBACK = () => "en";
const MESSAGES_LOADED = Object.keys(i18n._messages)
let result = detect(fromNavigator(), DEFAULT_FALLBACK).split('-')[0]
if (!MESSAGES_LOADED.includes(result)) {
  result = DEFAULT_FALLBACK()
}
i18n.activate(result, '')
syncDocumentLang(i18n.locale)

export const I18nApp = ({ReactComponent}) => {
  return (
    <I18nProvider i18n={i18n}>
      {ReactComponent}
    </I18nProvider>
  );
}
