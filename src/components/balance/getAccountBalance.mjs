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

const getAccountBalance = () => {
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
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        `O saldo atual da conta "${accountName}" é: R$${accountData.balance}`
      );
    })
    .catch((err) => error(err));
};

export default getAccountBalance;
