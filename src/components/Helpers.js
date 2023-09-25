import queryString from 'query-string'
import { t, plural } from '@lingui/macro'

/** Returns a string from a date object or string */
export const dateString = dates => {
  return dates && typeof (dates) === 'string' ? dates : dates && dates.map(d => d.expression).join(', ')
}

/** Boolean indicator for the presence of access and use notes */
export const hasAccessOrUse = notes => {
  const access = notes && notes.filter(n => { return n.type === 'accessrestrict' }).length
  const use = notes && notes.filter(n => { return n.type === 'userestrict' }).length
  return access || use
}

/** Returns text for a given note */
export const noteText = note => {
  return note.subnotes.map(s => s.content).join('\r')
}

/** Returns text for a specific note (or notes) by type */
export const noteTextByType = (notes, noteType) => {
  let filteredNotes = notes && notes.filter(n => { return n.type === noteType })
  return filteredNotes ? filteredNotes.map(note => note.subnotes.map(s => s.content)).join('\r') : null
}

/** Adds params (passed as an object) to a URL */
export const appendParams = (url, params) => {
  return `${url}?${queryString.stringify(params)}`
}

/** Returns a date formatted as mm/dd/yyyy */
export const getFormattedDate = date => {
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}

/** Returns a human readable representation of bytes */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/** Returns a human readable representation of a number of matches **/
export const formatMatchString = (hitCount, online) => {  
  const count = hitCount === 10000 ? `${hitCount}+` : hitCount
  const physicalMatch = t({
    comment: 'Pluralization of match(es)',
    message: plural(hitCount, {one: 'match', other: 'matches'})
  })
  const digitalMatch = t({
    comment: 'Pluralization of digital match(es)',
    message: plural(hitCount, {one: 'digital match', other: 'digital matches'})
  })
  const suffix = (online ? digitalMatch : physicalMatch)
  return `${count} ${suffix}`
}

/** Trims a string to a specified length */
export const truncateString = (text, maxLength) => {
  if (text) {
    if (text.length < maxLength) {
      return text
    }
    if (text.indexOf(' ', maxLength) > 0) {
      return text.substr(0, text.indexOf(' ', maxLength)) + '...'
    } else {
      return text + '...'
    }
  } else {
    return null
  }
}

/** Sends a custom pageview event to Matomo Tag Manager.
* This allows us to ensure that the correct page titles are sent.  */
var done = false
var prevTitle = ''
export const firePageViewEvent = title => {
  if (title && title !== prevTitle) {
    done = false
  }
  if (title && !done) {
    if (window && window._mtm) {
      let dataLayer = window._mtm || [];
      dataLayer.push({
        'event': 'reactPageViewEvent'
      });
      done = true
      prevTitle = title
    }
  }
}