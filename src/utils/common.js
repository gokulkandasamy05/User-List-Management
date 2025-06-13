export const userData = () =>{
    const localstorageData = localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN)
    if(!!localstorageData){
        return JSON.parse(localstorageData)
    }
    return null
}