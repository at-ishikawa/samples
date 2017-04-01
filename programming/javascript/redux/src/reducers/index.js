const initialState = {
  texts: [],
};

export default function texts(state = initialState, action) {
  switch (action.type) {
  case 'ADD_TEXT':
    return {
      texts: state.texts.concat([action.text])
    };
  default:
    return state;
  }
};
