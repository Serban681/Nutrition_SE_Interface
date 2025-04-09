import { Ingredient } from "../models/Ingredient"

export const IngredientComponent = ({ingredient}: {ingredient: Ingredient}) => {
    return (
      <div className='border-2 p-2 rounded-2xl mb-4'>
        <p><span className='font-bold'>Name:</span> {ingredient.name}</p>
        <p><span className='font-bold'>Protein:</span> {ingredient.protein}</p>
        <p><span className='font-bold'>Fats:</span> {ingredient.fats}</p>
        <p><span className='font-bold'>Calories:</span> {ingredient.calories}</p>
        <p><span className='font-bold'>Carbs:</span> {ingredient.carbs}</p>
        <p><span className='font-bold'>Grams:</span> {ingredient.grams}</p>
      </div>
    )
  }
