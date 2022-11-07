import { createContext, useState } from "react";

export const MessagesContext = createContext()

export default function Messages ({children}){
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [incubationErrorMessage, setIncubationErrorMessage] = useState('')
  const [incubationSuccessMessage, setIncubationSuccessMessage] = useState('')
  
  return(
    <MessagesContext.Provider value={{ errorMessage, setErrorMessage, successMessage, setSuccessMessage, incubationErrorMessage, setIncubationErrorMessage, incubationSuccessMessage, setIncubationSuccessMessage }} >
      {children}
    </MessagesContext.Provider>
  )
}