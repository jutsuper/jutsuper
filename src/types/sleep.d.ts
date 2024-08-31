import { AsyncSleepReasonKeys } from "/src/sleep.js";
export { AsyncSleepResult };


interface AsyncSleepResult {
  reason: AsyncSleepReasonKeys;
  data: any;
}
