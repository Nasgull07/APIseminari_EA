import Subject, {ISubject} from "./subject_models.js";

export const createSubject = async (subjectData: ISubject) => {
    const subject = new Subject(subjectData);
    return await subject.save();
};

export const getAllSubjects = async () => {
    return await Subject.find();
};

export const getSubjectById = async (id: string) => {
    return await Subject.findById(id);
};

export const getSubjectByName = async (name: string) => {
    try {
        const subject = await Subject.findOne({ name });
        return subject;
    } catch (error) {
        throw new Error('Error fetching subject by name');
    }
};

export const updateSubject = async (name: string, updatedData: any) => {
    try {
        const subject = await Subject.findOneAndUpdate({ name }, updatedData, { new: true });
        return subject;
    } catch (error) {
        throw new Error('Error updating subject by name');
    }
};

export const deleteSubject = async (id: string) => {
    return await Subject.deleteOne({ _id: id
    });
}


export const getUsersBySubjectName = async (name: string) => {
    try {
        const subject = await Subject.findOne({ name }).populate('alumni');
        if (!subject) {
            throw new Error('Subject not found');
        }
        return subject.alumni;
    } catch (error) {
        throw new Error('Error fetching users by subject name');
    }
};
