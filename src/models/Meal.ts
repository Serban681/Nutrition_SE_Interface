import { Ingredient } from "./Ingredient";

export type Meal = {
  ingredients: Record<string, Ingredient>;
  total_meal: {
    protein: number;
    fats: number;
    calories: number;
    carbs: number;
    grams: number;
  };
};
