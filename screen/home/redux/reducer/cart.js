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
      const index = state.item.findIndex( en => en.image === action.data.image);
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


const initialTotalPriceState = {
  totalPrice: 0,
}

export function totalPrice(state = initialTotalPriceState, action) {
  switch (action.type) {
    case 'TOTAL_PRICE':
      return {
        totalPrice: action.data
      }
    default:
      return state;
  }
}