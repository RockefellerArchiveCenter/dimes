import React from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";


const QueryHighlighter = ({ query, text}) => {
  const parsedQuery = query ? query.split(" ") : []
  return (
    <Highlighter
        highlightClassName="query-highlight"
        searchWords={parsedQuery}
        autoEscape={true}
        textToHighlight={text ? text : ""}
      />
    )
  }

QueryHighlighter.propTypes = {
  query: PropTypes.string,
  text: PropTypes.string,
}

export default QueryHighlighter;
