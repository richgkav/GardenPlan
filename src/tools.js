export const clearChildElements = function _clearChildElements(node) {
    // clears all child elements under the specified id
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}