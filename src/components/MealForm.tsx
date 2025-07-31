import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { ResultCard } from "./ResultCard";
import { toast } from "react-toastify";

export function MealForm() {
  const [dish_name, setDish] = useState("");
  const [servings, setServings] = useState(1);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post(
        "/get-calories",
        { dish_name, servings },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(data);
      toast.success("Calories fetched successfully!");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
      toast.error(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors duration-300 relative">

        {loading && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            aria-label="Loading"
            role="status"
          >
            <div className="flex space-x-2">
              <div
                className="w-2 h-8 bg-green-500 rounded-sm animate-bounce"
                style={{ animationDelay: "-0.3s" }}
              ></div>
              <div
                className="w-2 h-8 bg-green-500 rounded-sm animate-bounce"
                style={{ animationDelay: "-0.15s" }}
              ></div>
              <div
                className="w-2 h-8 bg-green-500 rounded-sm animate-bounce"
              ></div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-6 sm:p-8 z-10">
          <h1 className="text-center text-3xl text-green-600 dark:text-green-600 font-bold mb-6">Check Calories</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dish_name"
                className="block mb-2 text-sm font-medium"
              >
                Dish Name
              </label>
              <input
                id="dish_name"
                name="dish_name"
                type="text"
                placeholder="e.g., Paneer Butter Masala"
                value={dish_name}
                onChange={(e) => setDish(e.target.value)}
                required
                autoFocus
                className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="servings"
                className="block mb-2 text-sm font-medium"
              >
                Servings
              </label>
              <input
                id="servings"
                name="servings"
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                required
                className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium text-sm focus:ring-4 focus:ring-green-300 focus:outline-none"
            >
              Check Calories
            </button>
          </form>

          {/* Result Modal */}
          {result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="w-full max-w-md p-4">
                <ResultCard result={result} onBack={() => setResult(null)} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
