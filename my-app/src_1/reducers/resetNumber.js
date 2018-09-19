const resetNumber = (state = [], action) => {
  switch (action.type) {
    case 'SET_COUNT_RESET':
      return [
        ...state,
        {
          id: action.id,
          resetCount: action.resetCount++
        }
      ];
    default:
      return state;
  }
};

export default resetNumber;
