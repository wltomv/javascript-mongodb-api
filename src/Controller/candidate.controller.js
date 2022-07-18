import Candidate, { validateCandidate } from '../models/candidate'

export const newCandidate = async (req, res) => {

    const { error } = validateCandidate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error?.details[0]?.message
        })
    }

    try {
        const candidateProps = req.body
        const newCandidate = new Candidate(candidateProps);
        const candidateSave = await newCandidate.save();
        console.log(newCandidate);
        res.status(200).json(candidateSave)
    } catch (error) {
        res.status(500).json({
            code: error.codename,
            message: error.message || "Ocurrio un error al almacenar un candidato"
        })
    }
}

export const getCandidates = async (req, res) => {
    try {
        const election = req.params.id_eleccion
        const candidates = await Candidate.find({ 'eleccion.id_eleccion': election }, { _id: 0, createdAt: 0, updatedAt: 0 })
        res.json(candidates)
    } catch (error) {
        res.status(500).json({
            error,
            message: error.message || "Ocurrio un error al retornar los candidatos"
        })
    }
}