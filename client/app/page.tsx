import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main className="flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Logo or Icon */}
        <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Twist <span className="text-blue-600">Tasks</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10">
          A seamless way to manage your daily workflow, track progress, and stay organized. Simple, secure, and efficient.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/auth/login" 
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/register" 
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-400">
          Built with Next.js & NestJS • Secure JWT Auth
        </p>
      </main>
    </div>
  );
}