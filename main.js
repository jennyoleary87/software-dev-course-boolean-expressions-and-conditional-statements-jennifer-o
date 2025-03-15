/*
03/13/2025
Practice: Control Structures and Logic - 1: Boolean Expressions

Instructions:
If you are not familiar with the concept of a text-based adventure game,
let's set the scene...
  - Write conditional statements to handle player choices.
  - Use boolean expressions to combine multiple conditions.
  - Include at least one use of logical operators (&&, ||, !).
  Add Customization and expand the game:
  - Add more choices and scenarios.
  - Include additional items (e.g., a sword, a compass).
  - Use nested conditionals and logical operators to create complex outcomes.

*/

const readline = require('readline-sync');

function startGame() {

    // initialize inventory
    let inventory = {
        torch: false,
        map: false,
        sword: false,
        compass: false,
        treasureKnowledge: false
    };

    // Reset function
    function checkForReset(input) {
        if (input.toLowerCase() === 'reset') {
            console.log(" --- GAME RESETTING --- ");
            startGame();
            return true; // yes resetting
        }
        return false; // no reset
    }

    //readline check for reset
    function askQuestion(question) {
        let answer = readline.question(question);
        if (checkForReset(answer)) {
            return null; // Returning null indicates a reset occurred
        }
        return answer;
    }

    // Function for key minigame
    function keyMinigame() {
        console.log(" === THE KEY CHALLENGE === ");
        console.log("You encounter an old sage who guards a mysterious key.");
        console.log("'To obtain this key,' says the sage, 'you must answer my riddle correctly.'");
        console.log("Instructions: type a one word answer to the riddle.")
        // Randomly select one of several riddles
        const riddles = [
            {
                question: "What has roots as nobody sees, Is taller than trees, Up, up it goes, And yet never grows? ",
                answer: "mountain"
            },
            {
                question: "What has keys but no locks, space but no room, and you can enter but not go in? ",
                answer: "keyboard"
            },
            {
                question: "What goes up but never comes down? ",
                answer: "age"
            },
            {
                question: "Voiceless it cries, Wingless flutters, Toothless bites, Mouthless mutters? ",
                answer: "wind"
            },
            {
                question: "What has a head, a tail, is brown, and has no legs? ",
                answer: "penny"
            }
        ];
        console.log(`The riddle is: ${riddles.random()}`);
        const riddleAnswer = readline.question(`The riddle is: ${riddles.random()}`).toLowerCase();
        if (['penny', 'mountain', 'keyboard', 'age', 'wind'].includes(riddleAnswer)) {
            inventory.key = true;
            console.log(`You acquired the treasure key!`);
        } else {
            console.log("You did not solve the riddle. You do not get the key. The sage fades away.");
        }
    }

    // Intro
    console.log("LET THE QUEST BEGIN");
    console.log("Type \'reset\' at any point in time to start the game over!")
    console.log("You will get to pick two items to add to your inventory.");

    // First item selection
    const firstItem = readline.question("Choose one item for navigation (map/compass): ").toLowerCase();
    if (['torch', 'map', 'sword', 'compass'].includes(firstItem)) {
        inventory[firstItem] = true;
        console.log(`You've selected the ${firstItem}.`);
    } else {
        console.log("Invalid choice. You get nothing for your first item.");
    }

    // Second item selection
    const secondItem = readline.question("Choose one item for survival (torch/sword): ").toLowerCase();
    if (['torch', 'map', 'sword', 'compass'].includes(secondItem)) {
        inventory[secondItem] = true;
        console.log(`You've selected the ${secondItem}.`);
    } else {
        console.log("Invalid choice. You get nothing for your second item.");
    }

    // choose initial path
    console.log("You see two paths ahead: One leads to the village. Another to the river.");
    const pathChoice = readline.question("Will you go to the 'village' or the 'river'?");

    if (pathChoice === "river") {
        console.log(" --- RIVER PATH --- ");
        const riverChoice = askQuestion("Do you want to try to cross the river or follow it downstream? (cross/follow): ").toLowerCase();
        if (riverChoice === "cross") { // cross the river
            if (inventory.sword) {
                console.log("You use your sword as a makeshift walking stick to maintain balance.");
                console.log("With difficulty, you make it across, though you're soaking wet.");
                console.log("On the far bank, you notice an old shepherd's field.");

                const visitShepherdChoice = askQuestion("Do you want to visit the shepherd? (yes/no): ").toLowerCase();
                if (visitShepherdChoice === null) return; // Game was reset

                if (visitShepherdChoice === "yes") {
                    console.log("The shepherd welcomes you and dries your clothes by the fire.");
                    console.log("'I sense a seeker of treasure,' says the shepherd. 'You'll need the key.'");
                    console.log("The shepherd refers you to a sage who holds the key to the temple.");

                    const seekSageChoice = askQuestion("Do you want to seek out this sage? (yes/no): ").toLowerCase();
                    if (seekSageChoice === null) return; // Game was reset

                    if (seekSageChoice === "yes") {
                        keyMinigame();
                    }
                }
            } else if (!inventory.sword) { // cross river without sword
                if (inventory.map && inventory.torch) {

                } else { // cross river with compass && torch
                    console.log("As night approaches, you are able to use your torch to find shallower water to cross at.");
                    console.log("On the far bank, you notice an old shepherd's field.");

                    const visitShepherdChoice = askQuestion("Do you want to visit the shepherd? (yes/no): ").toLowerCase();
                    if (visitShepherdChoice === null) return; // Game was reset

                    if (visitShepherdChoice === "yes") {
                        console.log("The shepherd welcomes you and dries your clothes by the fire.");
                        console.log("'I sense a seeker of treasure,' says the shepherd. 'You'll need the key.'");
                        console.log("The shepherd refers you to a sage who holds the key to the temple.");

                        const seekSageChoice = askQuestion("Do you want to seek out this sage? (yes/no): ").toLowerCase();
                        if (seekSageChoice === null) return; // Game was reset

                        if (seekSageChoice === "yes") {
                            keyMinigame();
                        }
                    }

                }
            } else { // follow downstream
                console.log("You chose to follow the river downstream.");
                console.log("You come across some beautiful geodes! You collect a few to trade with villagers later.");
            }
        }

        if (pathChoice === "village") {
            console.log(" --- VILLAGE PATH --- ");
            console.log("You make your way toward the beautiful village of Astoria.");
            if (inventory.map) {
                console.log("With your map, you travel effortlessly toward the village.");
                console.log("You enter the gates to find the villagers being raided by pillagers!");

                const helpVillageChoice = askQuestion("Do you want to help save the villagers? (yes/no) ").toLowerCase();
                if (helpVillageChoice === null) return;

                if (helpVillageChoice == "yes" && inventory.sword) {
                    console.log("You use your sword to slay the pillagers. You have saved the villagers from the raid!");
                    console.log("The grateful village elder rewards you with ancient knowledge about a hidden treasure.");
                    console.log("You now have powerful knowledge of the treasure temple!");
                    inventory.treasureKnowledge = true;
                    treasurePath();
                    return;
                } else if (helpVillageChoice == "yes" && inventory.torch) {

                } else {
                    console.log("You chose to avoid the raid. You travel away from the village and head toward the river.");
                    riverPath(); // directed to river path
                    return; // reset after completing river path
                }
            } else if (inventory.compass) {
                console.log("Your compass misleads you. You become lost in a forest.");
                const visitHouseChoice = askQuestion("You see a house in the distance. Do you visit? (yes/no)? ");
                if (visitHouseChoice == "yes") {
                    console.log("You have chosen to visit the house. A sage welcomes you into her home.");
                    console.log("The sage gives you a riddle. You have one chance to guess the one word answer.");
                    keyMinigame();
                    treasurePath();
                } else {
                    console.log("You chose not to visit the house. You continue to get lost in the forest.");
                    console.log("Trusting your compass one last time, you encounter an Inn.");
                    console.log("You decide to stay the night and try again tomorrow.");
                }
            } else {
                console.log("You are lost. Try again.");
            }
        }

    }
    startGame();

}
/*
-- NOTES --

03/14.25: This project has taught me to outline the paths using a mindmap before typing it all out.
Too much time was spent reorganizing and rearranging.
Make a plan/outline before typing any code!
Please come back to this later on and expand it as a side project to utilize future new skills!
*/