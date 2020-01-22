import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Action from './Action';

configure({adapter: new Adapter()});

describe('<Action />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Action name={'sleep'} disable={false} />);
    });

    it('should render an enabled button', () => {
        const button = wrapper.find("button");
        expect(button).toHaveLength(1);
        expect(button.text()).toEqual('sleep');
        expect(button.prop('disabled')).toEqual(false);
    });

    it('should render a disabled button', () => {
        wrapper.setProps({disable: true});
        const button = wrapper.find("button");
        expect(button).toHaveLength(1);
        expect(button.prop('disabled')).toEqual(true);
    });

    it('should call onAction on the form submit', () => {
        const action = jest.fn();
        wrapper.setProps({onAction: action});

        const form = wrapper.find("form");

        form.simulate('submit', { preventDefault () {} })
        expect(action).toHaveBeenCalled();
    });
})