import { assetUrl, dangerouslySetHTML, createPlugin } from "fusion-core";

const applyTodoMvcStyling = (ctx, assetUrl) => {
  const escapeHtml = dangerouslySetHTML(
    `<link rel="stylesheet" href="${assetUrl}">`
  );
  ctx.template.head.push(escapeHtml);
};

export default createPlugin({
  middleware: () => {
    const todoCssUrl = assetUrl("../../node_modules/todomvc-app-css/index.css");

    return (ctx, next) => {
      applyTodoMvcStyling(ctx, todoCssUrl);
      return next();
    };
  }
});
