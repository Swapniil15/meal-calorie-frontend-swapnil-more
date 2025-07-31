import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../lib/api";

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3);
  const [wiggle, setWiggle] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { dish_name } = location.state || {};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty!");
      return;
    }

    try {
      await api.post(
        "/submit-feedback",
        {
          feedback,
          rating,
          dish_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Thank you for your feedback!");
      setFeedback("");
      setRating(3);
      navigate("/calories");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to send feedback");
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
    setWiggle(true);
    setTimeout(() => setWiggle(false), 300);
  };

  const emojis = ["😠", "😕", "😐", "😊", "🤩"];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
          Feedback Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            className="w-full h-28 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 resize-none"
            required
          />

          <div>
            <label className="block text-sm text-black dark:text-white mb-1">
              🌟 Rate your experience:
            </label>

            <div className="flex justify-between text-xl px-1 mb-1">
              {emojis.map((emo, idx) => (
                <span
                  key={idx}
                  className={`transition-transform ${
                    rating === idx + 1 ? "scale-125" : "opacity-10"
                  }`}
                >
                  {emo}
                </span>
              ))}
            </div>

            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className={`w-full accent-green-700 ${
                wiggle ? "animate-wiggle" : ""
              }`}
            />

            <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-1">
              {rating}/5
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}
