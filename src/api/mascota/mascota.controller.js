const Mascota = require("./mascota.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/token-action");
const { setError } = require("../../helpers/errors");
const { deleteFile } = require("../../middleware/delete-file");



const register = async (req, res, next) => {
    try {
        const newMascota = new Mascota(req.body);
        const petnameExist = await Mascota.findOne({ petname: newMascota.petname });
        if (petnameExist) {
            return next(setError(409, "Mascota created"));
        }
        if (req.file) {
            newMascota.image = req.file.path;
        }
        const mascotaInDB = await newMascota.save();
        res.status(201).json(mascotaInDB);
    } catch (error) {
        return next(setError(500, error.message || "Failed creating Mascota"));
    }
};



const login = async (req, res, next) => {
    try {
        const mascotaInDb = await Mascota.findOne({ petname: req.body.petname });
        if (!mascotaInDb) return next(setError(404, "Mascota not found"));

        if (bcrypt.compareSync(req.body.password, mascotaInDb.password)) {
            const token = createToken(mascotaInDb._id, mascotaInDb.password);
            return res.status(200).json({ mascotaInDb, token });
        } else {
            return next(setError(401, "Invalid password"));
        }
    } catch (error) {
        return next(setError(500, error.message || "Failed authenticating Mascota"));
    }
};



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
    register,
    login,
    getAllMascotas,
    getMascotaByID,
    updateMascota,
    deleteMascota,
};
