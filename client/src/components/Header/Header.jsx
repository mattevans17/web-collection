import classes from './Header.module.sass';
import Logo from '../Logo/Logo';
import CurrentCollection from '../CurrentCollection/CurrentCollection';

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.left}>
                <Logo/>
            </div>
            <div className={classes.right}>
                <CurrentCollection />
            </div>
        </div>
    );
};

export default Header;