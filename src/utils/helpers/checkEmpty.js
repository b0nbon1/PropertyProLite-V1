const checkEmpty = (obj) => {
    // eslint-disable-next-line arrow-parens
    Object.keys(obj).forEach((key) => (obj[key] === '' || obj[key] == null) && delete obj[key]);
};

export default checkEmpty;
