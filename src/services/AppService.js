const db = require('../models');

class AppService {
    createAllCode(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.keyMap || !data.type || !data.valueVI) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.Allcode.create({
                    keyMap: data.keyMap,
                    type: data.type,
                    valueVI: data.valueVI,
                });

                return resolve({
                    errCode: 0,
                    msg: 'allcode created successfully',
                    data,
                });
            } catch (error) {
                console.log(error);
            }
        });
    }

    async getAllCodeByType(type) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                let allcode = [];

                if (type === 'all') {
                    allcode = await db.Allcode.findAll({
                        where: {},
                    });
                } else {
                    allcode = await db.Allcode.findAll({
                        where: {
                            type: type,
                        },
                    });
                }

                return resolve({
                    errCode: 0,
                    msg: 'allcode get successfully',
                    data: allcode,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateAllCode(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.keyMap || !data.type || !data.valueVI) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }
                await db.Allcode.update(
                    {
                        keyMap: data.keyMap,
                        type: data.type,
                        valueVI: data.valueVI,
                    },
                    {
                        where: {
                            keyMap: data.keyMap,
                        },
                    },
                );
                return resolve({
                    errCode: 0,
                    msg: 'allcode updated successfully',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteAllCodeByKeyMap(keyMap) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!keyMap) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }
                await db.Allcode.destroy({
                    where: {
                        keyMap: keyMap,
                    },
                });
                return resolve({
                    errCode: 0,
                    msg: 'allcode deleted successfully',
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async createTask(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.userId || !data.keyMap || !data.status || !data.timeStart) {
                    return reject({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.Task.create({
                    title: data.title,
                    desc: data.desc,
                    userId: data.userId,
                    keyMap: data.keyMap,
                    status: data.status,
                    timeStart: data.timeStart,
                });

                resolve({
                    errCode: 0,
                    msg: 'task created successfully',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async getTaskByType(type, idQuery, page, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

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

                if (!idQuery) {
                    idQuery = 'keyMap';
                }

                let task = [];
                if (type === 'all') {
                    task = await db.Task.findAll({
                        where: {},
                        offset,
                        limit: +limit,
                        include: [
                            { model: db.Allcode, as: 'taskData' },
                            { model: db.Allcode, as: 'statusData' },
                        ],
                    });
                } else {
                    task = await db.Task.findAll({
                        where: {
                            [idQuery]: type,
                        },
                        offset,
                        limit: +limit,
                        include: [
                            { model: db.Allcode, as: 'taskData' },
                            { model: db.Allcode, as: 'statusData' },
                        ],
                    });
                }

                let count;

                if (type === 'all') {
                    count = await db.Task.count({
                        where: {},
                    });
                } else {
                    count = await db.Task.count({
                        where: {
                            [idQuery]: type,
                        },
                    });
                }

                if (+countQuery >= +count) {
                    isValidNextPage = false;
                    NextPage = null;
                }

                resolve({
                    errCode: 0,
                    msg: 'task get successfully',
                    data: task,
                    TotalRecords: count,
                    isValidNextPage,
                    currentPage: page,
                    NextPage,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateTask(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id || !data.status || !data.timeDone) {
                    return reject({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.Task.update(
                    {
                        status: data.status,
                        timeDone: data.timeDone,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );
                resolve({
                    errCode: 0,
                    msg: 'task updated successfully',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteTaskByID(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }
                await db.Task.destroy({
                    where: {
                        id: id,
                    },
                });
                resolve({
                    errCode: 0,
                    msg: 'task deleted successfully',
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async GetAllCateGories(type = 'no-product') {
        return new Promise(async (resolve, reject) => {
            try {
                let data;

                if (type === 'no-product') {
                    data = await db.Categories.findAll();
                }

                if (type === 'product') {
                    data = await db.Categories.findAll({
                        include: [
                            {
                                model: db.Product,
                                as: 'ProData',
                                where: {
                                    isDeleted: 'not-delete',
                                },
                            },
                        ],
                    });
                }

                resolve({
                    errCode: 0,
                    msg: 'success',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async UploadImageProduct(filename) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!filename) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    filename,
                });

                resolve({
                    errCode: 0,
                    msg: 'success',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async createNewProduct(data, file) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.name || !data.price || !data.category || !data.description || !file) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const dataRes = await db.Product.create({
                    image: file?.filename,
                    name: data.name,
                    price: data.price,
                    category: data.category,
                    description: data.description,
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    dataRes: dataRes,
                });

                resolve({
                    errCode: 0,
                    msg: 'success',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllProductLimit(page, limit, idQuery = 'not-delete') {
        return new Promise(async (resolve, reject) => {
            try {
                if (!page) {
                    page = 1;
                }

                if (!limit) {
                    limit = 10;
                }

                const offset = (page - 1) * limit;
                let isValidNextPage = true;
                let countQuery = page * limit;
                let NextPage = +page + 1;

                const data = await db.Product.findAll({
                    offset,
                    limit: +limit,
                    where: {
                        isDeleted: idQuery,
                    },
                    include: [{ model: db.Categories, as: 'CateData' }],
                });

                if (!data) {
                    return resolve({
                        errCode: 3,
                        msg: 'Product not found',
                    });
                }

                const count = await db.Product.count({
                    where: {
                        isDeleted: idQuery,
                    },
                });

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

    async updateProduct(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id || !data.image || !data.name || !data.price || !data.category || !data.description) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.Product.update(
                    {
                        name: data.name,
                        price: data.price,
                        sale: data.sale,
                        amount: data.amount,
                        category: data.category,
                        description: data.description,
                        image: data.image,
                        unixTask: data.unixTask,
                        rate: data.rate,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'product successfully updated',
                    data: data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteOrRestoreProduct(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.type || !data.id) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                await db.Product.update(
                    {
                        isDeleted: data?.type === 'restore' ? 'not-deleted' : 'delete',
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'success',
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async CreateNewCateGories(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.name) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing name',
                    });
                }

                await db.Categories.create({
                    name: data.name,
                });

                return resolve({
                    errCode: 0,
                    msg: 'create successfully new category',
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateCateGories(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.name || !data.name) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const ResCate = await db.Categories.update(
                    {
                        name: data.name,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'Update successfully category',
                    data: ResCate,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteCateGoriesById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const ResCate = await db.Categories.destroy({
                    where: {
                        id: id,
                    },
                });

                resolve({
                    errCode: 0,
                    msg: 'delete successfully category',
                    data: ResCate,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new AppService();
