
const initialState = {
    objects1: [],
    objects2: [],
    objects3: [],
    objects4: []
  };
  
  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_OBJECT':
        return {
          ...state,
          [action.payload.collectionName]: [
            ...state[action.payload.collectionName],
            action.payload.object
          ]
        };
      case 'REMOVE_OBJECT':
        return {
          ...state,
          [action.payload.collectionName]: state[action.payload.collectionName].filter(obj => obj.id !== action.payload.objectId)
        };
      default:
        return state;
    }
  };
  export default reducer;