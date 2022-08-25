const Mascota = require("./mascota.model");
const { setError } = require("../../helpers/errors");
const { deleteFile } = require("../../middlewares/delete-file");

const getAllMascotas = async (req, res, next) => {
    try {
        const mascotas = await Mascota.find().sort({ createdAt: "desc" });
        return res.status(200).json({
            message: "All Mascotas ",
            mascotas,
        });
    } catch (error) {
        return next(
            setError(500, error.message | "Failed recovering all mascota")
        );
    }
};

const getMascotaByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findById(id);
        if (!mascota) {
            return next(setError(404, error.message | "Mascota not found"));
        }
        return res.status(200).json({
            message: "Mascota by ID",
            mascota,
        });
    } catch (error) {
        return next(
            setError(500, error.message | "Failed recovering mascota  by ID")
        );
    }
};

const createMascota = async (req, res, next) => {
    try {
        const mascota = new Mascota(req.body);
        if (req.file) {
            mascota.image = req.file.path;
        }
        const mascotaInDB = await mascota.save();
        return res.status(201).json({
            message: "Mascota created",
            mascotaInDB,
        });
    } catch (error) {
        return next(
            setError(500, error.message | "Failed creating mascota")
        );
    }
};

const updateMascota = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mascota = new Mascota(req.body);
        mascota._id = id;
        if (req.file) {
            mascota.image = req.file.path;
        }
        const updatedMascota = await Mascota.findByIdAndUpdate(id, mascota);
        if (!updatedMascota) {
            return next(setError(404, "Mascota not found"));
        }
        return res.status(201).json({
            message: "Mascota updated",
            updateMascota,
        });
    } catch (error) {
        return next(
            setError(500, error.message | "Failed updating mascota")
        );
    }
};

const deleteMascota = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedMascota = await Mascota.findByIdAndDelete(id);
        if (deleteMascota.image) {
            deleteFile(deleteMascota.image);
        }
        if (!deletedMascota) {
            return next(setError(404, "Mascota not found"));
        }
        return res.status(200).json({
            message: "Mascota  deleted",
            deleteMascota,
        });
    } catch (error) {
        return next(
            setError(500, error.message | "Failed deleting mascota")
        );
    }
};

module.exports = {
    getAllMascotas,
    getMascotaByID,
    createMascota,
    updateMascota,
    deleteMascota,
};
