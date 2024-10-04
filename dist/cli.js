var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Function to generate boilerplate code based on inputs
const generateBoilerplate = (name, language, inputs) => {
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
  .action((options) =>
    __awaiter(void 0, void 0, void 0, function* () {
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
      const confirm = yield inquirer.prompt([
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
    })
  );
program.parse(process.argv);
