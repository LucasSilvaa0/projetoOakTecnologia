import express from "express";
import type { Request, Response } from "express";
import supabase from "./db";

const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
	console.log("Requisição GET recebida.");

	const response = await supabase.from("Produtos").select("*").order("valor");

	res.send(response.data);
});

app.post("/add_product", async (req: Request, res: Response) => {
	console.log("Requisição POST recebida.");

	console.log(req.body);
	const { nome, descricao, valor, disponivel } = req.body;

	const id =
		Number((await supabase.from("Produtos").select("*")).data?.length) + 1;

	console.log(id);

	const response = await supabase
		.from("Produtos")
		.insert({ id, nome, descricao, valor, disponivel });

	res.send(response.data);
});

app.listen(PORT, () => {
	console.log("Servidor está aberto.");
});
