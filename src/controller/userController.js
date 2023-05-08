const userService = require('../services/userService');

class userController {
    async createNewUser(req, res) {
        try {
            const data = await userService.createNewUser(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async createNewUserAdmin(req, res) {
        try {
            const data = await userService.createNewUserAdmin(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async UserLogin(req, res) {
        try {
            const data = await userService.UserLogin(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async getAllUsersLimit(req, res) {
        try {
            const data = await userService.getAllUsersLimit(req.query.page, req.query.limit);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async updateUserByID(req, res) {
        try {
            const data = await userService.updateUserByID(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async deleteUserByID(req, res) {
        try {
            const data = await userService.deleteUserByID(req.params.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                msg: `${JSON.stringify(error)}`,
            });
        }
    }

    async uploadAvatar(req, res) {
        try {
            const data = await userService.uploadAvatar(req.body, req.file);
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

module.exports = new userController();
