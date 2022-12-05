const pobjednikReducer=(state=null, action)=>{
    switch(action.type){
        case "SET_POBJEDNIK":
            return action.payload
        default:
            return state
    }
}
export default pobjednikReducer

export const setPobjedik=(pobjednik)=>{
    return{
        type:"SET_POBJEDNIK",
        payload:pobjednik
    }
}
 