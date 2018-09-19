const Star = (state = { resetCount: 5 }, action) => {
  // console.log(state, 'hien tai');
  switch (action.type) {
    case 'SET_COUNT_RESET':
      return {
        ...state,
        id: action.id,
        resetCount: 5
      };

    case 'GET_COUNT_RESET':
      return {
        ...state,
        id: action.id,
        resetCount: state.resetCount - 1
      };

    default:
      return state;
  }
};

export default resetNumber;
