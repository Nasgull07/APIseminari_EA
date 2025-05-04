// src/controllers/user_controller.ts
import { saveMethod, createUser, getAllUsers, getUserById, updateUser, deleteUser, logIn, changePassword } from '../users/user_service.js';

import express, { Request, Response } from 'express';

export const saveMethodHandler = async (req: Request, res: Response) => {
    try {
        const data = saveMethod();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await createUser(req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const data = await getAllUsers();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getUserById(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateUser(req.params.id, req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteUser(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const logInHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await logIn(email, password);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const changePasswordHandler = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { id: userId } = req.params;
        console.log('userId', userId);
        console.log('currentPassword', currentPassword);
        console.log('newPassword', newPassword);
        const user1 = await getUserById(userId);
        if (!user1) {
            console.error('Usuario no encontrado');
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Verifica si el usuario existe y la contraseña actual es correcta
        const user = await logIn(user1.email, currentPassword); // Reutiliza la lógica de logIn para validar la contraseña actual
        if (!user) {
            console.error('Contraseña actual incorrecta');
            console.log('Contraseña actual incorrecta');
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        // Cambia la contraseña
        console.log('Cambiando contraseña...');
        const updatedUser = await changePassword(userId, newPassword);
        return res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente', user: updatedUser });
    } catch (error: any) {
        // Asegúrate de que solo se envíe una respuesta en caso de error
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
        console.error('Error al cambiar la contraseña:', error);
    }
};
