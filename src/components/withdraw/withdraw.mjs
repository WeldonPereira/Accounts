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

const withdraw = () => {
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
        return withdraw();
      }

      inquirer
        .prompt([{ name: "amount", message: "Qual valor você deseja sacar?" }])
        .then((answer) => {
          const { amount } = answer;

          if (isNaN(amount) || Number(amount) <= 0) {
            console.log("Valor inválido! Digite um número maior que zero.");
            return withdraw();
          }

          const accountData = getAccount(accountName);

          if (Number(accountData.balance) < Number(amount)) {
            console.log(
              `Saldo insuficiente! Seu saldo atual é R$${accountData.balance}`
            );
            return withdraw();
          }

          accountData.balance = Number(accountData.balance) - Number(amount);

          saveAccount(accountName, accountData);

          console.log(
            `Saque de R$${amount} realizado com sucesso!\nNovo saldo: R$${accountData.balance}`
          );
        })
        .catch((err) => error(err));
    })
    .catch((err) => error(err));
};

export default withdraw;
