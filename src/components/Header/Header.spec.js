import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    test('renders without error', () => {
        const header = wrapper.find(`[data-test="component-header"]`);
        expect(header.length).toBe(1);
    });

});