const arrayNumber = (state = { arrchoosedNumber: [] }, action) => {
  // console.log(state.arrchoosedNumber, 'arrchoosedNumber');
  switch (action.type) {
    case 'GET_CHOOSE_NUMBER':
      return {
        arrchoosedNumber: [...state.arrchoosedNumber, ...action.newNumber]

        // lay du lieu mang cu noi voi mang moi
      };
    case 'SET_CHOOSE_NUMBER':
      return {
        arrchoosedNumber: []
      };
    default:
      return state;
  }
};

export default arrayNumber;
