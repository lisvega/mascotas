const express = require("express");
const MascotaRoutes = express.Router();
const { authorize } = require("../../middleware/auth");
const upload = require("../../middleware/file");

const {
    register,
    login,
    getAllMascotas,
    getMascotaByID,
    updateMascota,
    deleteMascota,
} = require("./mascota.controller");

MascotaRoutes.get("/", getAllMascotas);
MascotaRoutes.get("/:id", getMascotaByID);
MascotaRoutes.post("/register", [authorize], upload.single("image"), register);
MascotaRoutes.post("/login", login);
MascotaRoutes.patch("/:id", [authorize], upload.single("image"), updateMascota);
MascotaRoutes.delete("/:id", [authorize], deleteMascota);

module.exports = MascotaRoutes;
