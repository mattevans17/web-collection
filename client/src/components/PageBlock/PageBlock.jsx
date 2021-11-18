import classes from './PageBlock.module.sass';

const PageBlock = ({children}) => {
    return (
        <div className={classes.PageBlock}>
            {children}
        </div>
    );
};

export default PageBlock;