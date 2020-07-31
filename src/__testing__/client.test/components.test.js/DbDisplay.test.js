import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import DbDisplay from '../../../../src/client/components/DbDisplay.jsx';


test('Given 3 column table function will produce three rows (one for each column)', () => {
  expect(DbDisplay([{name: 'days'}, {name: 'lid'}, {name: 'meals'}])).toBe({});
});