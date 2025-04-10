import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Meal } from "../models/Meal";
import { Button } from "./Button";

export const ImageApproximator = () => {
  const [mealNutrients, setMealNutrients] = useState<Meal | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileTypes = ["JPEG", "JPG", "PNG"];

  const uploadFile = (file: File) => {
    setImage(file);
    setMealNutrients(null);
    setError(null);
  };

  const getNutrientsFromMeal = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    setIsLoading(true);
    setError(null);

    fetch(import.meta.env.VITE_API_URL + "/upload", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong while processing the image.");
          setMealNutrients(null);
        } else {
          setMealNutrients(data);
        }
      })
      .catch(() => {
        setError("Failed to connect to the server.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Meal Analyzer</h1>
        <p className="text-gray-500 mt-1">Upload your meal and discover what's inside</p>
      </div>

      <div className="flex justify-center">
        <FileUploader
          multiple={false}
          handleChange={uploadFile}
          name="file"
          types={fileTypes}
        />
      </div>

      {image && (
        <div className="flex flex-col items-center mt-6">
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Preview"
            className="w-64 md:w-80 lg:w-96 rounded-xl shadow-lg mb-4 object-cover"
          />
          <p className="text-sm text-gray-600">
            File name: <span className="font-medium">{image.name}</span>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-100 text-red-800 border border-red-300 px-6 py-4 rounded-xl text-center font-medium shadow">
          {error}
        </div>
      )}

      {!mealNutrients && !isLoading && image && (
        <div className="flex justify-center mt-6">
          <Button onClick={getNutrientsFromMeal} name="View Nutritional Values" />
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <svg
            className="animate-spin h-6 w-6 text-red mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <p className="text-gray-500">Analyzing your meal...</p>
        </div>
      )}

      {mealNutrients && !isLoading && (
        <div className="mt-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Total Meal Content</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-red-100 px-4 py-3 rounded-xl font-medium shadow text-center">
              <span className="font-medium">Calories:</span>{" "}
              <span className="font-bold">{mealNutrients.total_meal.calories}</span>
            </div>
            <div className="bg-blue-100 px-4 py-3 rounded-xl font-medium shadow text-center">
              <span className="font-medium">Protein:</span>{" "}
              <span className="font-bold">{mealNutrients.total_meal.protein}</span>
            </div>
            <div className="bg-yellow-100 px-4 py-3 rounded-xl font-medium shadow text-center">
              <span className="font-medium">Carbs:</span>{" "}
              <span className="font-bold">{mealNutrients.total_meal.carbs}</span>
            </div>
            <div className="bg-green-100 px-4 py-3 rounded-xl font-medium shadow text-center">
              <span className="font-medium">Fats:</span>{" "}
              <span className="font-bold">{mealNutrients.total_meal.fats}</span>
            </div>
            <div className="bg-purple-100 px-4 py-3 rounded-xl font-medium shadow text-center">
              <span className="font-medium">Grams:</span>{" "}
              <span className="font-bold">{mealNutrients.total_meal.grams}</span>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">Ingredients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(mealNutrients.ingredients).map((ingredient) => (
              <div
                key={ingredient.name}
                className="bg-gradient-to-br from-gray-100 to-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition"
              >
                <p className="font-bold text-lg text-gray-800 mb-2">{ingredient.name}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <span className="font-medium text-gray-700">Protein:</span> {ingredient.protein}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Fats:</span> {ingredient.fats}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Calories:</span> {ingredient.calories}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Carbs:</span> {ingredient.carbs}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Grams:</span> {ingredient.grams}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
