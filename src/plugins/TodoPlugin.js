import { assetUrl, dangerouslySetHTML, createPlugin } from "fusion-core";

const applyTodoMvcStyling = (ctx, assetUrl) => {
  const escapeHtml = dangerouslySetHTML(
    `<link rel="stylesheet" href="${assetUrl}">`
  );
  ctx.template.head.push(escapeHtml);
};

const allowLanguageSpecificUrls = ctx => {
  const localeFromPath = ctx.path.replace("/", "");

  if (localeFromPath.length > 0) {
    ctx.template.htmlAttrs.lang = localeFromPath;
    ctx.request.header["accept-language"] = localeFromPath;
  }
};

export default createPlugin({
  middleware: () => {
    const todoCssUrl = assetUrl("../../node_modules/todomvc-app-css/index.css");

    return (ctx, next) => {
      applyTodoMvcStyling(ctx, todoCssUrl);
      allowLanguageSpecificUrls(ctx);
      return next();
    };
  }
});
