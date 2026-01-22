import Highlighter from 'react-highlight-words'
import { findChunks } from 'highlight-words-core'
import './styles.scss'

/** Custom function which mimics boolean search behavior
* Only highlights text from a string when all words from search query
* are present in that string.
*/
const findChunksBoolean = ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight
  }) => {
  if (searchWords.every(word => textToHighlight.toLowerCase().includes(word.toLowerCase()))) {
    return findChunks({autoEscape, caseSensitive, sanitize, searchWords, textToHighlight})
  } else {
    return []
  }
}

const QueryHighlighter = ({ query, text }) => {
  const parsedQuery = query ? query.replace(/"([^"]+(?="))"/g, '$1').split(' ') : []
  return (
    <Highlighter
      highlightClassName='query-highlight'
      searchWords={parsedQuery}
      autoEscape
      textToHighlight={text ? text : ''}
      findChunks={findChunksBoolean}
      />
  )
}

export default QueryHighlighter
