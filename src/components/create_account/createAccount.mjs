import chalk from "chalk";
import inquirer from "inquirer";

import inputOperation from "../inputOperation.mjs";
import {
  ensureAccountsDir,
  accountExists,
  saveAccount,
} from "./accountService.mjs";
import error from "../../../utils/errors.mjs";

const createAccount = () => {
  console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"));

  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const { accountName } = answer;

      ensureAccountsDir();

      if (accountExists(accountName)) {
        console.log(
          chalk.bgRed.black(
            "Esta conta já existe, por favor, escolha outro nome!"
          )
        );
        return createAccount();
      }

      saveAccount(accountName);

      inputOperation();
    })
    .catch((err) => error(err));
};

export default createAccount;
