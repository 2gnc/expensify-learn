const totalReducerDefaultState = 0;

export default (state = totalReducerDefaultState, action) => {
    switch (action.type) {
        case 'COUNT_TOTAL':
            return {
                ...state,
                total
            }
        default:
            return state
    }
}
