import _ from "lodash";

const initialBucketState = {
  item: [],
}

export function bucket(state = initialBucketState, action) {
  switch (action.type) {
    case 'ADD_TO_BUCKET':
      return {
        ...state,
        item: [...state.item, action.data]
      }
    case 'UPDATE_TO_BUCKET':
      const index = state.item.findIndex(e => e.image === action.data.image);
      const newArray = [...state.item]
      newArray[index] = action.data;
      return {
        ...state,
        item: newArray
      }

    case 'REMOVE_FROM_BUCKET':
      return {
        item: state.item.filter((returnableObjects) => {
          return returnableObjects.image !== action.data.image;
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


const initialTotalPWState = {
  pw:{}
}

export function twp(state = initialTotalPWState, action) {
  switch (action.type) {
    case 'TOTAL_WEIGHT_PRICE':
      return {
        pw: action.data
      }
    default:
      return state;
  }
}