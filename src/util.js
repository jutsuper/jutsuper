import { ANY } from "/src/consts.js";
import { JutSuperKeyCodeLabelOverrides as keyLabels } from "/src/consts.js";
export { jsuperUtil };


console.debug("JutSuper: loading /src/util.js");


class JutSuperUtil {
  /**
   * # Sleep for `ms` milliseconds in async
   * 
   * @param {number} ms
   * @returns {Promise<void>}
   */
  asyncSleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  /**
   * # Get shorter name of a keyboard key
   * 
   * @param {string} rawLabel
   * @returns {string}
   */
  getKeyLabelFromRawLabel(rawLabel) {
    const overrideValue = keyLabels[rawLabel];
    return overrideValue ? overrideValue : rawLabel;
  }

  /**
   * # Random integer, literally
   * 
   * @param {number} min 
   * @param {number} max 
   * @returns {number}
   */
  getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  /**
   * # Is `value` just an `Object`
   * @param {any} value 
   * @returns 
   */
  isObject(value) {
    if (value === null || typeof value === "undefined") {
      return false;
    }
    if (value.constructor === Array) {
      return false;
    }
    
    return value.constructor.name === "Object";
  }

  /**
   * # Is `obj` empty
   * 
   * @param {Record<any, any>} obj 
   * @returns {boolean}
   */
  isEmptyObject(obj) {
    for (const i in obj) {
      return false;
    }

    return true;
  }

  /**
   * # Get intersecting properties of two objects
   * 
   * @example
   * ```javascript
   * const A = { a: 1, b: 2, c: 3 };
   * const B = { a: 1, b: "*" };
   * console.assert(objectIntersection(A, B, "*"), { a: 1, b: 2 })
   * ```
   * 
   * @param {Record<any, any>} a 
   * @param {Record<any, any>} b 
   * @param {typeof ANY | undefined} [wildcard=undefined]
   * @returns {Record<any, any>}
   */
  objectIntersection(a, b, wildcard = undefined) {
    let result = {};

    if (([a, b]).every(this.isObject)) {
      for (const key of Object.keys(a)) {
        const value = a[key];
        const other = b[key];

        if (value !== undefined && other === undefined) {
          continue;
        }
        else if (value === other || (wildcard !== undefined && other === wildcard)) {
          result[key] = value;
        }
        else if (this.isObject(value)) {
          const deeperIntersection = this.objectIntersection(value, other, wildcard);

          if (this.isEmptyObject(deeperIntersection)) {
            continue;
          }

          result[key] = deeperIntersection;
        }
      }
    }

    return result;
  }

  /**
   * # Merge objects together, including nested ones
   * 
   * @template {Record<any, any>} Target
   * @template {Record<any, any>} Sources
   * @param {Target} target
   * @param {Sources[]} sources
   * @returns {Target & Sources}
   */
  objectMergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.objectMergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.objectMergeDeep(target, ...sources);
  }

  /**
   * @param {HTMLElement} node
   * @param {Record<string, string>} attrs 
   * @returns {void}
   */
  applyAttrs(node, attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      node.setAttribute(key, value);
    }
  }
}


const jsuperUtil = new JutSuperUtil();
