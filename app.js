// classes
const Manager = require("./dev/lib/manager");
const Engineer = require("./dev/lib/engineer");
const Intern = require("./dev/lib/intern");
// packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./dev/lib/htmlRenderer");
const Employee = require("./dev/lib/employee");
const teamArray = []

function employeeQuestions() {

  inquirer.prompt([{
          type: "input",
          message: "Please enter the name of the employee",
          name: "answerName"
      },
      {
          type: "input",
          message: "Please enter their employee ID number",
          name: "answerID"
      },
      {
          type: "input",
          message: "Please enter their email address?",
          name: "answerEmail"
      },
      {
          type: "list",
          message: "Looks good.  Now please select their role here",
          name: "answerRole",
          choices: ["Engineer", "Intern", "Manager"]
      },
  ]).then(function (answers) {

      if (answers.answerRole === "Engineer") {
        engineerQuestions(answers);
      } else if (answers.answerRole === "Intern") {
          internQs(answers);
      } else {
          managerQs(answers);
      }
  })
}

function engineerQuestions(baseAnswers) {
  inquirer.prompt([{
          type: "input",
          message: "What is their GitHub username?",
          name: "answerGithub",
      },
      {
          type: "confirm",
          message: "Would you like to add another Employee?",
          name: "answerAddAnother",
      },
  ]).then(function (answers) {
      const newEngineer = new Engineer(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, answers.answerGithub);
      teamArray.push(newEngineer);
      if (answers.answerAddAnother === true) {
        employeeQuestions()
      } else {

          AssembleTeam();
          console.log("rendered!")
      }
  })
}


function AssembleTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

employeeQuestions();