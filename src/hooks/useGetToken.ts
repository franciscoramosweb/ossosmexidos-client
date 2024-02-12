import { useCookies } from "react-cookie"

export const useGetToken = () =>{
    const [cookies,_] = useCookies(["accessToken"]);
    return {headers:{authorization: cookies.accessToken}}
}