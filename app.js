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
  fs.writeFileSync(outputPath, render(members), "utf-8");
}

function generateTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Would you like to add a member to the team?",
        choices: ["Manager", "Engineer", "Intern", "No, Build Team"],
      },
    ])
    .then((answers) => {
      if (answers.choices === "Manager") {
        manager();
      } else if (answers.choices === "Intern") {
        intern();
      } else if (answers.choices === "Engineer") {
        engineer();
      } else {
        buildTeam();
      }
    });
}

function init() {
  generateTeam();
}

init();
