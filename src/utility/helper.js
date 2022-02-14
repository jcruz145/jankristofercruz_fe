export default {
  getInnerWidth: (el) => {
    let computed = window.getComputedStyle(el);
    return el.clientWidth - parseInt(computed.getPropertyValue('padding-left')) - parseInt(computed.getPropertyValue('padding-right'));
  },
  getTranslateY: (el) => {
    let computed = window.getComputedStyle(el);
    let matrix = new WebKitCSSMatrix(computed.transform);
    return matrix.m5;
  }
};