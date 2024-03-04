const ApiError = require("../api-error");
const UserService = require("../services/user");
const MongoDB = require("../utils/mongodb.util")
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        // console.log(req.body)
        const userService = new UserService(MongoDB.client);
        // console.log(userService)
        const document = await userService.create(req.body);
        // console.log(userService)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, `An error has occurred while creating new user with error '${error}'`))
    }
}

// exports.delete = (req, res) => {
//     res.send({ message: "delete handler" })
// }
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" })
}
// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite handler" })
// }
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        console.log(req.params.id)
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, `An error has occurred while retrieving users with error '${error}'`))
    }
    return res.send(documents)
}
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params)
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        console.log(document)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, `An error has occurred while retrieving user with ID = ${req.params.id}`))
    }
}
exports.update = async (req, res, next) => {
    // console.log(Object.keys(req.body))
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        // console.log(req.params.id)
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        console.log(document)
        if (!document) {
            return next(new ApiError(404, "user to update not found"));
        } else {
            return res.send({ message: "user has been updated successfully" });
        }
    } catch (error) {
        return next(new ApiError(500, `An error has occurred while updating user with ID = ${req.params.id}`))
    }
}
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user to delete not found"));
        } else {
            return res.send({ message: "user has been deleted successfully" });
        }
    } catch (error) {
        return next(new ApiError(500, `An error has occurred while deleting user with ID = ${req.params.id}`))
    }
}
// exports.deleteAll = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoDB.client);
//         const document = await contactService.deleteAll();
//         return res.send({ message: "All contact have been deleted successfully" });
//     } catch (error) {
//         return next(new ApiError(500, `An error has occurred while deleting contact with ID = ${req.params.id}`))
//     }
// }
// exports.findAllFavorite = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoDB.client);
//         const documents = await contactService.findFavorite();
//         return res.send(documents)

//     } catch (error) {
//         return next(new ApiError(500, `An error has occurred while retrieving favorite contacts`))
//     }
// }