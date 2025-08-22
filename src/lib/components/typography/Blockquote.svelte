<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<blockquote class={className} {...rest}>
	{@render children?.()}
	<svg
		class="quote-end"
		width="21"
		height="18"
		viewBox="0 0 21 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<path
				d="M20.992 7.552C20.992 9.30133 20.5013 11.136 19.52 13.056C18.496 14.976 17.2587 16.576 15.808 17.856L13.44 16.96C14.4213 15.4667 15.104 14.1227 15.488 12.928C15.872 11.776 16.1067 10.4747 16.192 9.024L11.776 9.024L11.776 1.10166e-06L20.992 1.90735e-06L20.992 7.552ZM9.15201 7.552C9.152 9.30133 8.66134 11.136 7.68 13.056C6.656 14.976 5.376 16.576 3.84 17.856L1.536 16.96C2.56001 15.4667 3.26401 14.1227 3.64801 12.928C3.98934 11.776 4.20267 10.4747 4.28801 9.024L4.58682e-06 9.024L5.37572e-06 7.21697e-08L9.15201 8.72263e-07L9.15201 7.552Z"
				fill="currentColor"
			/>
		</g>
	</svg>
</blockquote>

<style lang="scss" global>
	.prose blockquote {
		position: relative;

		> .quote-end {
			--scale: 0.4rem;
			position: absolute;
			height: min(calc(24 * var(--scale)), calc(100% + 32px));
			width: calc(21 * var(--scale));
			z-index: -1;
			bottom: -32px;
			right: 0;
			color: color-mix(in oklch, light-dark(var(--color-primary-200), var(--color-surface-400)) 15%, transparent);
		}

		> p {
			&::before,
			&::after {
				content: unset;
			}
		}
	}
</style>
