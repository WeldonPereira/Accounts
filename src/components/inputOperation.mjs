import inquirer from "inquirer";
import error from "../../utils/errors.mjs";

const inputOperation = (handleAnswer) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then(handleAnswer)
    .catch((err) => error(err));
};

export default inputOperation;
