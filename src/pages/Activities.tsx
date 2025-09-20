import { useEffect, useState } from "react";
import { Sidebar } from "../components/ui-components/sidebar";
import { ToggleThemeButton } from "../components/ui-core/ToggleThemeButton";
import { Activity, Pencil, Trash } from "lucide-react";
import { apiClient } from "../core/useFetch";
import { API_LIST } from "../core/apiList";

interface ActivityType {
  id: string;  
  type: string;
  duration: number;
  date: string;
  status: "En cours" | "Terminée" | "Planifiée";
  
}

export const Activities = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [activities, setActivities] = useState<ActivityType[]>([]);
  async function fetchActivities() {
    const data = await apiClient<undefined, ActivityType[]>(
      "GET",
      API_LIST.activityApi
    );
    setActivities(data);
  }
  useEffect(() => {
    fetchActivities();
  }, []);

  const [editingActivity, setEditingActivity] = useState<ActivityType | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleEdit = (activity: ActivityType) => {
    setEditingActivity(activity);
    setShowForm(true);
  };


  async function handleDelete (id: string)  {
    await apiClient<undefined, void>("DELETE", `${API_LIST.activityApi}/${id}`);
    fetchActivities();
    
  };
  
  async function handleSave (activity: Partial<ActivityType>)  {
    if (editingActivity) {
      await apiClient<Partial<ActivityType>, ActivityType>("PUT", `${API_LIST.activityApi}/${activity.id}`, activity);  
      fetchActivities();
    } else {
      activity.date = new Date().toISOString().split("T")[0]; // Ajouter la date actuelle lors de la création
      await apiClient<Partial<ActivityType>, ActivityType>("POST", `${API_LIST.activityApi}`, activity);  
      fetchActivities();
    }
    setShowForm(false);

  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar darkMode={darkMode} />

      <main className="px-10 flex-1 p-8">
        <ToggleThemeButton
          dark={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5"
        />

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Activity /> Activités
        </h1>

        <button
          onClick={handleAdd}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          + Ajouter une activité
        </button>

        {/* Formulaire */}
        {showForm && (
          <div className={`mb-6 p-6  rounded-lg shadow ${darkMode?"bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h2 className="text-xl font-bold mb-4">
              {editingActivity ? "Modifier l'activité" : "Nouvelle activité"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const durationValue = formData.get("duration");
                const duration =
                  typeof durationValue === "string"
                    ? Number(durationValue)
                    : undefined;
                handleSave({
                  type: formData.get("type") as string,                  
                  duration,
                  
                });
                form.reset();
              }}
              className="space-y-4"
            >
              <div className="flex  justify-between items-center gap-4">
                <input
                type="text"
                name="type"
                defaultValue={editingActivity?.type || ""}
                placeholder="Titre"
                className={`w-1/3 px-4 py-2 border rounded-lg outline-none ${darkMode?"text-white placeholder:text-white " : "text-gray-900 placeholder:text-gray-900 "}`}
                required
              />
              <input
                type="number"
                name="duration"
                placeholder="Durée (min)"
                defaultValue={editingActivity?.duration || ""}
                className={`w-1/3 px-4 py-2 border rounded-lg outline-none ${darkMode?"text-white placeholder:text-white" : "text-gray-900 placeholder:text-gray-900 "}`}
                required
              />              
              <select
                name="status"
                defaultValue={editingActivity?.status || "Planifiée"}
                className={`w-1/3 px-4 py-2 border rounded-lg outline-none ${darkMode?"text-white bg-gray-800" : "text-gray-900 bg-white"}`}
              >
                <option>Planifiée</option>
                <option>En cours</option>
                <option>Terminée</option>
              </select>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-6 rounded-xl shadow-md transition-colors ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            > 
              <h2 className="text-xl font-bold mb-2">{activity.type}</h2>
              <span className="text-sm">Durée : {activity.duration} min</span>              
              <p className="mt-2 text-sm">📅 {activity.date}</p>
              {/* <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  activity.status === "En cours"
                    ? "bg-green-500 text-white"
                    : activity.status === "Terminée"
                    ? "bg-green-600 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {activity.status}
              </span> */}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleEdit(activity)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg cursor-pointer"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg cursor-pointer"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
