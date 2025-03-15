import { useNavigate } from 'react-router';
import './index.css'
import { Header } from './components/Header';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <>
      <Header />
      
      <div className='flex items-center justify-center'>
        <div className='w-30 bg-red'>
          <p className=''>Upload File</p>
          <input
            className='hover:cursor-pointer border-2 text-white'
            type="file"
            name="foodImage"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                console.log(event.target.files[0])
                setSelectedImage(event.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App
