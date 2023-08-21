import React, { createContext, useState } from "react"

export const VakitaContext = createContext()
const VakitaProvider = ({ children }) => {



    const [dataVakita, setDataVakita] = useState([])

      const addNewVakita = (dataVakita) => {
        setDataVakita((prevDataVakita) => [...prevDataVakita, dataVakita]);
      };

      // console.log(dataVakita)

    return (
        <>
            <VakitaContext.Provider value={{  dataVakita, addNewVakita }}>
                {children}
            
            </VakitaContext.Provider>
        </>
    )
}
export default VakitaProvider