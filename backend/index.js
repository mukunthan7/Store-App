import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productController from "./controllers/productController.js";
import supplierController from "./controllers/supplierController.js";
import transactionController from "./controllers/transcationController.js";
import distributionController from "./controllers/distributionController.js";
import stockController from "./controllers/stockController.js";

const app = Express();
const PORT = 4000 || process.env.PORT;


app.use(bodyParser.json());
app.use(cors());
app.use("/products", productController);
app.use("/suppliers", supplierController);
app.use("/transactions", transactionController);
app.use("/distributions", distributionController);
app.use("/stocks", stockController);

app.get("/", (req, res) => {
    res.send("Store API");
    }
);

app.listen(PORT, () => {
    console.log("Server started on port http://localhost:4000");
});