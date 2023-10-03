const isValidHexColor = (hex) => {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(hex);
};

const parseOptions = (query) => {
  let options = {};
  const regex = /[^a-zA-Z0-9]/g;
  if ("card_color" in query) {
    query.card_color = `#${query.card_color.replace(regex, "")}`;
    options.card_color = isValidHexColor(query.card_color)
      ? query.card_color
      : "#fff";
  } else {
    options.card_color = "#fff";
  }
  if ("font_color" in query) {
    query.font_color = `#${query.font_color.replace(regex, "")}`;
    options.font_color = isValidHexColor(query.font_color)
      ? query.font_color
      : "#000";
  } else {
    options.font_color = "#000";
  }
  if ("shadow" in query) {
    options.shadow = String(query.shadow).toLowerCase() == "true";
  } else {
    options.shadow = false;
  }
  if ("bg_color" in query) {
    query.bg_color = `#${query.bg_color.replace(regex, "")}`;
    options.bg_color = isValidHexColor(query.bg_color)
      ? query.bg_color
      : "#fff";
  } else {
    options.bg_color = "#fff";
  }
  if ("shadow_color" in query) {
    query.shadow_color = `#${query.shadow_color.replace(regex, "")}`;
    options.shadow_color = isValidHexColor(query.shadow_color)
      ? query.shadow_color
      : "#000";
  } else {
    options.shadow_color = "#000";
  }
  return options;
};
module.exports.parseOptions = parseOptions;
