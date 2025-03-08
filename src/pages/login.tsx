import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { TextInput } from "../components/TextInput"
import { Button, GoogleButton } from "../components/Button"
import { useNavigate } from "react-router"

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const navigate = useNavigate();

    const submit = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result)
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="font-bold text-2xl mb-2">Log in</h1>
                <div className="flex items-center flex-col">
                    <GoogleButton name="Sign in with Google" onClick={() => googleSignIn()} />

                    <p className="mt-2 font-bold">or</p>

                    <TextInput name="Email" value={email} onValueChange={value => setEmail(value)} />
                    
                    <TextInput extraStyles="mt-1" name="Password" value={password} onValueChange={value => setPassword(value)} typePassword={true} />            
                </div>
                <Button extraStyles="mt-3" name="Submit" onClick={submit}></Button>
            </div>
        </div>
    )
}
