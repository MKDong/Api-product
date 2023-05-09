const AppService = require('../services/AppService');

class AppController {
    async createAllCode(req, res) {
        try {
            const data = await AppService.createAllCode(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async getAllCodeByType(req, res) {
        try {
            const data = await AppService.getAllCodeByType(req.query.type);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async updateAllCode(req, res) {
        try {
            const data = await AppService.updateAllCode(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async deleteAllCodeByKeyMap(req, res) {
        try {
            const data = await AppService.deleteAllCodeByKeyMap(req.body.keyMap);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    // task
    async createTask(req, res) {
        try {
            const data = await AppService.createTask(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async getTaskByType(req, res) {
        try {
            const data = await AppService.getTaskByType(
                req.query.type,
                req.query.idQuery,
                req.query.page,
                req.query.limit,
            );

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async updateTask(req, res) {
        try {
            const data = await AppService.updateTask(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async deleteTaskByID(req, res) {
        try {
            const data = await AppService.deleteTaskByID(req.body.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async GetAllCateGories(req, res) {
        try {
            const data = await AppService.GetAllCateGories(req.query.type);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }
    async UploadImageProduct(req, res) {
        try {
            const data = await AppService.UploadImageProduct(req.file.filename);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async createNewProduct(req, res) {
        try {
            const data = await AppService.createNewProduct(req.body, req.file);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async getAllProductLimit(req, res) {
        try {
            const data = await AppService.getAllProductLimit(req.query.page, req.query.limit, req.query.idQuery);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const data = await AppService.updateProduct(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async deleteOrRestoreProduct(req, res) {
        try {
            const data = await AppService.deleteOrRestoreProduct(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async CreateNewCateGories(req, res) {
        try {
            const data = await AppService.CreateNewCateGories(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async updateCateGories(req, res) {
        try {
            const data = await AppService.updateCateGories(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async deleteCateGoriesById(req, res) {
        try {
            const data = await AppService.deleteCateGoriesById(req.params.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }
}

module.exports = new AppController();
