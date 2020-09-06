const initialStatePersonalcare = {
    item: [],
};

export function personalcare(state = initialStatePersonalcare, action) {

    switch (action.type) {
        case 'ADD_PERSONALCARE':
            return {
                item: action.data
            };
        case 'RESET_PERSONALCARE':
            return {
                item: []
            }
        default:
            return state;
    }
}

