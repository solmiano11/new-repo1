import generateName from "sillyname";
import { randomSuperhero } from "superheroes";
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      message: "Who are you?",
      name: "ako",
    },
  ])
  .then((answers) => {
    console.log("Hello", answers.ako);

    const villainName = generateName();
    const heroName = randomSuperhero();

    console.log("Your villain name will be:", villainName);
    console.log("Your superhero name will be:", heroName);

    var qr_svg = qr.image(answers.ako, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(`qr_${answers.ako}.png`));
    console.log(`QR code saved as 'qr_${answers.ako}.png'`);

    var qr_svg = qr.image(villainName, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(`qr_${villainName}.png`));
    console.log(`QR code saved as 'qr_${villainName}.png'`);

    var qr_svg = qr.image(heroName, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(`qr_${heroName}.png`));
    console.log(`QR code saved as 'qr_${heroName}.png'`);

    const textData = `\nName: ${answers.ako}\nVillain Name: ${villainName}\nSuperhero Name: ${heroName}\n`;

    fs.appendFile("myhero.txt", textData, (err) => {
      if (err) throw err;
      console.log("The file 'myhero.txt' has been updated!");
    });
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
