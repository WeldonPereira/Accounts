import fs from "fs";
import chalk from "chalk";

export const ensureAccountsDir = () => {
  if (!fs.existsSync("accounts")) {
    fs.mkdirSync("accounts");
  }
};

export const accountExists = (accountName) =>
  fs.existsSync(`accounts/${accountName}.json`);

export const saveAccount = (accountName) => {
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify({ balance: 0 }, null, 2)
  );
  console.log(chalk.green(`Conta "${accountName}" criada com sucesso!`));
};
