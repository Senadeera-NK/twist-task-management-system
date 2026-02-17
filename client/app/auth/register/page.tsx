"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../components/lib/axios";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Register</h2>
        
        {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full text-black rounded-md border border-black p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full text-black rounded-md border border-black p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}