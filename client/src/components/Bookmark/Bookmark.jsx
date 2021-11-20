import classes from './Bookmark.module.sass'

const Bookmark = ({bookmark, isSelected, ...props}) => {
    return (
        <a className={classes.Bookmark + ' ' + (isSelected && classes.Bookmark_selected)} 
            href={bookmark.url} 
            target="_blank"
            rel="noreferrer nofollow noopener"
            {...props}
        >
            <img className={classes.icon} src={bookmark.icon} />
            <div className={classes.description}>
                <p className={classes.title}>{bookmark.title}</p>
                <div className={classes.info}>
                    <p className={classes.url}>{bookmark.url}</p>
                    <p className={classes.datetime}>
                        <span>{bookmark.date}</span>
                        <span>, </span>
                        <span className={classes.time}>{bookmark.time}</span>
                    </p>
                </div>
            </div>
        </a>
    )
}

export default Bookmark
