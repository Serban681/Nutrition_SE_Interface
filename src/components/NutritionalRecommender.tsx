import { useEffect, useState } from "react"
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
        console.log("Fetching recommendations...")
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

    useEffect(() => {
        getRecommendations()
    }, [])

    return (
        <>
            {askedForInfo && 
                <div className="mt-3">
                    <h1 className="text-xl font-bold mb-4">You should consume:</h1>
                    <div className="grid grid-cols-1 gap-4">
                    <div className="bg-red-100 px-4 py-3 rounded-xl font-medium shadow text-center">
                        <span className="font-medium">Calories:</span>{" "}
                        <span className="font-bold">{Math.round(recommendations.calories)} kcal</span>
                    </div>
                    <div className="bg-blue-100 px-4 py-3 rounded-xl font-medium shadow text-center">
                        <span className="font-medium">Protein:</span>{" "}
                        <span className="font-bold">{Math.round(recommendations.protein)}g</span>
                    </div>
                    <div className="bg-yellow-100 px-4 py-3 rounded-xl font-medium shadow text-center">
                        <span className="font-medium">Carbs:</span>{" "}
                        <span className="font-bold">{Math.round(recommendations.carbs)}g</span>
                    </div>
                    <div className="bg-green-100 px-4 py-3 rounded-xl font-medium shadow text-center">
                        <span className="font-medium">Fats:</span>{" "}
                        <span className="font-bold">{Math.round(recommendations.fats)}g</span>
                    </div>
                    </div>
                </div>
            }
        </>
    )
}
