import React from 'react';

interface BasketContextType {
    setBasketOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasketContext = React.createContext<BasketContextType>({ setBasketOpened: () => { } });

export default BasketContext;