import { createContext } from 'react';

export const UpdateCartContext = createContext({
    updateCart: false,
    setUpdateCart: () => { }
});
