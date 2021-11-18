import classes from './Logo.module.sass'

const Logo = () => {
    return (
        <div className={classes.logo}>
            <div className={classes.icon} />
            <p className={classes.text}>Web-Collection</p>
        </div>
    )
}

export default Logo