import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FormRestrictedRoute = ({ children }) => {
  const { isFormSubmitted } = useContext(AuthContext);
  console.log(isFormSubmitted);

  if (isFormSubmitted === 'NO') {
    return <Navigate to="/" />;
  }
  return children;

};

export default FormRestrictedRoute;
