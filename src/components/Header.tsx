import { ReactSVG } from "react-svg"
import account_icon from '../assets/account_icon.png'
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

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
    const user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

    const navigate = useNavigate();

    return (
        <div>
            { user === null ?
                <img onClick={() => navigate('/login')} src={account_icon} className="w-8 hover:cursor-pointer" />
                :
                <div onClick={() => {
                    localStorage.removeItem('user')
                    window.location.reload()
                }} className="w-8 h-8 rounded-full bg-green hover:cursor-pointer"></div>
            }
        </div>
    )
}
