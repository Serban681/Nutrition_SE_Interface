import { useState } from "react";
import { FileUploader } from "react-drag-drop-files"
import { Meal } from "../models/Meal";
import { Button } from "./Button";
import { IngredientComponent } from "./IngredientComponent";

export const ImageApproximator = () => {
    const [mealNutrients, setMealNutrients] = useState<Meal | null>();
    
    const [image, setImage] = useState<File | null>();

    const uploadFile = (file: File) => {
    setImage(file)
    }

    const fileTypes = ["JPEG", "JPG", "PNG"]

    const getNutrientsFromMeal = () => {
        const formData = new FormData()
        formData.append('file', image!)

        fetch(import.meta.env.VITE_API_URL + '/upload', {
            method: 'POST',
            body: formData 
        })
        .then(async response => setMealNutrients(await response.json()))
        .catch(err => console.log(err))
    }

    return (
        <>
            <FileUploader
                multiple={false}
                handleChange={uploadFile}
                name="file"
                types={fileTypes}
            />

            {!!image && <img className="mt-4 w-80" src={URL.createObjectURL(image)} />}

            <p className='mt-3'>{!!image ? `File name: ${image.name}` : "No files uploaded yet!"}</p>
        
            {!!image && <Button onClick={getNutrientsFromMeal} name='View Nutritional Values'></Button>}

            { mealNutrients && <>
            <div className='mt-4'>
                <p className='text-2xl font-bold mb-2'>Total meal content:</p>
                <p><span className='font-bold'>Protein:</span> {mealNutrients.total_meal.protein}</p>
                <p><span className='font-bold'>Fats:</span> {mealNutrients.total_meal.fats}</p>
                <p><span className='font-bold'>Calories:</span> {mealNutrients.total_meal.calories}</p>
                <p><span className='font-bold'>Carbs:</span> {mealNutrients.total_meal.carbs}</p>
                <p><span className='font-bold'>Grams:</span> {mealNutrients.total_meal.grams}</p>

                <p className='text-xl font-bold my-2'>Ingredients:</p>
                { 
                    Object.values(mealNutrients.ingredients).map(ingredient => <IngredientComponent key={ingredient.name} ingredient={ingredient} />)
                }
            </div>
            </>
            }
            
      </>
    )
}
