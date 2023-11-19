const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/Front")));

let nomes = []; // banco de dados
// CRUD
// CREATE
app.post("/cadastroNome", (req, res) => {
	let { nome } = req.body;

	nome = nome.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	if (!nomes.includes(nome)) {
		nomes.push(nome);
	}

	res.status(200).sendFile(path.join(__dirname, "/Front/index.html"));
});

// READ
app.get("/mostrarNomes", (req, res) => {
	res.status(200).json(nomes);
});

app.get("/cadastroNome", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "/Front/index.html"));
});

// UPDATE
app.put("/atualizarNome", (req, res) => {
	let { nomeAnterior, nome } = req.body;

	const index = nomes.findIndex((nome) => nome === nomeAnterior);
	
	if (index < 0) {
		res.status(404).sendFile(path.join(__dirname, "/Front/index.html"));
	}
	
	nome = nome.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	nomes[index] = nome;

	res.status(200).sendFile(path.join(__dirname, "/Front/index.html"));
});

// DELETE
app.delete("/excluirNome/:nome", (req, res) => {
	const { nome } = req.params;

	const index = nomes.findIndex((n) => n === nome);

	nomes.splice(index, 1);

	res.status(200).sendFile(path.join(__dirname, "/Front/index.html"));
})

app.listen(3000, () => {
	console.log("Server is running on port 3000!!!");
});
