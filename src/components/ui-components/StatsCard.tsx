import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  darkMode: boolean;
}

export const StatsCard = ({ title, value, icon, darkMode }: StatsCardProps) => {
  return (
    <div
      className={`flex items-center p-6 rounded-2xl shadow-md transition-colors duration-500 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="text-blue-500 text-3xl mr-4">{icon}</div>
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};
