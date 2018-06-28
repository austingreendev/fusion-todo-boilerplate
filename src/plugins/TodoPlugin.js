import { assetUrl, dangerouslySetHTML, createPlugin } from "fusion-core";

const applyTodoMvcStyling = (ctx, assetUrl) => {
  const escapeHtml = dangerouslySetHTML(
    `<link rel="stylesheet" href="${assetUrl}">`
  );
  ctx.template.head.push(escapeHtml);
};

const redirectIfGenericUrl = ctx => {
  const localeFromPath = ctx.path.replace("/", "");

  if (localeFromPath.length === 0) {
    let acceptedLanguage = ctx.request.header["accept-language"];
    /**
     * Some browsers include extraneous information with
     * the "accept-language" header
     */
    acceptedLanguage = acceptedLanguage.split(",")[0];

    ctx.redirect(acceptedLanguage);
  }
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
      redirectIfGenericUrl(ctx);
      allowLanguageSpecificUrls(ctx);
      return next();
    };
  }
});
