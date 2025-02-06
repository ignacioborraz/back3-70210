import swaggerJsDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const opts = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CoderCommerce70210 API",
      description: "Documentarion of CoderCommerce",
    },
  },
  apis: [__dirname + "/src/docs/*.doc.yaml"],
};

const docSpec = swaggerJsDoc(opts);
export default docSpec;
