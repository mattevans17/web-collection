import classes from './Main.module.sass'
import Content from '../Content/Content'
import Menu from '../Menu/Menu'
import {MainContextProvider, MainContext} from "./MainContext"
import Loader from '../Loader/Loader'

const Main = () => {
    return (
        <MainContextProvider>
            <div className={classes.main}>
                <Menu />
                <Content />
                <MainContext.Consumer>
                    {value => value.isLoading &&
                        <div className={classes.LoaderBackground}>
                            <Loader />
                        </div>
                    }
                </MainContext.Consumer>
            </div>
        </MainContextProvider>
    )
}

export default Main