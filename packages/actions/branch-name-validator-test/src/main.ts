import * as github from "@actions/github";
import { BranchNameValidator } from "@akikanellis/branch-name-validator-test-core";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const branchNameValidator = new BranchNameValidator({
    eventName: github.context.eventName,
    ref: github.context.ref,
    payload: github.context.payload,
  });

  branchNameValidator.validate();

  return await Promise.resolve();
}
