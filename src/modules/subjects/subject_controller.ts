import {createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject, getSubjectByName, getUsersBySubjectName} from '../subjects/subject_service.js';

import express, { Request, Response } from 'express';

export const createSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await createSubject(req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSubjectsHandler = async (req: Request, res: Response) => {
    try {
        const data = await getAllSubjects();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubjectByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getSubjectById(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubjectByNameHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const subject = await getSubjectByName(name);
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ message: 'Subject not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const updateSubjectHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const updatedData = req.body;
        const updatedSubject = await updateSubject(name, updatedData);
        if (updatedSubject) {
            res.json(updatedSubject);
        } else {
            res.status(404).json({ message: 'Subject not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteSubject(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const getUsersBySubjectNameHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const users = await getUsersBySubjectName(name);
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};