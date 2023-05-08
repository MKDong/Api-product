const userController = require('../controller/userController');
const Router = require('express').Router();
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./src/', 'public/image'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const userRouter = (app) => {
    // handle user registration

    Router.post('/register', userController.createNewUser);
    Router.post('/register-admin', userController.createNewUser);
    Router.get('/get-all-user-limit', userController.getAllUsersLimit);
    Router.put('/update-user-by-id', userController.updateUserByID);
    Router.delete('/delete-user-by-id/:id', userController.deleteUserByID);
    Router.post('/user-login', userController.UserLogin);

    // upload avatar
    Router.post('/upload-avatar', upload.single('avatar'), userController.uploadAvatar);

    app.use('/api/user/v1', Router);
};

module.exports = userRouter;
