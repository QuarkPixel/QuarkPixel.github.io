<script lang="ts">
	import Icon from '@iconify/svelte';

	const { class: className = '', ...rest } = $props();
</script>

<a
	class="group chip text-surface-contrast-50-950 bg-background h-full rounded-full {className}"
	href="https://www.travellings.cn/go.html"
	target="_blank"
	rel="noopener"
	title="开往-友链接力"
	{...rest}
>
	<div class="icons">
		<div class="logo">
			<Icon icon="fa6-solid:train-subway" />
		</div>
		<div class="arrow">
			<Icon icon="mdi:arrow-top-right-thick" />
		</div>
	</div>
	<span class="desc-wrapper pointer-events-none">
		<div class="desc">Travelling</div>
	</span>
</a>

<style lang="scss">
	a {
		overflow: hidden;
		gap: 0;

		.icons {
			position: relative;

			.logo {
				transition: 0.6s;
			}

			.arrow {
				transition:
					opacity 0.4s,
					transform 0s 0.4s;
				position: absolute;
				transform: translate(-100%, 100%);
				top: 0;
				left: 0;
				opacity: 0;
			}
		}

		.desc-wrapper {
			display: grid;
			grid-template-columns: 0fr;
			transition:
				grid-template-columns 0.4s,
				opacity 0.3s ease;
			opacity: 0;

			.desc {
				transition: 0.8s var(--ease-jelly);
				font-family: var(--font-gravitas-one);
				grid-column: 1 / span 2;
				transform: translateX(50%);
			}
		}

		&:hover {
			gap: 0.4rem;

			.icons {
				& > * {
					transition: 0.5s 0.2s;
				}

				.logo {
					opacity: 0;
				}

				.arrow {
					//left: 0;
					//bottom: 0;
					transform: unset;
					opacity: 1;
				}
			}

			.desc-wrapper {
				opacity: 1;
				grid-template-columns: 1fr;

				.desc {
					transform: unset;
				}
			}
		}
	}
</style>
