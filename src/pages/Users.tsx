import { useEffect, useState } from "react";
import { Sidebar } from "../components/ui-components/sidebar";
import { ToggleThemeButton } from "../components/ui-core/ToggleThemeButton";
import { UserForm } from "../components/ui-components/UserForm";
import { DataTable, type Column } from "../components/ui-components/Table";
import { apiClient } from "../core/useFetch";
import { API_LIST } from "../core/apiList";

interface User {
  name:string;
  id: string;
  password: string;
  email: string;
  role: string;
  activities:""|"Yoga" | "Cardio" | "Musculation" | "Natation" | "Cyclisme";
}


export const Users = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
   async function fetchUsers() {
    const data = await apiClient<undefined, User[]>("GET", API_LIST.userApi);
    setUsers(data);
  }
useEffect(() => {
 
  fetchUsers();
}, []);
    

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  async function handleDelete (id: string)  {
    await apiClient<undefined, void>("DELETE", `${API_LIST.userApi}/${id}`);
    fetchUsers();
    // setUsers(users.filter((u) => u.id !== id));
  };

  // creation 
  async function handleSave (user: Partial<User>)  {
    
    if (editingUser) {
      await apiClient<Partial<User>, User>("PUT", `${API_LIST.userApi}/${user.id}`, user);
      fetchUsers();
    } else {
      await apiClient<Partial<User>, User>("POST", `${API_LIST.userApi}`, user);
      fetchUsers();
    }
    setShowForm(false);
  };

  const columns: Column<User>[] = [
  { key: "name", label: "Nom" },
  { key: "password", label: "Mot de passe" },
  { key: "email", label: "Email" },
  { key: "role", label: "Rôle" },
  { key: "activities", label: "Activité" },
  
];


  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar darkMode={darkMode} />

      <main className="px-10 flex-1 p-8">
        <ToggleThemeButton
          dark={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5"
        />

        <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>

        <button
          onClick={handleAdd}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 "
        >
          + Ajouter un utilisateur
        </button>

        
          {showForm && (
          <div className="mb-6 p-6 rounded-lg shadow-md" >
            <UserForm
              initialData={editingUser}
              onSave={handleSave}
              onCancel={() => setShowForm(false)}
              darkMode={darkMode}
             
            />
          </div>
        )}

        {/* Tableau */}
        <DataTable<User>
          columns={columns}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          
        />
        
      </main>
    </div>
  );
};