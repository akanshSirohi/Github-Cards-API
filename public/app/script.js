import { CARD_TYPES, THEMES } from './config.js';
import { generateRandomGradient } from './gradientFactory.js';

let card_url_state = null;

/* ---------- Helper Functions ---------- */
const b64Encode = (str) => {
	return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const human = (s) => {
	return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const addOption = (select, item) => {
	const opt = document.createElement('option');
	if (typeof item === 'string') {
		opt.value = item;
		opt.textContent = human(item);
	} else {
		opt.value = item.value;
		opt.textContent = item.label ?? human(item.value);
	}
	select.appendChild(opt);
};

function rgbToHex(rgbString) {
	const match = rgbString.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/);
	if (!match) throw new Error('Invalid RGB(A) string');
	const r = parseInt(match[1], 10);
	const g = parseInt(match[2], 10);
	const b = parseInt(match[3], 10);
	const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : null;
	const toHex = (v) => v.toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}${a !== null ? toHex(a) : ''}`.toUpperCase();
}

/* ---------- Populate Selects ---------- */
const cardItems = Array.isArray(CARD_TYPES) ? CARD_TYPES : Object.values(CARD_TYPES);
cardItems.forEach((c) => addOption(cardSelect, c));
const themeItems = Array.isArray(THEMES) ? THEMES : Object.values(THEMES);
themeItems.forEach((t) => addOption(themeSelect, t));

/* ---------- Theme Toggle Functionality ---------- */
(function initThemeToggle() {
	const root = document.documentElement;
	const btn = document.getElementById('themeToggle');
	const icon = document.getElementById('themeToggleIcon');
	const stored = localStorage.getItem('gcg-theme');

	// Set initial theme
	if (stored === 'light') root.classList.remove('dark');
	if (stored === 'dark') root.classList.add('dark');

	const setIcon = () => {
		icon.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
	};

	setIcon();

	btn?.addEventListener('click', () => {
		root.classList.toggle('dark');
		const isDark = root.classList.contains('dark');
		localStorage.setItem('gcg-theme', isDark ? 'dark' : 'light');
		setIcon();

		// Reinitialize color pickers with new theme
		['#fontColorHex', '#shadowColorHex', '#bgColorHex', '#cardColorHex'].forEach((sel) => {
			const el = document.querySelector(sel);
			if (el) {
				const clone = el.cloneNode(true);
				el.replaceWith(clone);
			}
		});

		initPickers();
	});
})();

/* ---------- Color Pickers Initialization ---------- */
function initPickers() {
	const isDark = document.documentElement.classList.contains('dark');

	// Initialize color pickers with enhanced options
	new lc_color_picker('#fontColorHex', {
		modes: ['solid'],
		dark_theme: isDark,
		preview_style: {
			separator_color: isDark ? '#374151' : '#e5e7eb',
			width: 45,
		},
	});

	new lc_color_picker('#shadowColorHex', {
		modes: ['solid'],
		dark_theme: isDark,
		preview_style: {
			separator_color: isDark ? '#374151' : '#e5e7eb',
			width: 45,
		},
	});

	new lc_color_picker('#bgColorHex', {
		modes: ['solid', 'linear-gradient', 'radial-gradient'],
		dark_theme: isDark,
		preview_style: {
			separator_color: isDark ? '#374151' : '#e5e7eb',
			width: 45,
		},
	});

	new lc_color_picker('#cardColorHex', {
		modes: ['solid', 'linear-gradient', 'radial-gradient'],
		dark_theme: isDark,
		preview_style: {
			separator_color: isDark ? '#374151' : '#e5e7eb',
			width: 45,
		},
	});
}

// Initialize pickers on load
initPickers();

/* ---------- Form Interactions ---------- */
// Show/hide custom theme options
themeSelect.addEventListener('change', () => {
	const isCustom = themeSelect.value === 'custom';
	customWrapper.classList.toggle('hidden', !isCustom);

	// Add smooth transition
	if (isCustom) {
		setTimeout(() => {
			customWrapper.style.opacity = '1';
			customWrapper.style.transform = 'translateY(0)';
		}, 50);
	}
});

// Show/hide custom text area for my-card
$('#cardSelect').change(function () {
	const showCustomText = this.value === 'my-card';
	$('#customTextWapper').toggleClass('hidden', !showCustomText);

	if (showCustomText) {
		setTimeout(() => {
			$('#customTextWapper').css({
				opacity: '1',
				transform: 'translateY(0)',
			});
		}, 50);
	}
});

// Live range value updates
$('.dynamic-range').on('input', function () {
	const target = $(this).data('target');
	const value = $(this).val();
	$(`#${target}`).html(`(${value}px)`);

	// Add visual feedback
	$(this).addClass('range-changed');
	setTimeout(() => $(this).removeClass('range-changed'), 300);
});

/* ---------- Reset Buttons ---------- */
$('.reset-btn').click(function () {
	const target = $(this).data('target');
	const value = $(this).data('val');
	const $range = $(`#${target}`);
	const $label = $(`#${target}Label`);

	$range.val(value);
	$label.html(`(${value}px)`);

	// Add visual feedback
	$range.addClass('reset-animation');
	setTimeout(() => $range.removeClass('reset-animation'), 600);
});

/* ---------- Random Gradient Generation ---------- */
$('.random-grad-gen-btn').click(function () {
	const target = $(this).data('target');
	const randomGradient = generateRandomGradient();
	const $input = $(`#${target}`);
	const $preview = $input.parent().find('.lccp-preview');

	$input.val(randomGradient);
	$preview.css('background', randomGradient);

	// Add success feedback
	$(this).addClass('success-animation');
	setTimeout(() => $(this).removeClass('success-animation'), 1000);
});

/* ---------- Text Alignment Picker ---------- */
(function initAlignPicker() {
	const picker = document.getElementById('alignPicker');
	const hidden = document.getElementById('textAlignment');
	if (!picker || !hidden) return;

	const buttons = Array.from(picker.querySelectorAll('.align-btn'));

	const select = (val) => {
		buttons.forEach((b) => {
			const isSelected = b.dataset.value === val;
			b.setAttribute('aria-checked', isSelected);
			b.classList.toggle('selected', isSelected);
		});
		hidden.value = val;
	};

	// Click support
	buttons.forEach((btn) => {
		btn.addEventListener('click', () => {
			select(btn.dataset.value);

			// Add ripple effect
			const ripple = document.createElement('span');
			ripple.classList.add('ripple');
			btn.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		});
	});

	// Keyboard navigation
	picker.addEventListener('keydown', (e) => {
		const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
		if (!keys.includes(e.key)) return;

		e.preventDefault();
		const order = ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'];
		const current = hidden.value || 'mm';
		const idx = order.indexOf(current);
		const col = idx % 3,
			row = Math.floor(idx / 3);

		let [r, c] = [row, col];

		if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') r = Math.max(0, r - 1);
		if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') r = Math.min(2, r + 1);
		if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') c = Math.max(0, c - 1);
		if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') c = Math.min(2, c + 1);

		select(order[r * 3 + c]);
	});

	// Default selection
	select('mm');
})();

/* ---------- Form Submission ---------- */
cardForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const placeholder = $('#placeholder');
	const preview = $('#preview');
	const previewContainer = $('#previewContainer');
	const loader = $('#loader');
	const holder = $('#holder');

	// Hide placeholder and show loader
	placeholder.addClass('hidden');
	preview.addClass('hidden');
	previewContainer.addClass('hidden');
	loader.removeClass('hidden');

	// Add loading state to holder
	holder.addClass('loading');

	const data = new FormData(cardForm);
	const qs = new URLSearchParams({ theme: data.get('theme') });

	// Handle custom text for my-card
	if (data.get('card_name') === 'my-card') {
		const customText = data.get('customText') || '';
		qs.set('text', b64Encode(customText));
	}

	// Handle custom theme options
	if (data.get('theme') === 'custom') {
		// Card color
		let card_color = data.get('cardColorHex');
		if (card_color.includes('gradient')) {
			qs.set('card_color', b64Encode(card_color.trim()));
		} else {
			card_color = card_color.includes('rgb') ? rgbToHex(card_color) : card_color;
			qs.set('card_color', card_color.slice(1));
		}

		// Background color
		let bg_color = data.get('bgColorHex');
		if (bg_color.includes('gradient')) {
			qs.set('bg_color', b64Encode(bg_color.trim()));
		} else {
			bg_color = bg_color.includes('rgb') ? rgbToHex(bg_color) : bg_color;
			qs.set('bg_color', bg_color.slice(1));
		}

		// Font & shadow colors
		let font_color = data.get('fontColorHex');
		let shadow_color = data.get('shadowColorHex');
		font_color = font_color.includes('rgb') ? rgbToHex(font_color) : font_color;
		shadow_color = shadow_color.includes('rgb') ? rgbToHex(shadow_color) : shadow_color;
		qs.set('font_color', font_color.replace(/^#/, ''));
		qs.set('shadow_color', shadow_color.replace(/^#/, ''));

		// Google Font
		const custom_font = data.get('customGoogleFont');
		if (custom_font) qs.set('google_font', custom_font);

		// Text alignment
		const text_align = data.get('textAlignment');
		if (text_align) qs.set('text_align', text_align);

		// Sizes and paddings (only if not default)
		const outer_pad = data.get('outerPad');
		if (outer_pad != 15) qs.set('outer_pad', outer_pad);

		const inner_pad = data.get('innerPad');
		if (inner_pad != 15) qs.set('inner_pad', inner_pad);

		const font_size = data.get('fontSize');
		if (font_size != 16) qs.set('font_size', font_size);

		const card_width = data.get('cardWidth');
		if (card_width != 400) qs.set('card_width', card_width);

		const card_min_height = data.get('cardMinHeight');
		if (card_min_height != 100) qs.set('card_min_height', card_min_height);
	}

	/* ----------- Build Final Card URL ----------- */
	const DEBUG = false;
	const cardPath = `/${data.get('card_name')}`;
	const url = `${cardPath}?${qs.toString()}${DEBUG ? `&t=${new Date().getTime()}` : ''}`;
	const host = window.location.protocol + '//' + window.location.host;

	// Prevent duplicate requests
	if (card_url_state === url) {
		loader.addClass('hidden');
		holder.removeClass('loading');
		return;
	}
	card_url_state = url;

	const preload = new Image();

	preload.onload = () => {
		preview.attr('src', preload.src);
		loader.addClass('hidden');
		preview.removeClass('hidden');
		previewContainer.removeClass('hidden');
		holder.removeClass('loading');
		$('#resultSection').removeClass('hidden');

		// Add success animation
		previewContainer.addClass('success-load');
		setTimeout(() => previewContainer.removeClass('success-load'), 1000);
	};

	preload.onerror = () => {
		loader.addClass('hidden');
		holder.removeClass('loading');
		placeholder.removeClass('hidden');
		placeholder.html(`
      <div class="text-center text-red-600 dark:text-red-400">
        <div class="w-16 h-16 mx-auto mb-4">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <p class="font-medium">Failed to load preview</p>
        <p class="text-sm mt-1 opacity-80">Please check your settings and try again</p>
      </div>
    `);
	};

	preload.src = url;

	// Update download and output links
	$('#downloadBtn').attr('href', url);
	const title = cardTitleMaker(data.get('card_name'));
	$('#mdOutput').val(`![${title}](${host}${url})`);
	$('#htmlOutput').val(`<img src="${host}${url}" alt="${title}" />`);
});

/* ---------- Card Title Formatter ---------- */
function cardTitleMaker(slug) {
	let title = slug.replaceAll('-', ' ');
	return title
		.split(' ')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

/* ---------- Copy to Clipboard ---------- */
const clipboard = new ClipboardJS('.copy-btn');
clipboard.on('success', (e) => {
	const btn = e.trigger;
	btn.dataset.tooltip = 'Copied!';
	btn.dataset.show = 'true';

	// Add success styling
	btn.classList.add('copy-success');

	setTimeout(() => {
		btn.dataset.tooltip = 'Copy';
		delete btn.dataset.show;
		btn.classList.remove('copy-success');
	}, 2000);
});

clipboard.on('error', (e) => {
	const btn = e.trigger;
	btn.dataset.tooltip = 'Failed to copy';
	btn.dataset.show = 'true';

	setTimeout(() => {
		btn.dataset.tooltip = 'Copy';
		delete btn.dataset.show;
	}, 2000);
});

/* ---------- Enhanced UI Interactions ---------- */
// Add ripple effect to buttons
document.addEventListener('click', function (e) {
	if (e.target.matches('.align-btn, .reset-btn, .random-grad-gen-btn')) {
		const button = e.target;
		const ripple = document.createElement('span');
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

		button.style.position = 'relative';
		button.style.overflow = 'hidden';
		button.appendChild(ripple);

		setTimeout(() => ripple.remove(), 600);
	}
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize tooltips
$(document).ready(function () {
	// Add hover effects to interactive elements
	$('button, select, input, .align-btn').hover(
		function () {
			$(this).addClass('hover-effect');
		},
		function () {
			$(this).removeClass('hover-effect');
		}
	);
});

console.log('GitHub Card Generator Enhanced UI Loaded!');
