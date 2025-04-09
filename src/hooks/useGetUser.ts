import { User } from "firebase/auth";
import { UserInformation } from "../models/UserInformation";

const useGetUser = (): { user: User | null, userInformation: UserInformation | null } => {
    const userData = localStorage.getItem('user')
    let user;

    if(userData)
        user = JSON.parse(userData)

    const userInformationData = localStorage.getItem('userInformation')
    let userInformation;

    if(userInformationData)
        userInformation = JSON.parse(userInformationData)

    return { user, userInformation }
}

export default useGetUser
