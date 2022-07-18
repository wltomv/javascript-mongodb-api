import { Schema, model } from 'mongoose'
import Joi, { any, required, string } from 'joi'
const EleccionSchema = new Schema({
    id_eleccion: {
        type: String,
        required: true,
        trim: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    }
})

const CandidateSchema = new Schema({
    eleccion: {
        type: EleccionSchema,
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    metadata: {
        type: Array,
        required: true,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const joiSchema = Joi.object({
    eleccion: Joi.object().keys({
        id_eleccion: Joi.string().required(),
        titulo: Joi.string().required()
    }).required(),
    titulo: Joi.string().required(),
    imagen: Joi.string().required(),
    metadata: Joi.array().items(Joi.object()).required()
})

export const validateCandidate = (candidate) => joiSchema.validate(candidate)

export default model('Candidate', CandidateSchema)