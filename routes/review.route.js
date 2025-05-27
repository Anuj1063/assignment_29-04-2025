    const router=require('express').Router()
    const reviewController=require('../controllers/review.controller')

    const authCheck=require('../middleware/auth.middleware')()



    router.post("/create",reviewController.createReview)
    router.get("/list",reviewController.reviewDetails)
 

    module.exports=router