import React, { createContext, useState } from 'react'

export const FormsContext = createContext(null);

export default function FormsProvider({ children }) {
   const [isAddFormOpened, setAddFormOpened] = useState(false);
   const [isEditFormOpened, setEditFormOpened] = useState(false);
   const [isCardFormOpened, setCardFormOpened] = useState(false);
   const [selectedDeck, setDeckSelected] = useState(null);
   const [selectedCard, setCardSelected] = useState(null);

   return (
      <FormsContext.Provider value={{
         isAddFormOpened, setAddFormOpened,
         isEditFormOpened, setEditFormOpened,
         isCardFormOpened, setCardFormOpened,
         selectedDeck, setDeckSelected,
         selectedCard, setCardSelected,
      }}>
         {children}
      </FormsContext.Provider>
   )
}
