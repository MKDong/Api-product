const path = require('path');
const appController = require('../controller/appController');
const Router = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./src/', 'public/image'));
    },
    filename: function (req, file, cb) {
        // console.log(req);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

const appRouter = (app) => {
    // home public
    Router.get('/', (req, res) => {
        res.send(
            `<img src="http://localhost:8080/image/avatar-1682389090538-14558186" style="width : 200px; height: 300px ; object-fit: contain;" />`,
        );
    });

    // all code

    Router.post('/create-all-code', appController.createAllCode);
    Router.get('/get-all-all-code-by-type', appController.getAllCodeByType);
    Router.put('/update-all-code', appController.updateAllCode);
    Router.post('/delete-all-code-by-key-map', appController.deleteAllCodeByKeyMap);

    // task
    Router.post('/create-task', appController.createTask);
    Router.get('/get-task-by-type', appController.getTaskByType);
    Router.put('/update-task', appController.updateTask);
    Router.post('/delete-task-by-id', appController.deleteTaskByID);

    // categories
    Router.get('/get-all-categories', appController.GetAllCateGories);
    Router.post('/create-new-cate', appController.CreateNewCateGories);
    Router.put('/update-categories', appController.updateCateGories);
    Router.delete('/delete-categories-by-id/:id', appController.deleteCateGoriesById);

    // products
    Router.post('/create-new-product', upload.single('image'), appController.createNewProduct);
    Router.get('/get-all-product-limit', appController.getAllProductLimit);
    Router.put('/update-product', appController.updateProduct);
    Router.put('/delete-or-restore-product', appController.deleteOrRestoreProduct);

    // upload image
    Router.post('/upload-image', upload.single('image'), appController.UploadImageProduct);

    app.use('/api/app/v1', Router);
};

module.exports = appRouter;
