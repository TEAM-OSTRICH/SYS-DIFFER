const initialState = {

  fileText: '',

};

export default function mainReducers(state = initialState, action) {
  switch (action.type) {
    case 'FILETEXT':

      return Object.assign({}, state, {

        fileText: action.fileText,

      });

    default:

      return state;
  }
}
