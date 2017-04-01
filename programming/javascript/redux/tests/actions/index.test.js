import * as Actions from 'actions';

describe('actions', () => {
  it('should create an action to add a text', () => {
    const text = 'Text';
    const expected = {
      type: 'ADD_TEXT',
      text: text
    };
    expect(Actions.addText(text)).toEqual(expected);
  });
});
