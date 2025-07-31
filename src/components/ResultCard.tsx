import { useNavigate } from "react-router-dom";

export function ResultCard({
  result,
  onBack,
}: {
  result: any;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const handleFeedback = () => {
    navigate("/feedback", { state: { dish_name: result.dish_name } });
  };

  return (
    <div className="relative max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 text-black dark:text-white space-y-4">
      <button
        onClick={onBack}
        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
      >
        X
      </button>

      <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-600  ">
        {result.dish_name || "Paneer Butter Masala"}
      </h2>

      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-semibold">
        Servings: {result.servings}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-semibold">
        Calories per serving: {result.calories_per_serving}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-semibold">
        Protein per serving: {result.protein_per_serving}g
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-semibold">
        Fat per serving: {result.fat_per_serving}g
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-semibold">
        Carbs per serving: {result.carbs_per_serving}g
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 font-bold text-lg">
        Total calories: {result.total_calories}
      </div>

      <p className="text-center text-sm text-green-700 dark:text-green-400 mt-2">
        Source: {result.source}
      </p>
      <button
        onClick={() => handleFeedback()}
        className="fixed bottom-3 right-3 px-3 py-1 rounded bg-green-600 dark:bg-green-700 text-white transition"
      >
        💬 Feedback
      </button>
    </div>
  );
}
