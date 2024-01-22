import * as core from "@actions/core";
import { WebhookPayload } from "@actions/github/lib/interfaces";

export interface BranchNameValidatorProperties {
  eventName: string;
  ref: string;
  payload: WebhookPayload;
}

export class BranchNameValidator {
  private readonly eventName: string;
  private readonly ref: string;
  private readonly payload: WebhookPayload;

  constructor(props: BranchNameValidatorProperties) {
    this.eventName = props.eventName;
    this.ref = props.ref;
    this.payload = props.payload;
  }

  public validate(): void {
    try {
      if (this.eventName != "push") {
        throw Error(`Event '${this.eventName}' is not supported`);
      }

      core.info(
        `Validating branch name for event '${this.eventName}' with payload
      '${JSON.stringify(this.payload)}'`,
      );

      const regex = RegExp(core.getInput("regex"));
      const branchName = this.retrieveBranchName(this.ref);

      const testResult = regex.test(branchName);

      if (!testResult) {
        core.setFailed(
          `Branch ${branchName} failed regex validation '${regex}'`,
        );
      } else {
        core.info("Branch validation succeeded!");
      }
    } catch (error) {
      // Fail the workflow run if an error occurs
      if (error instanceof Error) core.setFailed(error.message);
    }
  }

  private retrieveBranchName(ref: string): string {
    const branchRefPrefix = "refs/heads/";

    if (ref.startsWith(branchRefPrefix)) {
      return ref.substring(branchRefPrefix.length);
    } else {
      throw new Error("Could not determine the branch name.");
    }
  }
}
