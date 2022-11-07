import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FormPrivateRoute = ({ children }) => {
  const { isFormSubmitted } = useContext(AuthContext);
  console.log(isFormSubmitted);
  
  if (isFormSubmitted === 'YES') {
    return <Navigate to="/" />;
  }
  return children;

};

export default FormPrivateRoute;
