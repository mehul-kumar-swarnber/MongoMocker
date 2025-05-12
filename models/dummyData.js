import mongoose from 'mongoose';

// Define the schema with correct types
const dummySchema = new mongoose.Schema({
    name: { type: String, required: true, default: 'ABC' },
    salary: { type: Number, required: true, default: 0 },
    language: { type: String, required: true, default: 'JS' },
    city: { type: String, required: true, default: 'NULL' },
    isManager: { type: Boolean, required: true, default: false } // Fixed the issue here
});

// Create the model from the schema
export const DummyData = mongoose.model('DummyData', dummySchema);
