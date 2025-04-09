import account_icon from '../assets/account_icon.png'
import { useNavigate } from "react-router"
import { useProfileBox } from '../context/ProfileBoxContextProvider'
import useGetUser from '../hooks/useGetUser'

export const Header = () => {
    return (
        <div className="flex justify-between items-center mt-2 mx-3">
            <div className="w-8" />
            <div>
                <h1 className="text-3xl font-bold font-Lobster">StayFresh</h1>
            </div>
            <UserBtn />
        </div>
    )
}

const UserBtn = () => {
    const { toggleIsOpen } = useProfileBox()

    const { user, userInformation } = useGetUser()
    // const user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

    const navigate = useNavigate();

    return (
        <div>
            { !!!user ?
                <img onClick={() => navigate('/login')} src={account_icon} className="w-8 hover:cursor-pointer" />
                :
                <img className='w-8 h-8 rounded-full hover:cursor-pointer' src={user.photoURL!}
                    onClick={() => toggleIsOpen()}
                />
                // <div onClick={() => {
                //     toggleIsOpen()
                // }} className="w-8 h-8 rounded-full bg-green hover:cursor-pointer"></div>
            }
        </div>
    )
}
