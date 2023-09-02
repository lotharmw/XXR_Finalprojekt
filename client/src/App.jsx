import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import XXRHome from "./components/XXRHome";

function App() {
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

  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (submitting) {
      if (showRegister) {
        // Send formData to backend here
        fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
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
  }, [showRegister, loginData, registerData, submitting, navigate]);

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

  return (
    <div className="bg-base-200 min-h-screen">
      <Header user={user} />
      <Routes>
        {token ? (
          <Route path="/" element={<Home user={user} token={token} />} />
        ) : (
          <Route
            path="/"
            element={
              <SignUp
                showRegister={showRegister}
                setShowRegister={setShowRegister}
                registerData={registerData}
                loginData={loginData}
                handleRegisterChange={handleRegisterChange}
                handleLoginChange={handleLoginChange}
                handleSubmit={handleSubmit}
              />
            }
          />
        )}
        <Route
          path="/profile/:id"
          element={token ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route path="/home" element={<XXRHome />} />
      </Routes>
    </div>
  );
}

export default App;
