const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");
const { listenerCount } = require("process");

const questions = require("./questions");

const members = [];

// Write code to use inquirer to gather information about the development team members,

function manager() {
  inquirer.prompt(questions.managerQuestions).then((answers) => {
    const managerQuestions = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    members.push(managerQuestions);
    generateTeam();
  });
}

function engineer() {
  inquirer.prompt(questions.engineerQuestions).then((answers) => {
    const engineerQuestions = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    console.log(engineerQuestions);
    members.push(engineerQuestions);
    generateTeam();
  });
}

function intern() {
  inquirer.prompt(questions.internQuestions).then((answers) => {
    const internQuestions = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    members.push(internQuestions);
    generateTeam();
  });
}

function buildTeam() {
  console.log(JSON.stringify(members));
  fs.writeFileSync(outputPath, render(members), "utf-8");
}

function generateTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Would you like to add another member to the team?",
        choices: ["Engineer", "Intern", "No, Build Team"],
      },
    ])
    .then((answers) => {
      if (answers.choices === "Engineer") {
        engineer();
      } else if (answers.choices === "Intern") {
        intern();
      } else {
        buildTeam();
      }
    });
}

function init() {
  generateTeam();
}

init();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (managerQuestions, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
