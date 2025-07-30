/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': 'var(--color-surface-800-200)',
						'--tw-prose-headings': 'var(--color-surface-900-100)',
						'--tw-prose-lead': 'var(--color-surface-700-300)',
						'--tw-prose-links': 'light-dark(var(--color-primary-400), var(--color-primary-500))',
						'--tw-prose-bold': 'var(--color-surface-900-100)',
						'--tw-prose-counters': 'var(--color-surface-600-400)',
						'--tw-prose-bullets': 'var(--color-surface-400-600)',
						'--tw-prose-hr': 'var(--color-surface-300-700)',
						'--tw-prose-quotes': 'var(--color-surface-900-100)',
						'--tw-prose-quote-borders': 'var(--color-primary-200-800)',
						'--tw-prose-captions': 'var(--color-surface-700-300)',
						'--tw-prose-code': 'var(--color-surface-900-100)',
						'--tw-prose-pre-code': 'var(--color-surface-100-900)',
						'--tw-prose-pre-bg': 'var(--color-surface-900-100)',
						'--tw-prose-th-borders': 'var(--color-surface-300-700)',
						'--tw-prose-td-borders': 'var(--color-surface-200-800)',

						// 添加链接样式
						a: {
							color: 'var(--tw-prose-links)',
							textDecoration: 'none',
							fontWeight: '500',
							'&:hover': {
								textDecoration: 'underline'
							}
						},

						// 添加标题字体样式
						'h1, h2, h3, h4, h5, h6': {
							fontFamily: 'var(--font-noto-serif)'
						},

						blockquote: {
							color: 'inherit',
							opacity: '0.9'
						},

						img: {
							'border-radius': 'var(--radius-xl)'
						},

						code: {
							backgroundColor: 'var(--color-primary-100-900)',
							borderRadius: 'var(--radius-base)',
							color: 'var(--color-primary-contrast-50-950)',
							whiteSpace: 'nowrap',
							paddingInline: 'calc(var(--spacing) * 1)',
							paddingBlock: 'calc(var(--spacing) * .4)',
							marginInline: 'calc(var(--spacing) * .5)',
							overflowX: 'auto',
							fontWeight: 'normal'
						},
						'code::before': {
							content: ''
						},
						'code::after': {
							content: ''
						},
						'a code': {
							color: 'inherit',
							background: 'unset',
							marginInline: 'unset'
						},
						'img + em': {
							display: 'block',
							marginTop: '-1.75em',
							marginBottom: '0.25em',
							fontSize: '0.875rem',
							opacity: '0.7',
							fontFamily: 'var(--font-noto-sans)'
						},
						'strong > em': {
							// Rewrite as smaller inline
							fontSize: 'smaller',
							opacity: '0.7'
						}
					}
				}
			})
		}
	}
};
