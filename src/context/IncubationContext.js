// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";


// export const IncubationContext = createContext()

// export const IncubationProvider = ({children}) => {
//   const { authTokens } = useContext(AuthContext)
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false)


//   useEffect(() => {
//     getIncubation()
//   }, [])

//   let getIncubation = async () => {
//     let response = await fetch('https://incubation-backend-django-production.up.railway.app/api/incubation/data/', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + String(authTokens.access)
//       }
//     })
//     let data = await response.json()
//     console.log(data)
//     if (data.length !== 0) {
//       setIsFormSubmitted(true)
//     }
//   }


//   return(
//     <IncubationContext.Provider value={{isFormSubmitted}}>
//       {children}
//     </IncubationContext.Provider>
//   )
// }