import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'


export const stateContext = createContext();

const getFreshContext = () => {

    if(localStorage.getItem('context') === null )
    localStorage.setItem('context', JSON.stringify({
        userId:0,
        roomId:0,
        bookId:0,
        currentUserId:0,
        token:0
    }))

    return JSON.parse(localStorage.getItem('context'))

}


export default function useStateContext() {
    const { context, setContext } = useContext(stateContext)
    return {
       context,
       setContext: obj => {setContext({...context,...obj})},
       resetContext: ()=>{
        localStorage.removeItem('context')
        setContext(getFreshContext())
       }
    };
}
export  function ContextProvider({children}) {
    const [context,setContext] = useState(getFreshContext())


    useEffect(() =>{
        localStorage.setItem('context',JSON.stringify(context))
    },[context])
  return (
    <stateContext.Provider value={{context,setContext}}>
    {children}
    </stateContext.Provider>
  )
}
