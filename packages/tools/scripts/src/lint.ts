import { execSync } from "child_process";
import * as os from "os";
import * as packageJson from "../../../../package.json";

interface ErrorWithStatus extends Error {
  status?: number;
}

function runCommand(command: string): Buffer {
  console.log(`Running command: '${command}'`);
  return execSync(command, { stdio: "inherit" });
}

function lint(): number {
  const megaLinterVersion = `v${packageJson.devDependencies["mega-linter-runner"]}`;
  const additionalMegaLinterArgs: string = process.argv.slice(2).join(" ");

  try {
    runCommand(
      "mega-linter-runner " +
        `--release=${megaLinterVersion} ` +
        additionalMegaLinterArgs,
    );
    return 0;
  } catch (error) {
    const errorWithStatus = error as ErrorWithStatus;
    return errorWithStatus.status ?? 1;
  }
}

// MegaLinter generates report with root:root owner.
function changeReportsOwnership(): void {
  const username: string = os.userInfo().username;
  const userGroup: string = execSync("id -gn").toString().trim();

  runCommand(
    `sudo chown --recursive ${username}:${userGroup} megalinter-reports`,
  );
}

function main() {
  console.log("Linting...");

  const lintExitCode = lint();
  changeReportsOwnership();

  console.log("Linting completed!");

  process.exit(lintExitCode);
}

main();
