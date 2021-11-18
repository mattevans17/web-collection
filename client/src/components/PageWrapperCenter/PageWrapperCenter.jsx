import classes from './PageWrapperCenter.module.sass'

const PageWrapperCenter = ({children}) => {
    return (
        <div className={classes.page}>
            <div className={classes.center}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapperCenter;