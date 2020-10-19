import React from 'react';
import {render} from 'react-dom';
import QueryHighlighter from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<QueryHighlighter />, div);
});
