const MascotaRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const upload = require("../../middleware/file");

const {
    getAllMascotas,
    getMascotaByID,
    createMascota,
    updateMascota,
    deleteMascota,
} = require("./mascota.controller");

MascotaRoutes.get("/", getAllMascotas);
MascotaRoutes.get("/:id", getMascotaByID);
MascotaRoutes.post("/create", [authorize], upload.single("image"), createMascota);
MascotaRoutes.patch("/:id", [authorize], upload.single("image"), updateMascota);
MascotaRoutes.delete("/:id", [authorize], deleteMascota);

module.exports = MascotaRoutes;
