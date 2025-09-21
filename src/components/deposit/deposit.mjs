import inquirer from "inquirer";
import error from "../../../utils/errors.mjs";
import checkAccount from "../checkAccount.mjs";

import fs from "fs";

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function saveAccount(accountName, accountData) {
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData, null, 2)
  );
}

const deposit = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const { accountName } = answer;

      if (!checkAccount(accountName)) {
        console.log("Conta não encontrada. Tente novamente.");
        return deposit();
      }

      inquirer
        .prompt([
          { name: "amount", message: "Qual valor você deseja depositar?" },
        ])
        .then((answer) => {
          const { amount } = answer;

          if (isNaN(amount) || Number(amount) <= 0) {
            console.log("Valor inválido! Digite um número maior que zero.");
            return deposit();
          }

          const accountData = getAccount(accountName);

          accountData.balance = Number(accountData.balance) + Number(amount);

          saveAccount(accountName, accountData);

          console.log(
            `Depósito de R$${amount} realizado com sucesso!\nNovo saldo: R$${accountData.balance}`
          );
        })
        .catch((err) => error(err));
    })
    .catch((err) => error(err));
};

export default deposit;
