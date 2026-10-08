import { i18n } from '@lingui/core'
import '..'

afterEach(() => {
  i18n.activate('en')
})

it('sets <html lang> on initial load', () => {
  expect(document.documentElement.lang).toBe(i18n.locale)
})

it.each(['de', 'ja', 'pt', 'zh'])('updates <html lang> when locale changes to %s', locale => {
  i18n.activate(locale)
  expect(document.documentElement.lang).toBe(locale)
})
