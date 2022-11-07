import {createContext, useState} from 'react'

export const ApplicationViewContext = createContext(null)

function ApplicationViewContextProvider ({children}) {
    const [applicationDetails, setApplicationDetails] = useState()

    return(
        <ApplicationViewContext.Provider value={{ applicationDetails, setApplicationDetails }}>
            {children}
        </ApplicationViewContext.Provider>
    )
}

export default ApplicationViewContextProvider