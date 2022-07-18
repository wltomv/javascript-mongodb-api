import Express from "express";

import * as candidateController from '../Controller/candidate.controller'
const checkAuth = require('../middlewares/roleAuth')
const router = Express.Router()


router.post('/', checkAuth(['']), candidateController.newCandidate)
router.get('/:id_eleccion', checkAuth(['']), candidateController.getCandidates)
router.patch('/:id_eleccion', checkAuth(['']), candidateController.getCandidates)
router.delete('/:id_eleccion', checkAuth(['']), candidateController.getCandidates)
export default router;