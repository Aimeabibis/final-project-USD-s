import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleThemeButton } from "../components/ui-core/ToggleThemeButton";

export const Register = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);


  const regex = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
    if (regex.test(e.target.value)) {
      return setIsEmailValid(true)
    } return setIsEmailValid(false)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameValue.length === 0) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }

    if (regex.test(emailValue)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }

    if (nameValue.trim().length === 0) {
    setIsNameValid(false);    
  } else {
    setIsNameValid(true);
  }

  // Vérifier le mot de passe
  if (passwordValue.trim().length === 0) {
    setIsPasswordValid(false);
  } else {
    setIsPasswordValid(true);
  }

  // Vérifier la confirmation
  if (passwordValue !== confirmPasswordValue) {
    setIsConfirmPasswordValid(false);
  } else {
    setIsConfirmPasswordValid(true);
  }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-[#F1F1F1]"
      }`}
    >
      {/* Toggle Button */}
      <ToggleThemeButton
        dark={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5"
      />

      {/* Register Card */}
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="space-y-5">         
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Nom complet
            </label>
            <input value={nameValue} onChange={handleNameChange}
              type="text"
              id="name"
              placeholder="John Doe"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Nom complet"             
            />
            {!isNameValid && (<span className="text-red-500 text-sm">Le champs est vide.</span>)}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="name"
              placeholder="Alicia"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Nom d'utilisateur"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input value={emailValue} onChange={handleEmailChange}
              type="email"
              id="email"
              placeholder="exemple@mail.com"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Adresse e-mail"
            />
            {!isEmailValid && (<span className="text-red-500 text-sm">L'adresse e-mail n'est pas valide.</span>)}
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input value={passwordValue} onChange={handlePasswordChange}
              type="password"
              id="password"
              placeholder="********"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Mot de passe"
            />
            {!isPasswordValid && <span style={{ color: "red" }}>Le champs est vide.</span>}
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="confirmPassword"
            >
              Confirmer le mot de passe
            </label>
            <input value={confirmPasswordValue} onChange={handleConfirmPasswordChange}
              type="password"
              id="confirmPassword"
              placeholder="********"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              aria-label="Confirmation du mot de passe"
            />
            {!isConfirmPasswordValid && <span style={{ color: "red" }}>Les mots de passe ne correspondent pas.</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
          >
            S’inscrire
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-75 ">
          Déjà un compte ?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-green-500 hover:underline cursor-pointer"
          >
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};
