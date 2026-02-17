"use client";
import { useEffect, useState } from "react";
import api from "../components/lib/axios";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "DONE";
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Fetch Tasks on Mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks/get-all");
        setTasks(response.data);
      } catch (err) {
        // If 401, redirect to login
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [router]);

  // 2. Logic for Search (Engineering Maturity: Done locally for speed)
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    // In a real app, hit an /auth/logout endpoint to clear cookies
    await api.post("/auth/logout").catch(() => {}); 
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button 
            onClick={handleLogout}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 p-2 border text-black rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Search
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            New Task
          </button>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    task.status === 'DONE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
                <div className="mt-4 flex gap-4">
                  <button className="text-blue-600 border px-6 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium">Edit</button>
                  <button className="text-red-500 border px-6 py-2 rounded-lg hover:bg-red-100 transitiontext-sm font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTasks.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No tasks found. Try a different search or create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}