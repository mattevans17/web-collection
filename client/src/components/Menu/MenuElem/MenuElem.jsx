import classes from "./MenuElem.module.sass"
import {memo} from "react";

const MenuElem = ({isActive=false, collectionName, onEdit, icon, isUnchangeable=false, ...props}) => {
    return (
        <div className={[classes.menuElem, isActive ? classes.menuElem_active : ''].join(' ')} {...props}>
            <div className={classes.iconWrapper}>
                <img className={classes.icon} src={icon} alt={''} />
            </div>
            <div className={[
                classes.name,
                isActive ? classes.name_active : '',
                isUnchangeable || isActive ? classes.name_maxWidth : ''
            ].join(' ')}>
                {collectionName}
            </div>
            {!isUnchangeable && isActive &&
                <div className={classes.editIconWrapper}>
                    <div className={classes.editIcon} onClick={onEdit} />
                </div>
            }
        </div>
    )
}

export default memo(MenuElem)