const HTML_THEMES = {
    'TECHY': `
       <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #ffffff; border: 2px solid #333333; padding: 30px; width: 420px; text-align: center; border-radius: 15px; box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);">
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; white-space: pre-line;">
            <span style="font-size: 11px; font-weight: bold; color: #00ff9d;">{{card_content}}</span>
            </div>
            <div style="display: flex; width: 100%; height: 2px; background: linear-gradient(90deg, #00ff9d, #00e4ff); margin-top: 15px;"></div>
        </div>
    `,
    'NEON_HORIZON': `
        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;min-width: 200px;max-width: 400px;min-height: 100px;background: linear-gradient(135deg, #0a1128, #1c3f60);border-radius: 20px;box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);overflow: hidden;position: relative;padding: 20px;">
            <div style="display: flex;position: absolute;top: 0;left: 0;right: 0;height: 8px;background: linear-gradient(90deg, #00ffff, #ff00ff);"></div>
            <div style="display: flex;position: absolute;top: 8px;left: 0;width: 50%;height: 2px;background: #00ffff;"></div>
            <div style="display: flex;position: absolute;top: 8px;right: 0;width: 30%;height: 2px;background: #ff00ff;"></div>
            <div style="display: flex;position: absolute;bottom: 0;right: 0;width: 100px;height: 100px;background: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%);clip-path: polygon(100% 0, 100% 100%, 0 100%);"></div>
            <div style="display: flex;padding: 15px;background: rgba(255, 255, 255, 0.1);border-radius: 10px;border: 1px solid rgba(255, 255, 255, 0.2);max-width: 100%;box-sizing: border-box;">
                <span style="font-family: 'Arial', sans-serif;font-size: 11px;font-weight: bold;color: #fff;text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);word-wrap: break-word;max-width: 100%;">{{card_content}}</span>
            </div>
        </div>
    `
};

module.exports = {HTML_THEMES};