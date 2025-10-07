import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import authorRoutes from "./routes/author.routes";
import bookRoutes from "./routes/book.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();
app.use(cors());
app.use(express.json());


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API de biblioteca com Express, TypeScript, Prisma e Swagger",
    },
  },
  apis: ["./src/routes/*.ts"], 
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
