import React from "react";
import { render } from "react-dom";
import RecordsDetail from "..";

import { ancestors } from '../../../__fixtures__/ancestors';
import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';


it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
            activeRecords={collectionWithChildHits}
            ancestors={{}}
            isAncestorsLoading={false}
            isContentShown={false}
            isLoading={false}
            params={{}}
            savedList={{}}
            toggleInList={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
          activeRecords={object}
          ancestors={ancestors}
          isAncestorsLoading={false}
          isContentShown={true}
          isLoading={false}
          params={{}}
          savedList={{}}
          toggleInList={function(){}} />, div);
});
