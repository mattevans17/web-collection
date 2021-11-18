import {createContext, useMemo, useState} from 'react';

const Context = createContext()

const ContextProvider = ({children}) => {
    const [currentCollectionKey, setCurrentCollectionKey] = useState('all')

    const providerValue = useMemo(() => ({
        currentCollectionKey, setCurrentCollectionKey
    }), [currentCollectionKey])

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider};