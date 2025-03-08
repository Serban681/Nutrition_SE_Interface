import { useNavigate } from 'react-router';
import './index.css'

function App() {
  const navigate = useNavigate();

  const loginBtnClick = () => {
    navigate('/login')
  }

  return (
    <>
      <p>
        Hello
      </p>

      <button onClick={() => loginBtnClick()}>
        Login
      </button>
    </>
  )
}

export default App
