import inquirer from "inquirer";
import error from "../../../utils/errors.mjs";
import checkAccount from "../checkAccount.mjs";

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
        return deposit();
      }
    })
    .catch((err) => error(err));
};

export default deposit;
