import {createContext, useMemo, useState} from 'react'

const Context = createContext()

const ContextProvider = ({children}) => {
    const [currentCollectionKey, setCurrentCollectionKey] = useState('all')
    const [login, setLogin] = useState('')
    const [isAccountOptionsOpen, setIsAccountOptionsOpen] = useState(false)

    const providerValue = useMemo(() => ({
        currentCollectionKey, setCurrentCollectionKey,
        login, setLogin,
        isAccountOptionsOpen, setIsAccountOptionsOpen
    }), [currentCollectionKey, login, isAccountOptionsOpen])

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}