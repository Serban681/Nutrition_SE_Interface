import { ReactSVG } from "react-svg";
import close_icon from "../assets/close_icon.svg"
import { useProfileBox } from "../context/ProfileBoxContextProvider";
import { SmalllButton } from "./Button";
import useGetUser from "../hooks/useGetUser";

export default function ProfileBox() {
    const { isOpen, toggleIsOpen } = useProfileBox()

    const { user, userInformation } = useGetUser()

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userInformation')
        window.location.reload()
    }

    if(isOpen) 
        return (
            <div className={`absolute ${isOpen ? 'block' : 'none'} z-50 top-2 px-2 py-1 right-2 w-56 h-60 bg-white shadow border-2 rounded-lg`}>
                <ReactSVG onClick={toggleIsOpen} className="absolute top-1 right-1 hover:scale-110 hover:cursor-pointer" src={close_icon} />
            
                <p><span className="text-sm font-bold">Name:</span> {user?.displayName}</p>
                <p><span className="text-sm font-bold">Activity Level:</span> {userInformation?.activity_level}</p>
                <p><span className="text-sm font-bold">Age:</span> {userInformation?.age}</p>
                <p><span className="text-sm font-bold">Gender:</span> {userInformation?.gender}</p>
                <p><span className="text-sm font-bold">Goal:</span> {userInformation?.goal}</p>
                <p><span className="text-sm font-bold">Height:</span> {userInformation?.height}cm</p>
                <p><span className="text-sm font-bold">Weight:</span> {userInformation?.weight}kg</p>

                <SmalllButton extraStyles="absolute bottom-2 left-2" name="Log Out" onClick={() => logOut()} />
            </div>
        )

    return (
        <></>
    )
}
