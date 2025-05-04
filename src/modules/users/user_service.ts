// src/services/user_service.ts
import User, { IUser } from '../users/user_models.js';

export const saveMethod = () => {
    return 'Hola';
};
export const createUser = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
};

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id: string) => {
    return await User.findById(id);
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
    return await User.updateOne({ _id: id }, { $set: updateData });
};

export const deleteUser = async (id: string) => {
    return await User.deleteOne({ _id: id });
};
export const logIn = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
    }

    return {
        userId: user._id.toString(),
        name: user.name,
        email: user.email
    };

    return user; // Devuelve el usuario si las credenciales son correctas
};

 
export const ensureDefaultUser = async () => {
    try {
        const users = await User.find();
        let createdDefaultUser = false;
        let userWithPassword = false;

        if (users.length === 0) {
            // Si no hay usuarios, crea uno predeterminado
            await User.create({
                name: 'React',
                email: 'react@gmail.com',
                password: '1234', 
                age: 30
            });
            createdDefaultUser = true;
        } else {
            // Si hay usuarios, verifica que al menos 1 tenga "password"
            for (const user of users) {
                if (user.password) {
                    userWithPassword = true;
                }
            }
            if(!userWithPassword){
                await User.create({
                    name: 'React',
                    email: 'react@gmail.com',
                    password: '1234', 
                    age: 30
                });
            }
        }

    } catch (error) {
        console.error('Error al verificar o crear el usuario predeterminado:', error);
    }
};


// funcion para cambiar contraseña de un usuario
export const changePassword = async (userId: string, newPassword: string) => {
    try {
        const user = await User.findById(userId);
        console.log(userId, newPassword);
        console.log(user);
        if (!user) {
            throw new Error('Usuario no encontrado');
        } 
        user.password = newPassword;

        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error al cambiar la contraseña: ');
    }
};      