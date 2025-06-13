const initValues = {
    loading: false
}


const loaderReducer = (state = initValues, action) =>{
    switch (action.type) {
        case 'SET_LOADING_TRUE':
            return { ...state, loading: true }
        case 'SET_LOADING_FALSE':
            return { ...state, loading: false }
        default:
            return state
    }

}

export default loaderReducer