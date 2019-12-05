import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Layout />);
    });

    test('renders without error', () => {
        const layout = wrapper.find(`[data-test="component-layout"]`);
        expect(layout.length).toBe(1);
    });

});