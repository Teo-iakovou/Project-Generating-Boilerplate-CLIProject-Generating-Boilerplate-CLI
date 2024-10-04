import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Function to generate boilerplate code based on inputs
const generateBoilerplate = (
  name: string,
  language: string,
  inputs: string[]
): string => {
  let boilerplate = "";

  if (language === "python") {
    boilerplate += `def ${name}(${inputs.join(", ")}):\n`;
    boilerplate += `    # Your code here\n`;
    boilerplate += `    return\n`;
  } else if (language === "javascript") {
    boilerplate += `function ${name}(${inputs.join(", ")}) {\n`;
    boilerplate += `    // Your code here\n`;
    boilerplate += `    return;\n`;
  }

  return boilerplate;
};

// Commander.js configuration
program
  .name("code-cli")
  .description("CLI to generate boilerplate code for challenges")
  .version("1.0.0")
  .requiredOption("-n, --name <string>", "Function name")
  .requiredOption(
    "-l, --language <string>",
    "Programming language (python/javascript)"
  )
  .requiredOption(
    "-i, --inputs <string>",
    "Comma-separated list of function inputs"
  )
  .action(async (options) => {
    const { name, language, inputs } = options;

    // Validate language input
    if (language !== "python" && language !== "javascript") {
      console.log(
        "Error: Unsupported language. Please choose either python or javascript."
      );
      return;
    }

    const inputList = inputs.split(",");

    // Prompt for confirmation using Inquirer
    const confirm = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Generate boilerplate code for the function ${name} in ${language}?`,
        default: false,
      },
    ]);

    if (confirm.confirm) {
      const boilerplateCode = generateBoilerplate(name, language, inputList);

      // file extension based on the language
      const extension = language === "python" ? "py" : "js";
      const fileName = `${name}.${extension}`;

      // boilerplate code to a file
      fs.writeFileSync(fileName, boilerplateCode);

      console.log(
        `Boilerplate code has been generated and saved to ${fileName}`
      );
    } else {
      console.log("Operation cancelled.");
    }
  });

program.parse(process.argv);
