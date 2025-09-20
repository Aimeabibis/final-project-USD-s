import { useState } from "react";
import { ToggleThemeButton } from '../components/ui-core/ToggleThemeButton';
import { useNavigate } from "react-router-dom";


interface Login {
  email: string;
  password: string;
}


export const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [login, setLogin] = useState<Login >({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
   async function fetchLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
      console.log(login);
      if (login.email === "" || login.password === "") {
        setError("Veuillez remplir tous les champs.");        
        return;
      } else if (login.email=== "admin@gmail.com" && login.password === "1234") {
        setError(null);
            localStorage.setItem("token", btoa(JSON.stringify({ email: "admin@mail.com", role: "admin" })));
        navigate("/dashboard");
      }else {
        setError("Email ou mot de passe incorrect.");
      }
           
    }
 

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-[#F1F1F1]"
      }`}
    >
      {/* Toggle Button réutilisable */}
      <ToggleThemeButton
        dark={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5"
      />

      {/* Login Card */}
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">FitTrack360</h1>

        <form className="space-y-5" onSubmit={fetchLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email ou Nom d’utilisateur
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemple@mail.com"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Adresse e-mail"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Mot de passe"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-75">
          Pas encore de compte ? <a 
          onClick={()=>navigate("/register")} className="text-green-500 hover:underline cursor-pointer">S’inscrire</a>
        </p>
      </div>
    </div>
  );
}
