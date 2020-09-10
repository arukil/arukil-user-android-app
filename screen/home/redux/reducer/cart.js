
const initialBucketState = {
  item: []
}


export function bucket(state = initialBucketState, action) {
  switch (action.type) {
    case 'ADD_TO_BUCKET':
      return {
        ...state,
        item: [...state.item, action.data]
      }
    case 'REMOVE_FROM_BUCKET':
      return {
        item: state.item.filter(function (returnableObjects) {
          return returnableObjects.name !== action.data.name;
        })
      }
    case 'BUCKET_RESET':
      return {
        item: []
      };

    default:
      return state;
  }
}




