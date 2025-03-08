import express from 'express';
import { createSubjectHandler, getAllSubjectsHandler, getSubjectByIdHandler, getUsersBySubjectNameHandler, getSubjectByNameHandler, updateSubjectHandler, deleteSubjectHandler } from './subject_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/subjects:
 *   post:
 *     summary: Crea un nuevo tema
 *     description: Añade los detalles de un nuevo tema.
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tema creado exitosamente
 */
router.post('/subjects', createSubjectHandler); // Create a new subject

/**
 * @openapi
 * /api/subjects:
 *   get:
 *     summary: Obtiene todos los temas
 *     description: Retorna una lista de todos los temas.
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/subjects', getAllSubjectsHandler); // Get all subjects

/**
 * @openapi
 * /api/subjects/{id}:
 *   get:
 *     summary: Obtiene un tema por ID
 *     description: Retorna los detalles de un tema específico.
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
router.get('/subjects/:id', getSubjectByIdHandler); // Get subject by ID

/**
 * @openapi
 * /api/subjects/name/{name}:
 *   get:
 *     summary: Obtiene un tema por nombre
 *     description: Retorna los detalles de un tema específico.
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
router.get('/subjects/name/:name', getSubjectByNameHandler); // Get subject by name


/**
 * @openapi
 * /api/subjects/{name}:
 *   put:
 *     summary: Actualiza un tema
 *     description: Actualiza los detalles de un tema existente.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tema actualizado exitosamente
 */
router.put('/subjects/:name', updateSubjectHandler); // Update a subject by name

/**
 * @openapi
 * /api/subjects/{id}:
 *   delete:
 *     summary: Elimina un tema
 *     description: Elimina un tema existente.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tema eliminado exitosamente
 */
router.delete('/subjects/:id', deleteSubjectHandler); // Delete a subject

/**
 * @openapi
 * /api/subjects/{name}/users:
 *   get:
 *     summary: Obtiene todos los usuarios de un tema
 *     description: Retorna una lista de todos los usuarios de un tema específico.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   userName:
 *                     type: string
 */
router.get('/subjects/:name/users', async (req, res) => {
    const { name } = req.params;
    try {
        const users = await getUsersBySubjectNameHandler(req, res); // Assuming this function exists in your controller
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios del tema' });
    }
});

export default router;