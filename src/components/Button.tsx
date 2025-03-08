import google_logo from '../assets/google_logo.svg'
import { ReactSVG } from 'react-svg'

export const Button = ({name, onClick, extraStyles} : {name: string, onClick?: () => void, extraStyles?: string}) => {
    return (
        <button onClick={onClick} className={`${extraStyles} bg-red-light text-white py-1.5 px-3.5 font-semibold rounded-lg hover:scale-110 hover:cursor-pointer text-lg`}>
            {name}
        </button>
    )
}

export const GoogleButton = ({name, onClick, extraStyles} : {name: string, onClick?: () => void, extraStyles?: string}) => {
    return (
        <button onClick={onClick} className={`${extraStyles} text-black py-1.5 px-4.5 font-semibold rounded-lg hover:scale-110 hover:cursor-pointer text-base flex items-center border-2`}>
            <ReactSVG src={google_logo} className='w-7' />
            {name}
        </button>
    )
}
