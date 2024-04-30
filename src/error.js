export { JutSuperErrors, jsuperErrors }


/**
 * @typedef JutSuperErrorsLocation
 * @property {string} location
 * 
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
   * @param {JutSuperErrorsLocation} params
   * @returns {Error}
   */
  unexpectedEndError(params) {
    return new Error(
      `${params.location}: unexpected end`
    )
  }
}

const jsuperErrors = new JutSuperErrors();
