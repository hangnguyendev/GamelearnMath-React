let nextId = 0;
export const setCountReset = resetCount => ({
  type: 'SET_COUNT_RESET',
  id: nextId++,
  resetCount: 5
});
