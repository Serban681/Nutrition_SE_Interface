import { useState } from "react"
import { Button } from "./Button"
import { NutritionalRecommendation } from "../models/NutritionalRecommendation"

export const NutritionalRecommender = () => {    
    const [askedForInfo, setAskedForInfo] = useState(false)
    
    const [recommendations, setRecommendations] = useState<NutritionalRecommendation>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
    })

    const getRecommendations = () => {
        fetch(import.meta.env.VITE_API_URL + '/calculate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: localStorage.getItem('userInformation')
        })
        .then(async response => await response.json())
        .then(data => {
            console.log(data)
            setAskedForInfo(true)
            setRecommendations(data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Button name="Hit me with the facts!" onClick={() => getRecommendations()}></Button>

            {askedForInfo && <div className="mt-3">
                <h1 className="text-lg">You should consume:</h1>
                <p>calories: <span className="font-bold">{Math.round(recommendations.calories)} kcal</span></p>
                <p>protein: <span className="font-bold">{Math.round(recommendations.protein)}g</span></p>
                <p>carbs: <span className="font-bold">{Math.round(recommendations.carbs)}g</span></p>
                <p>fats: <span className="font-bold">{Math.round(recommendations.fats)}g</span></p>
            </div>}
        </>
    )
}
