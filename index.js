const chalk = require("chalk");
const inquirer = require("inquirer");

const { log } = console;

inquirer
  .prompt([
    {
      type: "list",
      name: "transporte",
      message: "¿Qué tipo de transporte quiere consultar?",
      choices: [
        "Metro",
        "Bus",
      ],
    },
    {
      type: "checkbox",
      name: "parada",
      message: "¿Qué información extra quieres obtener de cada parada?",
      default: 0,
      choices: [
        {
          name: "Coordenadas",
          value: "coordenadas"
        },
        {
          name: "Fecha de inauguración",
          value: "fechaInauguracion"
        }
      ],
      when: (answers) => answers.transporte !== "Bus",
    },
    {
      type: "confirm",
      name: "errores",
      message: "¿Quiere que le informemos de los errores?",
      default: false,
      when: (answers) => answers.transporte !== "Bus",
    },
    {
      type: "input",
      name: "linea_consulta",
      message: "¿Qué línea quiere consultar?",
      when: (answers) => answers.transporte !== "Bus",
    }
  ])
  .then((answers) => {
    if (answers.transporte === "Bus") {
      log(chalk.yellow("No tenemos informacion disponible sobre los buses"));
      log("https://www.tmb.cat/es/home");
    } else {
      log(JSON.stringify(answers, null, "  "));
    }
  });
