import classes from './Home.module.sass';
import Header from '../Header/Header';
import Main from '../Main/Main';
import {ContextProvider} from "./Context";

const Home = () => {
    return (
        <ContextProvider>
            <div className={classes.home}>
                <Header />
                <Main />
            </div>
        </ContextProvider>
    );
};

export default Home;