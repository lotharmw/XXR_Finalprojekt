import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Remember from "./components/Remember";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";
import Xplore from "./components/Xplore";
import Xperience from "./components/Xperience";

function App() {
  // THEME TOGGLE LIGHT/DARK MODE - START
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "lemonade"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("lemonade");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  // THEME TOGGLE LIGHT/DARK MODE - END

  // LOGIN/REGISTRATION - START
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState();

  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (submitting) {
      if (showRegister) {
        // Send formData to backend here
        const formData = new FormData();
        formData.append("picture", file);
        formData.append("first_name", registerData.first_name);
        formData.append("last_name", registerData.last_name);
        formData.append("location", registerData.location);
        formData.append("occupation", registerData.occupation);
        formData.append("email", registerData.email);
        formData.append("password", registerData.password);

        fetch("http://localhost:8000/auth/register", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        })
          .then((res) => {
            setSubmitting(false);
            if (res.ok) {
              alert("Registration successful!");
              setShowRegister(false);
            } else {
              alert("Registration failed!");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            console.error(err);
          });
      } else {
        // Send formData to backend here
        fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })
          .then((res) => {
            setSubmitting(false);
            if (res.ok) {
              return res.json();
            } else {
              alert("Login failed!");
            }
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            delete data.user.password;
            setToken(data.token);
            setUser(data.user);
            navigate("/");
          })
          .catch((err) => {
            setSubmitting(false);
            console.error(err);
          });
      }
    }
  }, [file, showRegister, loginData, registerData, submitting, navigate]);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    const isUser = localStorage.getItem("user");
    if (isToken) setToken(isToken);
    if (isUser) setUser(JSON.parse(isUser));
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
  };
  // LOGIN/REGISTRATION - END

  return (
    <div className="bg-base-200 min-h-screen">
      <Header user={user} handleToggle={handleToggle} theme={theme} />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} token={token} theme={theme} />}
        />
        <Route
          path="/login"
          element={
            <SignUp
              showRegister={showRegister}
              setShowRegister={setShowRegister}
              registerData={registerData}
              loginData={loginData}
              handleRegisterChange={handleRegisterChange}
              handleLoginChange={handleLoginChange}
              handleSubmit={handleSubmit}
              file={file}
              setFile={setFile}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={token ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/xplore"
          element={<Xplore theme={theme} user={user} token={token} />}
        />
        <Route
          path="/xperience"
          element={<Xperience theme={theme} user={user} token={token} />}
        />
        <Route
          path="/remember"
          element={<Remember theme={theme} user={user} token={token} />}
        />
        <Route
          path="/profile"
          element={
            token ? (
              <ProfilePage theme={theme} user={user} token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
