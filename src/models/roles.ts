import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    name: { type: String, required: true},
}, {
    timestamps: true
});

const Roles = model('Roles', roleSchema);

export default Roles;