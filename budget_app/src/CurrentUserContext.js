import React, { useState, useEffect, createContext, useContext } from 'react'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const fetchCurrentUser = async () => {
    let response =  await fetch("/currentuser")
    response =  await response.json()
    setUser(response)
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div>
    <CurrentUserContext.Provider value={{ user, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
    </div>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
