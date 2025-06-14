
const useLoginData = () => {
    const localstorageData = localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN)
    if (!!localstorageData) {
        const data = JSON.parse(localstorageData)
        return [data]
    }
    return []
}

export default useLoginData