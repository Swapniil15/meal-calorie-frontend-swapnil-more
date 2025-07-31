import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const url = type === "register" ? "/auth/register" : "/auth/login";
    const { data } = await api.post(url, form);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setSuccessMsg(type === "login" ? "Login successful" : "Registration successful");
      toast.success(successMsg);
      navigate("/calories");
      window.location.reload();
    } else {
      throw new Error("Token not returned");
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.error || err.message || "Something went wrong!");
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-xl text-center font-bold mb-6">
          {type === "login" ? "Sign in to your account" : "Create an account"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === "register" && (
            <>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm"
          >
            {type === "login" ? "Sign In" : "Register"}
          </button>

          <p className="text-sm text-center font-light text-gray-600 dark:text-gray-400 mt-2">
            {type === "login" ? (
              <>
                Don’t have an account yet?{" "}
                <span
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
