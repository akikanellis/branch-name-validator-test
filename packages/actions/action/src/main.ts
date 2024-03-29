import * as github from "@actions/github";
import { BranchNameValidator } from "@branch-name-validator-test/core";

export async function run(): Promise<void> {
  const branchNameValidator = new BranchNameValidator({
    eventName: github.context.eventName,
    ref: github.context.ref,
    payload: github.context.payload,
  });

  branchNameValidator.validate();

  return await Promise.resolve();
}
