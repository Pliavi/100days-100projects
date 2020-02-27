/*
###################
# FREELANCE CALC
###################
*/
/**
 *
 * @param {String} inputId - The HTMLElement ID
 */
const getFloatFromInput = inputId => {
  const $input = document.getElementById(inputId);
  const cleanedValue = $input.value.replace(",", ".");

  return parseFloat(cleanedValue);
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const calculate = () => {
  const projectValue = getFloatFromInput("projectValueInput");
  const workDays = getFloatFromInput("workDaysInput");
  const dailyWorkingHours = getFloatFromInput("dailyWorkingHoursInput");
  const vacationDays = getFloatFromInput("vacationDaysInput");
  // Calc by danielhe4rt 
  const hourValue =
    projectValue / (workDays * 4 * dailyWorkingHours) +
    vacationDays * workDays * dailyWorkingHours;

  const $freelaPricePanel = document.getElementById("result");

  $freelaPricePanel.innerText = moneyFormatter.format(hourValue || 0);
};

/*
###################
# INFORMATION PART
###################
*/
const inputInformations = [
  {
    title: "Tempo diário investido no projeto",
    body:
      "Agora vamos entender um pouco mais sobre esses fatores começando pelo fator tempo diário investido. Quando tratamos de freelances, há uma certa demanda do seu tempo em off. Ou seja: depois do trabalho, escola ou aquele tempinho vago no final do dia que você usa pra relaxar e descontrair. Esse tempo é algo muito valioso para qualquer pessoa, certo? Então claramente temos que levar esse fator em consideração."
  },
  {
    title: "Dias efetivos trabalhando",
    body:
      "Outro fator é a quantidade de dias efetivos que você irá disponibilizar para trabalhar no projeto. Não há nenhuma garantia que você poderá trabalhar todos os dias e de fato lidar com o processo de confirmar tudo com o cliente. Logo, você terá que cotar uma quantidade de dias específicos para lidar com todo o processo, sendo ele a parte comercial e desenvolvimento."
  },
  {
    title: "Dias de Férias por projeto",
    body:
      'Qualquer modalidade de trabalho, seja CLT ou PJ, há seus encargos referentes à verba de férias e não seria diferente para lidar com um freela. Uma parte do valor da sua hora reflete diretamente na quantidade de dias que você deseja tirar "férias" com o valor total projeto.'
  },
  {
    title: "Valor total do Projeto",
    body:
      "Não podemos esquecer do principal fator que é o total a ser recebido pelo freela. A partir desse valor, do quanto você desejaria ganhar em cima do trabalho, é feito o cálculo maior."
  }
];

document.querySelectorAll(".input-control > input").forEach(($input, i) => {
  /**
   *
   * @param {EventTarget|Element} el
   */
  const getGrandParentElement = $el => $el.parentElement.parentElement;
  const $inputInfoTitle = document.getElementById("input-info-title");
  const $inputInfoBody = document.getElementById("input-info-body");
  $inputInfoTitle.innerText = inputInformations[0].title;
  $inputInfoBody.innerText = inputInformations[0].body;

  $input.addEventListener("focus", ({ target: $target }) => {
    getGrandParentElement($target).classList.add("border-purple-600");

    $inputInfoTitle.innerText = inputInformations[i].title;
    $inputInfoBody.innerText = inputInformations[i].body;
  });

  $input.addEventListener("blur", ({ target: $target }) =>
    getGrandParentElement($target).classList.remove("border-purple-600")
  );

  $input.addEventListener("change", calculate);
  $input.addEventListener("keyup", calculate);
});
