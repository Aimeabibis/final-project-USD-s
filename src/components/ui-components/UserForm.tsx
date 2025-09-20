import { useState, useEffect } from "react";

interface User {
  name: string;
  id?: string;
  password: string;
  email: string;
  role: string;
  activities: ""|"Yoga" | "Cardio" | "Musculation" | "Natation" | "Cyclisme";
}

interface UserFormProps {
  onSave: (user: User) => void;
  onCancel: () => void;
  initialData?: User | null;
  darkMode?: boolean;
}

export const UserForm = ({
  onSave,
  onCancel,
  initialData,
  darkMode,
}: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    name: "",
    password: "",
    email: "",
    role: "User",
    activities: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 flex flex-col gap-4 p-6 rounded-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between gap-2 md:flex-row">
        <input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-lg outline-none ${darkMode?" placeholder:text-white " : "text-gray-900 placeholder:text-gray-900 "}`}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-lg outline-none ${darkMode?"placeholder-text-white":"placeholder:text-gray-900"}`}
      />
      <select
        name="activities"
        value={formData.activities}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 outline-none"
      >
        <option value="" disabled>
          Activité
        </option>
        <option>Yoga</option>
        <option>Cardio</option>
        <option>Musculation</option>
        <option>Natation</option>
        <option>Cyclisme</option>
      </select>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg outline-none"
      >
        <option value="User">Utilisateur</option>
        <option value="Admin">Administrateur</option>
      </select>
      <input
        type="text"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg outline-none"
      />
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
