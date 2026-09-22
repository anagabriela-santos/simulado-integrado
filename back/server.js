const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

// GABARITO

const gabarito = {
    "1": "B",
    "2": "B",
    "3": "C",
    "4": "B",
    "5": "B",
    "6": "B",
    "7": "B",
    "8": "B",
    "9": "C",
    "10": "B",
    "11": "A",
    "12": "B",
    "13": "A",
    "14": "B",
    "15": "A",
    "16": "B",
    "17": "C",
    "18": "B",
    "19": "B",
    "20": "C",
    "21": "B",
    "22": "C",
    "23": "B",
    "24": "B",
    "25": "B",
    "26": "B",
    "27": "B",
    "28": "C",
    "29": "B",
    "30": "C",
    "31": "B",
    "32": "C",
    "33": "B",
    "34": "D",
    "35": "C"
};

//ROTA DE CORREÇÃO

app.post("/api/corrigir", (req, res) => {

    const respostas = req.body.respostas;

    let acertos = 0;

    for (let i = 1; i <= 35; i++) {

        if (respostas[i] === gabarito[i]) {
            acertos++;
        }
    }

    const total = 35;

    const percentual =
        ((acertos / total) * 100).toFixed(1);

    res.json({
    acertos,
    total,
    percentual,
    gabarito
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});