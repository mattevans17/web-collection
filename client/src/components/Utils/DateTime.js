let current = new Date();

const format = (s) => {
    if (typeof(s) === 'number') s = String(s);
    if (s.length === 1) s = '0' + s;
    return s;
}

const getMonth = () => {
    return format(current.getMonth() + 1);
}

const getDate = () => {
    return format(current.getDate());
}

const getYear = () => {
    return String(current.getFullYear()).slice(2, 4);
}

const getFullDate = () => {
    return `${getDate()}/${getMonth()}/${getYear()}`;
}

const getTime = () => {
    return `${format(current.getHours())}:${format(current.getMinutes())}`;
}

export {getFullDate as getDate, getTime};