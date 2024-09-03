/**
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {boolean}
 */
export function validUsername(str: string): boolean {
  const valid_map = ['admin', 'editor']
  return valid_map.includes(str.trim())
}
