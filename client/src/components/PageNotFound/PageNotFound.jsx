import classes from './PageNotFound.module.sass';

const PageNotFound = () => {
    return (
        <div className={classes.PageNotFound}>
            <p className={classes.text}>Страница не найдена!</p>
            <p className={classes.code}>404</p>
        </div>
    );
};

export default PageNotFound;