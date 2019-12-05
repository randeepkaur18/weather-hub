import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });
    
    it('renders without error', () => {
        const app = wrapper.find(`[data-test="component-app"]`);
        expect(app.length).toBe(1);
    });
});