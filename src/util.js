export { asyncSleep };


/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
async function asyncSleep(ms) {
  return await new Promise(r => setTimeout(r, ms));
}
