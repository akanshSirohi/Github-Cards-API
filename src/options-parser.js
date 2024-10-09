// Validate if the input is a valid hex color
const isValidHexColor = (hex) => {
    // Updated regex to support optional hash and 3, 6, or 8 digit colors
    const regex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
    return regex.test(hex);
  };
  
  // Sanitize the hex code by adding a hash (#) if missing
  const sanitizeHex = (hex) => {
    if (!hex.startsWith("#")) hex = "#" + hex;
    return hex;
  };
  
  // Validate and return a proper font size within a given range (8px to 72px)
  const validateFontSize = (size) => {
    const fontSize = parseInt(size, 10);
    return fontSize >= 8 && fontSize <= 72 ? fontSize + "px" : "16px"; // Default is 16px
  };
  
  // Validate font style from a list of allowed styles
  const validateFontStyle = (style) => {
    const validStyles = ["normal", "italic", "bold", "underline"];
    return validStyles.includes(style) ? style : "normal"; // Default is "normal"
  };
  
  // Main function to parse and validate the options from the query
  const parseOptions = (query) => {
    const options = {}; // Holds the parsed options
    const regex = /[^a-zA-Z0-9]/g; // Used to sanitize input
  
    /* Handle Card Color */
    if ("card_color" in query) {
      const sanitizedCardColor = sanitizeHex(query.card_color.replace(regex, ""));
      options.card_color = isValidHexColor(sanitizedCardColor) ? sanitizedCardColor : "#ffffff"; // Default is white
    } else {
      options.card_color = "#ffffff"; // Default is white
    }
  
    /* Handle Font Color */
    if ("font_color" in query) {
      const sanitizedFontColor = sanitizeHex(query.font_color.replace(regex, ""));
      options.font_color = isValidHexColor(sanitizedFontColor) ? sanitizedFontColor : "#000000"; // Default is black
    } else {
      options.font_color = "#000000"; // Default is black
    }
  
    /* Handle Background Color */
    if ("bg_color" in query) {
      const sanitizedBgColor = sanitizeHex(query.bg_color.replace(regex, ""));
      options.bg_color = isValidHexColor(sanitizedBgColor) ? sanitizedBgColor : "#ffffff"; // Default is white
    } else {
      options.bg_color = "#ffffff"; // Default is white
    }
  
    /* Handle Shadow */
    if ("shadow" in query) {
      options.shadow = String(query.shadow).toLowerCase() === "true"; // Converts to boolean
    } else {
      options.shadow = false; // Default is no shadow
    }
  
    /* Handle Shadow Color */
    if (options.shadow && "shadow_color" in query) {
      const sanitizedShadowColor = sanitizeHex(query.shadow_color.replace(regex, ""));
      options.shadow_color = isValidHexColor(sanitizedShadowColor) ? sanitizedShadowColor : "#000000"; // Default is black
    } else {
      options.shadow_color = "#000000"; // Default is black
    }
  
    /* Handle Shadow Size */
    if (options.shadow && "shadow_size" in query) {
      const shadowSize = parseInt(query.shadow_size, 10);
      options.shadow_size = shadowSize > 0 && shadowSize < 100 ? shadowSize + "px" : "10px"; // Default is 10px
    } else {
      options.shadow_size = "10px"; // Default is 10px
    }
  
    /* Handle Font Size */
    if ("font_size" in query) {
      options.font_size = validateFontSize(query.font_size); // Validate and sanitize font size
    } else {
      options.font_size = "16px"; // Default is 16px
    }
  
    /* Handle Font Style */
    if ("font_style" in query) {
      options.font_style = validateFontStyle(query.font_style); // Validate font style
    } else {
      options.font_style = "normal"; // Default is normal
    }
  
    return options; // Return the parsed and validated options
  };
  
  /* Example usage of the parseOptions */
  const exampleQuery = {
    card_color: "f00",
    font_color: "fff",
    shadow: "true",
    shadow_color: "333",
    shadow_size: "15",
    font_size: "20",
    font_style: "italic",
    bg_color: "ff0",
  };
  
  // Example parsed options from the query
  console.log(parseOptions(exampleQuery));
  
  /* Function to generate the HTML structure dynamically */
  const generateCardHTML = (options) => {
    const { card_color, font_color, bg_color, shadow, shadow_color, shadow_size, font_size, font_style } = options;
  
    // Return HTML string with the passed options
    return `
      <div style="
        background-color: ${bg_color};
        color: ${font_color};
        border: 1px solid ${card_color};
        padding: 20px;
        font-size: ${font_size};
        font-style: ${font_style};
        ${shadow ? `box-shadow: 0 4px ${shadow_size} ${shadow_color};` : ""}
      ">
        <h2>Dynamic Card</h2>
        <p>This is a customizable card with the following properties:</p>
        <ul>
          <li>Card Color: ${card_color}</li>
          <li>Font Color: ${font_color}</li>
          <li>Background Color: ${bg_color}</li>
          <li>Font Size: ${font_size}</li>
          <li>Font Style: ${font_style}</li>
          <li>Shadow: ${shadow ? `Yes (Color: ${shadow_color}, Size: ${shadow_size})` : "No"}</li>
        </ul>
      </div>
    `;
  };
  
  // Example rendering of the card with options
  console.log(generateCardHTML(parseOptions(exampleQuery)));
  
  /* Export the parseOptions function for external usage */
  module.exports.parseOptions = parseOptions;
  