// css-helpers.js
const css = (name) => (...args) => `${name}(${args.join(", ")})`;

export const attr = css("attr");
export const calc = css("calc");
export const cubic_bezier = css("cubic-bezier");
export const conic_gradient = css("conic-gradient");
export const counter = css("counter");
export const hsl = css("hsl");
export const hsla = css("hsla");
export const linear_gradient = css("linear-gradient");
export const max = css("max");
export const min = css("min");
export const radial_gradient = css("radial-gradient");
export const repeating_linear_gradient = css("repeating-linear-gradient");
export const repeating_conic_gradient = css("repeating-conic-gradient");
export const rgb = css("rgb");
export const rgba = css("rgba");
export const css_var = css("var");
export const repeat = css("repeat");
export const minmax = css("minmax");
export const url = css("url")
