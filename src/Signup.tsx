import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, confirmSignUp } from "aws-amplify/auth";

export default function Signup() {
  const [step, setStep] = useState<"signup" | "confirm">("signup");

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstname,
            family_name: formData.lastname,
          },
        },
      });

      setStep("confirm");
      setMessage("Verification code sent to your email");
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: code,
      });

      navigate("/login");
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#1a061e] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-wider uppercase">
            CAMPUS CUP
          </div>

          <button
            onClick={toggleDarkMode}
            className="text-white hover:opacity-70"
          >
            <i className="fas fa-moon text-xl"></i>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="login-card w-full max-w-md p-8 rounded-lg shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a061e] mb-2 uppercase">
              {step === "signup" ? "Create Account" : "Verify Email"}
            </h1>

            <p className="text-gray-500 text-sm">
              {step === "signup"
                ? "Join the Campus Cup experience."
                : "Enter the verification code sent to your email."}
            </p>
          </div>

          {step === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-lg"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-lg"
                required
              />

              {message && (
                <p className="text-sm text-red-500">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-white font-bold py-4 rounded-lg uppercase tracking-widest mt-4"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-lg"
                required
              />

              {message && (
                <p className="text-sm text-red-500">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-white font-bold py-4 rounded-lg uppercase tracking-widest mt-4"
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#be185d] font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}