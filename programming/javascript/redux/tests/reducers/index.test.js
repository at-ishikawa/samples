import reducer from 'reducers';

describe('addText reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        texts: []
      });
  });

  it('should handle ADD_TEXT', () => {
    expect(reducer(undefined, {
      type: 'ADD_TEXT',
      text: 'text'
    }))
      .toEqual({
        texts: [
          'text'
        ]
      });

    expect(reducer({
      texts: [
        'Initial'
      ]
    }, {
      type: 'ADD_TEXT',
      text: 'add text'
    }))
      .toEqual({
        texts: [
          'Initial',
          'add text'
        ]
      });
  });
});
