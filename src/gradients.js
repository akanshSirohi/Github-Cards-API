// Add gradient unique name here
const GradientConstants = {
    DARK_1 : "dark_1",
    DARK_2 : "dark_2",
    LIGHT : "light",
};

const generateGradient = (grad_name,ctx,canvas,w) => {
    let background;
    // Add gradient here
    switch (grad_name) {
        case GradientConstants.DARK_1:
            background = ctx.createLinearGradient(
                0,
                canvas.height / 2,
                w,
                canvas.height / 2
            );
            background.addColorStop(0, "rgba(106, 17, 203, 1)");
            background.addColorStop(1, "rgba(37, 117, 252, 1)");
            return background;

        case GradientConstants.DARK_2:
            background = ctx.createLinearGradient(
                w / 2 - canvas.height >= 0 ? w / 2 - canvas.height : 0,
                canvas.height / 2,
                w / 2 + canvas.height,
                canvas.height >= 290 ? canvas.height - 290 : 0
            );
            background.addColorStop(0, "rgba(61, 51, 147, 1)");
            background.addColorStop(0.37, "rgba(43, 118, 185, 1)");
            background.addColorStop(0.65, "rgba(44, 172, 209, 1)");
            background.addColorStop(1, "rgba(53, 235, 147, 1)");
            return background;
            
        case GradientConstants.LIGHT:
            background = ctx.createLinearGradient(w / 2, 0, w / 2, canvas.height);
            background.addColorStop(0, "rgba(42, 245, 152, 1)");
            background.addColorStop(1, "rgba(0, 158, 253, 1)");
            return background;
    }
};
module.exports.GradientConstants = GradientConstants;
module.exports.generateGradient = generateGradient;