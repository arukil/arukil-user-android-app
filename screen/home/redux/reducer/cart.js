
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

    case 'BUCKET_RESET':
      return {
        item: []
      };

    default:
      return state;
  }
}




