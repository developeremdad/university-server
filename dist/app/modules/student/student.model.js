"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
    },
    fatherOccupation: {
        type: String,
    },
    fatherContactNo: {
        type: String,
    },
    motherName: {
        type: String,
    },
    motherOccupation: {
        type: String,
    },
    motherContactNo: {
        type: String,
    },
});
const localGuardian = new mongoose_1.Schema({
    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
});
// Student schema
const studentSchema = new mongoose_1.Schema({
    name: nameSchema,
    gender: ['male', 'female'],
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: guardianSchema,
    localGuardian: localGuardian,
    profileImg: {
        type: String,
        required: true,
    },
    isActive: ['active', 'block'],
});
exports.StudentModel = (0, mongoose_1.model)('student', studentSchema);
