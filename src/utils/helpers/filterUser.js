const filterPass = (user) => {
    const password = ['password'];

    Object.keys(user)
        .filter(key => password.includes(key))
        .forEach(key => delete user[key]);

    return user;
};

export default filterPass;
