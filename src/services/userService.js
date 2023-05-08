const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class userService {
    createNewUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    // !data.firstName ||
                    // !data.lastName ||
                    !data.email ||
                    // !data.phoneNumber ||
                    // !data.address ||
                    // !data.avatar ||
                    !data.password
                ) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const CheckEmailExits = await this.checkEmailExists(data.email);

                if (CheckEmailExits) {
                    return resolve({
                        errCode: 3,
                        msg: 'email already exists',
                    });
                }

                // handle api
                const hash = bcrypt.hashSync(data.password, saltRounds);

                await db.User.create({
                    email: data.email,
                    password: hash,
                });

                return resolve({
                    errCode: 0,
                    msg: 'user created successfully',
                    data,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    createNewUserAdmin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    // !data.firstName ||
                    // !data.lastName ||
                    !data.email ||
                    // !data.phoneNumber ||
                    // !data.address ||
                    // !data.avatar ||
                    !data.password
                ) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const CheckEmailExits = await this.checkEmailExists(data.email);

                if (CheckEmailExits) {
                    return resolve({
                        errCode: 3,
                        msg: 'email already exists',
                    });
                }

                // handle api
                const hash = bcrypt.hashSync(data.password, saltRounds);

                await db.User.create({
                    email: data.email,
                    password: hash,
                    role: 1,
                });

                return resolve({
                    errCode: 0,
                    msg: 'user created successfully',
                    data,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    async UserLogin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email || !data.password) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const userData = {};
                const isExist = await this.checkEmailExists(data.email);

                if (isExist) {
                    const user = await db.User.findOne({
                        where: { email: data.email },
                        attributes: ['email', 'role', 'password', 'id'], // lấy ra những column cần lấy
                        raw: true, // nó sẽ trả luôn luôn cho ta một Object
                    });

                    if (user) {
                        //compare password
                        const check = await bcrypt.compareSync(data.password, user.password);

                        if (check) {
                            userData.errCode = 0;
                            userData.errMessage = 'Successfully';
                            delete user.password;
                            userData.user = user;
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = 'Wrong password';
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `User isn't not found`;
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Your 'email' isn't exit in your system. Plz try other email`;
                }

                resolve(userData);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getAllUsersLimit(page, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!page) {
                    page = 1;
                }

                if (!limit) {
                    limit = 5;
                }

                const offset = (page - 1) * limit;
                let isValidNextPage = true;
                let countQuery = page * limit;
                let NextPage = +page + 1;

                const data = await db.User.findAll({
                    offset,
                    limit: +limit,
                    attributes: {
                        exclude: ['password'],
                    },
                });

                if (!data) {
                    return resolve({
                        errCode: 3,
                        msg: 'Product not found',
                    });
                }

                const count = await db.User.count();

                if (+countQuery >= +count) {
                    isValidNextPage = false;
                    NextPage = null;
                }

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                    TotalRecords: count,
                    isValidNextPage,
                    currentPage: page,
                    NextPage,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    async updateUserByID(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id || !data.email || !data.username) {
                    return reject({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.User.update(
                    {
                        email: data.email,
                        username: data.username,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                const userUpdate = await db.User.findOne({
                    where: {
                        id: data.id,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                });

                resolve({
                    errCode: 0,
                    msg: 'user updated successfully',
                    data: userUpdate,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    async deleteUserByID(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({
                        errCode: 1,
                        msg: 'id is required',
                    });
                }
                const dataDelete = await db.User.destroy({
                    where: {
                        id: id,
                    },
                });
                resolve({
                    errCode: 0,
                    msg: 'user deleted successfully',
                    data: dataDelete,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    async uploadAvatar(data, file) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!file || !data.id) {
                    return reject({
                        errCode: 1,
                        msg: 'avatar or id is required',
                    });
                }

                const userData = await db.User.update(
                    {
                        avatar: file.filename,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'avatar updated successfully',
                    data: userData,
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    async checkEmailExists(email) {
        return new Promise(async (resolve, reject) => {
            if (!email) {
                return resolve({
                    errCode: 1,
                    msg: 'email is required',
                });
            }

            const emailCheck = await db.User.findOne({
                where: {
                    email: email,
                },
            });

            if (emailCheck) {
                return resolve(true);
            } else {
                resolve(false);
            }
        });
    }
}

module.exports = new userService();
