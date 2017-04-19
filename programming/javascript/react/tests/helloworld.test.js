import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <span className="heading" onClick={ this.props.spanClick ? this.props.spanClick : null }>Title</span>
      </div>
    );
  }
}

describe('A suite', function() {
  it ('contains', function() {
    expect(shallow(<MyComponent />).contains(<span className="heading" onClick={ null }>Title</span>))
      .toBe(true);
  });

  it ('click', function() {
    const onSpanClick = sinon.spy();
    expect(onSpanClick).toHaveProperty('callCount', 0);
    shallow(<MyComponent spanClick={ onSpanClick } />).find('.heading')
      .simulate('click');
    expect(onSpanClick).toHaveProperty('callCount', 1);
  });
});

/*
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

function MyComponent() {
  return (
      <div>
        <span ref="heading" className="heading">Title</span>
      </div>
  );
}

const renderer = ReactTestUtils.createRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual(
  <span ref="heading" className="heading">Title</span>,
);

ReactTestUtils.Simulate.click(React.addons.TestUtils.renderIntoDocument());
*/
