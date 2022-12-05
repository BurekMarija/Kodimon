const logsReducer=(state=([]), action)=>{
    switch (action.type){
        case "ADD_LOG":
            return [...state, action.payload]
        case "RESET_LOG":
            return ([])
        default:
            return state
    }
}
export default logsReducer

export const addLog=(newLog)=>{
    return{
        type:"ADD_LOG",
        payload:newLog
    }
}
export const resetLog=()=>{
    return{
        type:"RESET_LOG"
    }
}