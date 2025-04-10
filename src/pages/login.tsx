import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth"
import { TextInput } from "../components/TextInput"
import { Button, GoogleButton } from "../components/Button"
import { useNavigate } from "react-router"
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { app } from "../main.tsx"
import { RadioInput } from "../components/RadioInput.tsx"
import { Goals } from "../models/Goals.ts"
import { ActivityFactors } from "../models/ActivityFactors.ts"
import { Genders } from "../models/Gender.ts"
import { UserInformation } from "../models/UserInformation.ts"


export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userUId, setUserUId] = useState('')

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const navigate = useNavigate();

    const db = getFirestore(app)
    const usersInformationRef = collection(db, "usersInformation")

    const [userInformation, setUserInformation] = useState({
        'goal': 'Weight Loss',
        'activity_level': 'sedentary',
        'gender': 'male',
        'age': '',
        'height': '',
        'weight': ''
    })

    const [questionStep, setQuestionStep] = useState(0)

    const storeUser = (userCredential: UserCredential) => {
        localStorage.setItem('user', JSON.stringify(userCredential.user))
    }

    const storeUserInformation = (userInformation: UserInformation) => {
        localStorage.setItem("userInformation", JSON.stringify(userInformation))
    }

    const checkUserHasPreviouslyLoggedIn = async (uId: string) => {
        const q = query(usersInformationRef, where("userUId", "==", uId))
                
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                storeUserInformation({
                    goal: querySnapshot.docs[0].data().goal,
                    activity_level: querySnapshot.docs[0].data().activity_level,
                    gender: querySnapshot.docs[0].data().gender,
                    age: querySnapshot.docs[0].data().age,
                    height: querySnapshot.docs[0].data().height,
                    weight: querySnapshot.docs[0].data().weight
                })
                navigate('/')
            }
            else {
                setQuestionStep(questionStep + 1)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const loginOrRegisterWithEmailAndPassword = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                storeUser(result)
                checkUserHasPreviouslyLoggedIn(result.user.uid)
                navigate('/')
            })
            .catch(error => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((result) => {
                        storeUser(result)
                        setUserUId(result.user.uid)
                        setQuestionStep(questionStep + 1)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        
    }

    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                storeUser(result)
                setUserUId(result.user.uid)
                checkUserHasPreviouslyLoggedIn(result.user.uid)
            }).catch((error) => {
                console.log(error)
            });
    }
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                {questionStep == 0 && (
                    <>
                        <h1 className="font-bold text-2xl mb-2">Log in</h1>
                        <div className="flex items-center flex-col">
                            <GoogleButton name="Sign in with Google" onClick={() => googleSignIn()} />
        
                            <p className="mt-2 font-bold">or</p>
        
                            <TextInput extraStyles="w-full" name="Email" value={email} onValueChange={value => setEmail(value)} />
                            
                            <TextInput extraStyles="mt-1 w-full" name="Password" value={password} onValueChange={value => setPassword(value)} typePassword={true} />            
                        </div>
                        <Button extraStyles="mt-3" name="Submit" onClick={loginOrRegisterWithEmailAndPassword}></Button>
                    </>
                )}
                
                {questionStep >= 1 && <h1 className="font-bold text-2xl mb-2">Tell us more about yourself</h1>}
                
                {questionStep == 1 && (
                    <>
                        <RadioInput name="What's your goal?" value={userInformation.goal} onValueChange={value => setUserInformation({...userInformation, goal: value})} possibleValues={Object.values(Goals)} />
                        {/* <TextInput name="What's your goal?" value={userInformation.goal} onValueChange={value => setUserInformation({...userInformation, goal: value})} /> */}
                    </>
                )}

                {questionStep == 2 && (
                    <>
                        <RadioInput name="What's your activity level?" value={userInformation.activity_level} onValueChange={value => setUserInformation({...userInformation, activity_level: value})} possibleValues={Object.values(ActivityFactors)} />
                    </>
                )}

                {questionStep == 3 && (
                    <>
                        <RadioInput name="What's your gender?" value={userInformation.gender} onValueChange={value => setUserInformation({...userInformation, gender: value})} possibleValues={Object.values(Genders)} />
                    </>
                )}

                {questionStep == 4 && (
                    <>
                        <TextInput name="What's your age?" value={userInformation.age} onValueChange={value => setUserInformation({...userInformation, age: value})} />
                    </>
                )}

                {questionStep == 5 && (
                    <>
                        <TextInput name="What's your height?" value={userInformation.height} onValueChange={value => setUserInformation({...userInformation, height: value})} />
                    </>
                )}

                {questionStep == 6 && (
                    <>
                        <TextInput name="What's your weight?" value={userInformation.weight} onValueChange={value => setUserInformation({...userInformation, weight: value})} />
                    </>
                )}

                {questionStep >= 1 && <Button extraStyles="mt-3" name={questionStep >= 1 && questionStep < 6  ? "Next" : "Submit"} onClick={async () => {
                    if(questionStep < 6)
                        setQuestionStep(questionStep + 1)
                    else {
                        await addDoc(collection(db, "usersInformation"), {
                            userUId: userUId,
                            ...userInformation
                        })
                        storeUserInformation(userInformation)
                        navigate('/')
                    }
                }}></Button>}
            </div>
        </div>
    )
}
