    const router=require('express').Router()
    const productController=require('../controllers/product.controller')

    const authCheck=require('../middleware/auth.middleware')()



    router.post("/create",authCheck.authenticateAPI,productController.createProduct)
    router.get("/list",authCheck.authenticateAPI,productController.productList)
 

    module.exports=router