import fs from "fs";
import chalk from "chalk";

const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed("Esta conta não existe, por favor, escolha outro nome!")
    );
    return false;
  }
  return true;
};

export default checkAccount;
