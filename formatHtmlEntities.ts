export const formatHtmlEntities = (textData: string) => {
    return textData
        .replaceAll("&quot;", '"')
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll('"', "")
        .replaceAll('\n', " ")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replaceAll("<br>", "");
};