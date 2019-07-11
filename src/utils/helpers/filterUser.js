const filterPass = (raw) => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...data } = raw;
    return data;
};

export default filterPass;
