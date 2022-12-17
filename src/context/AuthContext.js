import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "./Messages";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setSuccessMessage } = useContext(MessagesContext);
  const { setErrorMessage } = useContext(MessagesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState('');
  const [statusStep, setStatusStep] = useState(0)
  const [approvalStatus, setApprovalStatus] = useState('Pending')

  let loginUser = async (e) => {
    e.preventDefault();
    if (e.target.username.value !== "" && e.target.password.value !== "") {
      setSuccessMessage('')
      let response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        if (jwt_decode(data.access).admin) {
          navigate("/admin");
        }
        else {
          navigate("/");
        }

      } else {
        setErrorMessage("Invalid username or password");
      }
    } else if (e.target.username.value === "") {
      setErrorMessage("Please fill username");
    } else if (e.target.password.value === "") {
      setErrorMessage("Please fill password");
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  let getIncubation = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/incubation/data/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    let data = await response.json();
    if (data.length !== 0) {
      setIsFormSubmitted('YES');
      if (data[0].is_slot_allotted) {
        setStatusStep(2)
        setApprovalStatus('Approved')
      }
      else if (data[0].is_approved) {
        setStatusStep(1)
        setApprovalStatus('Approved')
      }
      else if (data[0].is_declined) {
        setStatusStep(1)
        setApprovalStatus('Denied')
      }
    }
    else {
      setIsFormSubmitted('NO');
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setErrorMessage("");
    setIsFormSubmitted('')
    navigate("/login");
  };

  let updateToken = async () => {
    console.log("Token updated 1");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    isFormSubmitted: isFormSubmitted,
    statusStep: statusStep,
    approvalStatus:approvalStatus,
    loginUser: loginUser,
    logoutUser: logoutUser,
    getIncubation: getIncubation,
  };



  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  });

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
