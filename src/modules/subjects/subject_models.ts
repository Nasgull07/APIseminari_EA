import mongoose, { Schema, ObjectId } from "mongoose";

const subjectSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    teacher: {
        type: String,
        required : true
    },
    alumni: {
        type : [Schema.Types.ObjectId],
        ref: 'User',
        required : true
    }
});

export interface ISubject{
    name : string;
    teacher : string;
        alumni : ObjectId[];
}

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;