import './index.css'
import { Header } from './components/Header';
import { ImageApproximator } from './components/ImageApproximator';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import arrow_back from "./assets/arrow_back.svg"
import arrow_forward from "./assets/arrow_forward.svg"
import { NutritionalRecommender } from './components/NutritionalRecommender';
import useGetUser from './hooks/useGetUser';

function App() {
  let NO_OF_SERVICES = 2

  const {user} = useGetUser()

  const [service, setService] = useState(!!user ? 2 : 1)

  const nextService = () => {
    if(service == NO_OF_SERVICES)
      setService(1)
    else
      setService(service + 1)
  }

  const prevService = () => {
    if(service == 1)
      setService(NO_OF_SERVICES)
    else
      setService(service - 1)
  }

  return (
    <>
      <Header />
      
      <div className='mt-14 flex justify-center items-center flex-col'>
        { service === 1 && <ImageApproximator/> }

        { service === 2 && <NutritionalRecommender/> }
      </div>
      

      <div className='mt-10 flex flex-row justify-center w-full'>
        <div className='flex'>
          <ReactSVG src={arrow_back} onClick={prevService} className='w-7 cursor-pointer' />
          <ReactSVG src={arrow_forward} onClick={nextService} className='w-7 cursor-pointer' />
        </div>
      </div>
    </>
  )
}



export default App
