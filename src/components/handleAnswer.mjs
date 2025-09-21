import createAccount from "./create_account/createAccount.mjs";
import deposit from "../components/deposit/deposit.mjs"
import balance from "../components/balance/getAccountBalance.mjs"
import withdraw from "../components/withdraw/withdraw.mjs"

const actionsList = {
  "Criar Conta": createAccount,
  "Consultar Saldo": balance,
  "Depositar": deposit,
  "Sacar": withdraw,
  "Sair": () => {
    console.log("Obrigado por usar o Accounts!");
    process.exit();
  },
};

const handleAnswer = (answers) => {
  const { action } = answers;

  const selectedAction = actionsList[action];
  if (selectedAction) {
    selectedAction();
  }
};

export default handleAnswer;
