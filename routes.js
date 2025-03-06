import { Router } from "express";
import { getAllTasks, AddTask, UpdateTaskStatus, UpdateTask, deleteTask } from "./model/appManager.js";

const router = Router();

// Ajouter une tâche
router.post("/api/todo", (request, response) => {
    const tacheEntrée = request.body;
    try {
        const NouvelleTache = AddTask(tacheEntrée);
        response
            .status(200)
            .json({ NouvelleTache, message: "Tâche ajoutée avec succès" });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});
// Modifier le statut d'une tâche
router.patch("/api/task/:id/statut", (request, response) => {
    try {
        const id = parseInt(request.params.id, 10);
        const { statut } = request.body;
        const updatedTask = UpdateTaskStatus(id, statut);

        if (updatedTask) {
            response.status(200).json({ updatedTask, message: "Statut mis à jour avec succès" });
        } else {
            response.status(404).json({ message: "Tâche non trouvée" });
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});


export default router;
