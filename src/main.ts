import * as core from "@actions/core";
import * as github from "@actions/github";

function retrieveBranchName(): string {
  const ref = github.context.ref;
  const branchRefPrefix = "refs/heads/";

  if (ref.startsWith(branchRefPrefix)) {
    return ref.substring(branchRefPrefix.length);
  } else {
    throw new Error(
      "Could not determine the branch name",
    );
  }
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const eventName = github.context.eventName;

    if (eventName != "push") {
      throw Error(`Event '${eventName}' is not supported`);
    }

    const payload = github.context.payload;
    core.info(
      `Validating branch name for event '${eventName}' with payload
      '${JSON.stringify(payload)}'`,
    );

    const regex = RegExp(core.getInput("regex"));
    const branchName = retrieveBranchName();

    const testResult = regex.test(branchName);

    if (!testResult) {
      core.setFailed(`Branch ${branchName} failed regex validation '${regex}'`);
    } else {
      core.info("Branch validation succeeded!");
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }

  return await Promise.resolve();
}
