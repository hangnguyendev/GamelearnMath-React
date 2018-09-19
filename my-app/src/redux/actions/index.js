let nextId = 0;

//Không truyền vào resetCount vì không có biến gì truyền từ ngoài vào
export const setCountReset = () => ({
  type: 'SET_COUNT_RESET',
  id: nextId++
});
export const getCountReset = () => ({
  type: 'GET_COUNT_RESET'
});
export const getChooseNumber = newNumber => ({
  type: 'GET_CHOOSE_NUMBER',
  arrchoosedNumber: [],
  newNumber
});
export const setChooseNumber = () => ({
  type: 'SET_CHOOSE_NUMBER',
  arrchoosedNumber: []
});
// export const setStar = () => ({
//   type: 'SET_STAR'
// });
