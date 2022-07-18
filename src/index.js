import Express from "express";
import Cors from 'cors'
import Morgan from 'morgan'
import indexRouter from './Routes/index.routes'
import candidateRouter from './Routes/candidate.routes'
const path = require("path")



import './connection'
// swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Servicio de candidatos",
            version: "1.0.0",
            description: "Servicio para la creación  y consulta de opciones o candidatos para una elección específica",
            contact: {
                name: "SA - API"
            }
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{
            jwt: []
        }],
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./docs/*.yaml")}`]
}



const app = Express()
//middlewares
app.use(Cors())
app.use(Morgan('tiny'))
app.use(Express.json())
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//routes
app.use("/", indexRouter)
app.use("/candidate", candidateRouter)


const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = { app, server }
