export { JutSuperErrors, jsuperErrors }


/**
 * @typedef JutSuperErrorsLocationWithTarget
 * @property {string} location
 * @property {string} target
 */


class JutSuperErrors {
  constructor() {}

  /**
   * @param {JutSuperErrorsLocationWithTarget} params
   * @returns {Error}
   */
  unhandledCaseError(params) {
    return new Error(
      `${params.location}: unhandled case ` +
      `${params.target}`
    )
  }

  /**
   * @param {JutSuperErrorsLocationWithTarget} params
   * @returns {Error}
   */
  unexpectedEndError(params) {
    return new Error(
      `${params.location}: unexpected end of ` +
      `${params.target}`
    )
  }
}

const jsuperErrors = new JutSuperErrors();
