const HTML_THEMES = {
    'TECHY': `
       <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #ffffff; border: 2px solid #333333; padding: 30px; width: 420px; text-align: center; border-radius: 15px; box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);">
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; white-space: pre-line;">
            <span style="font-size: 11px; font-weight: bold; color: #00ff9d;">{{card_content}}</span>
            </div>
            <div style="display: flex; width: 100%; height: 2px; background: linear-gradient(90deg, #00ff9d, #00e4ff); margin-top: 15px;"></div>
        </div>
    `
};

module.exports = {HTML_THEMES};