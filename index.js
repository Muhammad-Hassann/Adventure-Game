#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Welcome Message
console.log(chalk.blue("##############################################################\n"));
console.log(chalk.magenta.bold.italic(`\t\t WELCOME TO ADVENTURE GAME\n`));
console.log(chalk.blue("##############################################################\n"));
// Class For Player
class Player {
    name;
    healthPotion = 100;
    rand;
    constructor(name) {
        this.name = name;
    }
    hpDecrease() {
        let rand = Math.floor(Math.random() * (30 - 15) + 1 + 15);
        this.rand = rand;
        let healthPotion = this.healthPotion - rand;
        this.healthPotion = healthPotion;
        if (healthPotion <= 0) {
            healthPotion = 0;
        }
    }
    hpIncrease() {
        let rand = Math.floor(Math.random() * (50 - 25) + 1 + 25);
        let healthPotion = this.healthPotion + rand;
        this.healthPotion = healthPotion;
    }
}
// Class for Enemy
class Enemy {
    name;
    healthPotion = 100;
    rand;
    constructor(name) {
        this.name = name;
    }
    hpDecrease() {
        let rand = Math.floor(Math.random() * (30 - 15) + 1 + 15);
        this.rand = rand;
        let healthPotion = this.healthPotion - rand;
        this.healthPotion = healthPotion;
        if (healthPotion <= 0) {
            healthPotion = 0;
        }
    }
}
// Ask Player name
let playerName = await inquirer.prompt([
    {
        name: "name",
        message: chalk.blue.bold("Enter you name"),
        type: "input",
    },
]);
// Condition variable
let condition = true;
// Start main loop, means start the game
Game: while (condition) {
    // Ask to choose enemy
    let enemyName = await inquirer.prompt([
        {
            name: "name",
            message: chalk.blue.bold("\nSelect your Enemy\n"),
            type: "list",
            choices: ["Skeleton", "Zoombie", "Warrior"],
        },
    ]);
    // NO. of health portions
    let healthPotionCount = 3;
    // Create objects for enemy and player
    let player = new Player(playerName.name);
    let enemy = new Enemy(enemyName.name);
    // Messages after starting the game
    console.log(`\n\t ${chalk.green.bold(player.name)} VS ${chalk.red.bold(enemy.name)}`);
    console.log(`\n\t ${chalk.bold.yellow(`Your Hp: ${player.healthPotion}`)}`);
    console.log(`\t ${chalk.bold.yellow(`${enemy.name}'s Hp: ${enemy.healthPotion}`)}\n`);
    // Second loop, run for ask to perform the action
    while (condition) {
        let options = await inquirer.prompt([
            {
                name: "action",
                message: chalk.bold.blue("What would you like to do?"),
                type: "list",
                choices: [
                    `Attack to ${enemy.name}`,
                    "Drink Health Portion",
                    "Run away...",
                ],
            },
        ]);
        // Condition for first choice "ATTACK"
        if (options.action === `Attack to ${enemy.name}`) {
            player.hpDecrease();
            enemy.hpDecrease();
            console.log(`\n${chalk.bold.magenta(`You strike ${enemy.name} for ${enemy.rand} damage`)}`);
            console.log(`${chalk.bold.magenta(`You recieve ${player.rand} damage in retaliaton!`)}`);
            // Convert the negative value to 0 and print the message
            player.healthPotion = player.healthPotion < 0 ? 0 : player.healthPotion;
            console.log(chalk.green.bold(`\nYour Health Portion: ${player.healthPotion}`));
            // Convert the negative value to 0 and print the message
            enemy.healthPotion = enemy.healthPotion < 0 ? 0 : enemy.healthPotion;
            console.log(chalk.red.bold(`${enemy.name}'s Health Portion: ${enemy.healthPotion}\n`));
            // If Match Draw
            if (player.healthPotion === 0 && enemy.healthPotion === 0) {
                console.log(chalk.yellow.bold.italic("\tMatch Draw!"));
            }
            // If you Loose
            if (player.healthPotion <= 1 && enemy.healthPotion > 0) {
                console.log(chalk.red.bold.italic("\tYou Loose! Try Again"));
                condition = false;
            }
            // If you Win
            if (enemy.healthPotion <= 1 && player.healthPotion > 0) {
                console.log(chalk.green.bold.italic("\tYou Win!"));
            }
            // Ask what to do after winning and match drawn
            if ((enemy.healthPotion <= 1 && player.healthPotion > 0) ||
                (player.healthPotion === 0 && enemy.healthPotion === 0)) {
                let askAfterWin = await inquirer.prompt([
                    {
                        name: "ask",
                        message: "What would you like to do now?",
                        type: "list",
                        choices: ["Continue Fighting", "Exit the Game"],
                    },
                ]);
                if (askAfterWin.ask === "Continue Fighting") {
                    continue Game;
                }
                else {
                    console.log(chalk.blue("##########################################################\n"));
                    console.log(chalk.green.bold.italic(`\t\t THANKS FOR PLAYING! \n`));
                    console.log(chalk.blue("##########################################################\n"));
                    condition = false;
                }
            }
        }
        // Condition for second choice "DRINK"
        if (options.action === "Drink Health Portion") {
            healthPotionCount--;
            player.hpIncrease();
            console.log(`\t\n ${chalk.bold.magentaBright(`You have ${healthPotionCount} drink(s) left!`)}`);
            console.log(`\t ${chalk.green.bold(`Your HP: ${player.healthPotion}`)}`);
            console.log(`\n\t ${chalk.red.bold(`${enemy.name}'s HP: ${enemy.healthPotion}`)}\n`);
            continue;
        }
        // Condition for second choice "RUN"
        if (options.action === "Run away...") {
            continue Game;
        }
    }
}
