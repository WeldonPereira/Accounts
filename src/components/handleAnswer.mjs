import createAccount from "./create_account/createAccount.mjs";
import deposit from "../components/deposit/deposit.mjs"

const actionsList = {
  "Criar Conta": createAccount,
  "Consultar Saldo": createAccount,
  "Depositar": deposit,
  "Sacar": createAccount,
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
