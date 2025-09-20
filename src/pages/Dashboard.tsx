import { useState } from "react";
import { ToggleThemeButton } from "../components/ui-core/ToggleThemeButton";
import { StatsCard } from "../components/ui-components/StatsCard";
import { Sidebar } from "../components/ui-components/sidebar";
import { Users, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Lun", users: 40, activities: 24 },
  { name: "Mar", users: 30, activities: 13 },
  { name: "Mer", users: 20, activities: 98 },
  { name: "Jeu", users: 27, activities: 39 },
  { name: "Ven", users: 18, activities: 48 },
  { name: "Sam", users: 23, activities: 38 },
  { name: "Dim", users: 34, activities: 43 },
];

export const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
     
      <Sidebar darkMode={darkMode} />  
      <main className="px-10 flex-1 p-8">
        {/* Toggle Theme */}
        <ToggleThemeButton
          dark={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5"
        />

        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ">
          <StatsCard title="Utilisateurs inscrits" value="1,250" icon={<Users />} darkMode={darkMode} />
          <StatsCard title="Activités aujourd'hui" value="340" icon={<Activity />} darkMode={darkMode} />
          <StatsCard title="Sessions actives" value="89" icon={<Activity />} darkMode={darkMode} />
        </div>

        {/* Graph */}
        <div
          className={`p-6 rounded-2xl shadow-md transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Activités de la semaine</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" />
              <Bar dataKey="activities" fill="#e22b5b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};
