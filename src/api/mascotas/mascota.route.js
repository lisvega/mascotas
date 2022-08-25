const MascotaRoutes = require("express").Router();
const { authorize } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

const {
    getAllMascotas,
    getMascotaByID,
    createMascota,
    updateMascota,
    deleteMascota,
} = require("./acoustic.controller");

MascotaRoutes.get("/", getAllMascotas);
MascotaRoutes.get("/:id", getMascotaByID);
MascotaRoutes.post("/create", [authorize], upload.single("image"), createMascota);
MascotaRoutes.patch("/:id", [authorize], upload.single("image"), updateMascota);
MascotaRoutes.delete("/:id", [authorize], deleteMascota);

module.exports = MascotaRoutes;
