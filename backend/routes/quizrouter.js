const express = require("express")
const { model } = require("mongoose")
const { insertDB, quizDb } = require("../controller/Dbcontoller")
const { Signup, Login } = require("../controller/authcontroller")
const {  quizlist, insertquiz } = require("../controller/quizcontrooler")
const { insertHMTL, HTMLlist } = require("../controller/HTMLcontroller")
const { insertCSS, CSSlist } = require("../controller/CSScontroller")

let Router = express.Router()
let DbRouter = express.Router()
let HTMLRouter = express.Router()
let CSSRouter = express.Router()
let authrouter = express.Router()

Router.post("/insert",insertquiz)
Router.get("/list",quizlist)
DbRouter.post("/insert",insertDB)
DbRouter.get("/list",quizDb)
HTMLRouter.post("/insert",insertHMTL)
HTMLRouter.get("/list",HTMLlist)
CSSRouter.post("/insert",insertCSS)
CSSRouter.get("/list",CSSlist)
authrouter.post("/signup",Signup)
authrouter.post("/login",Login)


module.exports={DbRouter,Router,HTMLRouter,CSSRouter,authrouter}