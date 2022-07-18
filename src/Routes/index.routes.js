import Express from "express";
const router= Express.Router()


router.get("/" ,(req,res)=>{
    return res.status(200).json({
        success:true,
        message: 'Request successfull'
    })
})


export default router;