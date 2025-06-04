const HTML_THEMES = {
    'CUSTOM':`
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;width:{{card_width}}px; min-height:{{card_min_height}}px;padding:{{outer_pad}}px; background:{{bg_color}};">
            <div style="display:flex; justify-content:{{card_justify}}; align-items:{{card_align}};width:100%; height:100%; padding:{{inner_pad}}px;background:{{card_color}}; border-radius:10px;box-shadow:0 0 10px {{shadow_color}}; box-sizing:border-box; overflow:hidden;">
                <div style="display:flex; flex:1; align-items:{{flex_align}};">
                    <div style="display:flex; flex:1; flex-direction:column;justify-content:{{flex_align}};align-items:{{flex_align}};text-align:{{css_align}};font-size:{{font_size}}px; color:{{font_color}};white-space:pre-wrap;">
                        {{card_content}}
                    </div>
                </div>
            </div>
        </div>

    `,
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
    `,
    'GALACTIC_DUSK': `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 400px; max-width: 400px; min-height: 100px; background: linear-gradient(to right, rgb(106, 17, 203), rgb(37, 117, 252)); padding: 15px;">
            <div style="display: flex; justify-content: flex-start; align-items: flex-start; width: 100%; height: 100%; background: #282828; padding: 15px; border-radius: 10px; overflow: hidden; box-sizing: border-box; box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);">
                <div style="display: flex; flex-direction: column; align-items: flex-start; white-space: pre-line; text-align: left;">
                    <span style="font-size: 11px; font-weight: bold; color: #fff;">{{card_content}}</span>
                </div>
            </div>
        </div>
    `,
    'AURORA_BOREALIS': `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 400px; max-width: 400px; min-height: 100px; background: linear-gradient(90deg,rgba(61,51,147,1) 0%,rgba(43,118,185,1) 37%,rgba(44,172,209,1) 65%,rgba(53,235,147,1) 100%); padding: 15px;">
            <div style="display: flex; justify-content: flex-start; align-items: flex-start; width: 100%; height: 100%; background: #282828; padding: 15px; border-radius: 10px; box-sizing: border-box; overflow: hidden; box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);">
                <div style="display: flex; flex-direction: column; align-items: flex-start; white-space: pre-line; text-align: left;">
                    <span style="font-size: 11px; font-weight: bold; color: #fff;">
                        {{card_content}}
                    </span>
                </div>
            </div>
        </div>
    `,
    // PATTERN THEME
    'RETRO_BLOCK': `
        <div style="position:relative;display:flex;width:400px;">
            <svg width="100%" height="100%" style="position:absolute;inset:0;">
                <defs>
                    <pattern id="bg" patternUnits="userSpaceOnUse" width="37" height="37">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 200 200">
                        <rect fill="#ee5522" width="200" height="200"/>
                        <defs>
                            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="100" y1="33" x2="100" y2="-3"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></linearGradient>
                            <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="100" y1="135" x2="100" y2="97"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></linearGradient>
                        </defs>
                        <g fill="#ca481d" fill-opacity="0.58"><rect x="100" width="100" height="100"/><rect y="100" width="100" height="100"/></g>
                        <g fill-opacity="0.58"><polygon fill="url(#a)" points="100 30 0 0 200 0"/><polygon fill="url(#b)" points="100 100 0 130 0 100 200 100 200 130"/></g>
                        </svg>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg)"/>
            </svg>

            <div style="position:relative;margin:20px;background:#282828;padding:15px;border-radius:10px;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;text-align:left;width:90%;">
                <span style="font-size:11px;font-weight:bold;color:#fff;">{{card_content}}</span>
            </div>
        </div>
    `,
    // PATTERN THEME
    'RAINBOW_VORTEX': `
        <div style="position:relative;display:flex;justify-content:center;width:100%;">
            <svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;" width="100%" height="100%" viewBox="0 0 1600 800">
                <rect fill="#ff9d00" width="1600" height="800"/><g stroke="#000" stroke-width="66.7" stroke-opacity="0.05" ><circle fill="#ff9d00" cx="0" cy="0" r="1800"/><circle fill="#fb8d17" cx="0" cy="0" r="1700"/><circle fill="#f47d24" cx="0" cy="0" r="1600"/><circle fill="#ed6e2d" cx="0" cy="0" r="1500"/><circle fill="#e35f34" cx="0" cy="0" r="1400"/><circle fill="#d85239" cx="0" cy="0" r="1300"/><circle fill="#cc453e" cx="0" cy="0" r="1200"/><circle fill="#be3941" cx="0" cy="0" r="1100"/><circle fill="#b02f43" cx="0" cy="0" r="1000"/><circle fill="#a02644" cx="0" cy="0" r="900"/><circle fill="#901e44" cx="0" cy="0" r="800"/><circle fill="#801843" cx="0" cy="0" r="700"/><circle fill="#6f1341" cx="0" cy="0" r="600"/><circle fill="#5e0f3d" cx="0" cy="0" r="500"/><circle fill="#4e0c38" cx="0" cy="0" r="400"/><circle fill="#3e0933" cx="0" cy="0" r="300"/><circle fill="#2e062c" cx="0" cy="0" r="200"/><circle fill="#210024" cx="0" cy="0" r="100"/></g>
            </svg>
            <div style="position:relative;width:360px;margin:20px;background:#ffffff;padding:15px;border-radius:10px;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;text-align:left;">
                <span style="font-size:11px;font-weight:bold;color:#000;">{{card_content}}</span>
            </div>
        </div>
    `,
    // PATTERN THEME
    'ENDLESS_CONSTELLATION': `
        <div style="position:relative;display:flex;justify-content:center;width:100%;overflow:hidden;">
            <svg style="position:absolute;inset:0;width:100%;height:100%;">
                <defs>
                <!-- 200×200 tile for tighter repeat -->
                <pattern id="stars" patternUnits="userSpaceOnUse" width="200" height="200">
                    <svg viewBox="0 0 800 800" width="200" height="200">
                    <rect fill="#330033" width="800" height="800"/>
                    <g fill="none" stroke="#404" stroke-width="2.7">
                        <!-- same paths as before -->
                        <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"/>
                        <path d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"/>
                        <path d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"/>
                        <path d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382"/>
                        <path d="M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269"/>
                    </g>
                    <g fill="#505">
                        <circle cx="769" cy="229" r="9"/><circle cx="539" cy="269" r="9"/>
                        <circle cx="603" cy="493" r="9"/><circle cx="731" cy="737" r="9"/>
                        <circle cx="520" cy="660" r="9"/><circle cx="309" cy="538" r="9"/>
                        <circle cx="295" cy="764" r="9"/><circle cx="40" cy="599" r="9"/>
                        <circle cx="102" cy="382" r="9"/><circle cx="127" cy="80"  r="9"/>
                        <circle cx="370" cy="105" r="9"/><circle cx="578" cy="42"  r="9"/>
                        <circle cx="237" cy="261" r="9"/><circle cx="390" cy="382" r="9"/>
                    </g>
                    </svg>
                </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#stars)"/>
            </svg>

            <div style="position:relative;width:360px;margin:20px;background:#fff;padding:15px;border-radius:10px;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;text-align:left;">
                <span style="font-size:11px;font-weight:bold;color:#000;">{{card_content}}</span>
            </div>
        </div>
    `,
    'LEMONADE': `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(90deg,rgba(171,236,54,1) 0%,rgba(238,219,92,1) 49%,rgba(249,245,75,1) 100%);padding:15px;width:400px;box-shadow:0 6px 15px rgba(0,0,0,.4);">
            <div style="display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;background:#E1E5EA;padding:20px;border-radius:10px;width:100%;text-align:left;">
                <span style="font-size:11px;font-weight:bold;color:#222;">{{card_content}}</span>
            </div>
        </div>
    `,
    'GALAXY': `
        <div style="position:relative;display:flex;justify-content:center;width:100%;overflow:hidden;">
            <svg style="position:absolute;inset:0;width:100%;height:100%;">
                <defs>
                    <linearGradient id="galgrad" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%"   stop-color="rgb(40,40,100)"/>
                        <stop offset="30%"  stop-color="rgb(70,30,100)"/>
                        <stop offset="60%"  stop-color="rgb(0,0,0)"/>
                        <stop offset="100%" stop-color="rgb(20,20,50)"/>
                    </linearGradient>

                    <!-- 100×100 tile with transparent bg + many stars -->
                    <pattern id="starfield" patternUnits="userSpaceOnUse" width="100" height="100">
                        <rect width="100" height="100" fill="none"/>
                        <!-- 12 varied stars -->
                        <circle cx="5"  cy="10" r="1" fill="#fff" opacity=".85"/>
                        <circle cx="25" cy="30" r="1.2" fill="#fff" opacity=".7"/>
                        <circle cx="70" cy="15" r=".8" fill="#fff" opacity=".6"/>
                        <circle cx="90" cy="40" r="1" fill="#fff" opacity=".75"/>
                        <circle cx="50" cy="55" r="1.4" fill="#fff" opacity=".9"/>
                        <circle cx="15" cy="70" r=".9" fill="#fff" opacity=".6"/>
                        <circle cx="80" cy="80" r="1" fill="#fff" opacity=".8"/>
                        <circle cx="35" cy="85" r=".7" fill="#fff" opacity=".5"/>
                        <circle cx="60" cy="5"  r="1" fill="#fff" opacity=".8"/>
                        <circle cx="10" cy="45" r=".8" fill="#fff" opacity=".6"/>
                        <circle cx="95" cy="90" r="1.2" fill="#fff" opacity=".85"/>
                        <circle cx="68" cy="68" r=".9" fill="#fff" opacity=".65"/>
                    </pattern>
                </defs>

                <!-- gradient base -->
                <rect width="100%" height="100%" fill="url(#galgrad)"/>
                <!-- star overlay -->
                <rect width="100%" height="100%" fill="url(#starfield)"/>
            </svg>

            <!-- glowing black quote card -->
            <div style="position:relative;width:360px;margin:20px;background:#000;padding:15px;border-radius:10px;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;text-align:left;box-shadow:0 0 0 2px #6b32ff,0 0 10px 4px #6b32ff;">
                <span style="font-size:11px;font-weight:bold;color:#fff;">{{card_content}}</span>
            </div>
        </div>
    `,
    'VINTAGE': `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 400px; max-width: 400px; min-height: 100px; background: linear-gradient(to right, #f8cdda, #1d2b64); padding: 15px;">
            <div style="display: flex; justify-content: flex-start; align-items: flex-start; width: 100%; height: 100%; background: #fff; padding: 15px; border-radius: 10px; box-sizing: border-box; overflow: hidden; box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);">
                <div style="display: flex; flex-direction: column; align-items: flex-start; white-space: pre-line; text-align: left;">
                    <span style="font-size: 11px; font-weight: bold; color: #000;">{{card_content}}</span>
                </div>
            </div>
        </div>
    `,
    'OCEAN_BREEZE': `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;min-width:400px;max-width:400px;min-height:100px;background:linear-gradient(to right,#2E3192,#1BFFFF);padding:15px;">
            <div style="display:flex;justify-content:flex-start;align-items:flex-start;width:100%;height:100%;background:#ffffff;padding:15px;border-radius:10px;box-sizing:border-box;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
                <div style="display:flex;flex-direction:column;align-items:flex-start;white-space:pre-line;text-align:left;">
                    <span style="font-size:11px;font-weight:bold;color:#333;">{{card_content}}</span>
                </div>
            </div>
        </div>
    `,
};

module.exports = { HTML_THEMES };