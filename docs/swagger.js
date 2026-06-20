const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Blogging Platform API",
            version: "1.0.0",
            description: "Backend API for user authentication and blog posts",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },

    security: [
        {
            bearerAuth: [],
        },
    ],

    apis: ["./routes/*.js"], // we will document routes here
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;