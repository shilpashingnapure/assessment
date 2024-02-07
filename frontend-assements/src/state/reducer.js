
const initialState = {
    user : {}
}
export const Reducer = (state=initialState , {type , payload}) => {
    switch (type){
        case "USER":
            return {...state , user : {...payload}}
        default:
            return state
    }
} 