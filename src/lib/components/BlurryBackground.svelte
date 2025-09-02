<script lang="ts">
	import { lightDark } from '$lib/stores/theme.js';
	import { isSafari } from '$lib/utils/isSafari.js';
	import { isFirefox } from '$lib/utils/isFirefox.js';

	const slopeValue = lightDark(1, 0.3);
	let shouldUseSimpleBlur = $state(true);

	// 在客户端检测浏览器类型
	if (typeof window !== 'undefined') {
		shouldUseSimpleBlur = isSafari() || isFirefox();
	}

	let width = $state(0);
	let stdDeviation = $derived(clamp(width, 500, 2160) / 16);

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}
</script>

<svelte:window bind:innerWidth={width} />

<svg class="hidden">
	<filter id="noisy-blur" width="200%" height="200%">
		<feGaussianBlur in="SourceGraphic" {stdDeviation} result="blurred" />
		<feTurbulence baseFrequency="0.5" numOctaves="4" result="turbulence" />
		<feColorMatrix
			type="matrix"
			values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 -40 10"
			in="turbulence"
			result="noise-mask"
		/>

		<feComposite in="blurred" in2="noise-mask" operator="in" result="noised" />
		<feComponentTransfer in="noised" result="noised-faded">
			<feFuncA type="linear" slope={$slopeValue} />
		</feComponentTransfer>

		<feMerge result="final">
			<feMergeNode in="blurred" />
			<feMergeNode in="noised-faded" />
		</feMerge>
	</filter>
</svg>
<div class="blurry-bg" style:filter={shouldUseSimpleBlur ? 'blur(100px)' : 'url(#noisy-blur)'}>
	<div
		class="bg-tertiary-400 left-[20%] -top-4 opacity-25 [--size:20] [--animation-delay:1s]
			[--rotate-offset:5deg] [--animation-duration:6s]"
	></div>
	<div
		class="bg-success-500 left-[60%] top-8 opacity-10 rounded-[30%] [--size:29] [--animation-delay:0s]
			[--rotate-offset:-3deg] [--animation-duration:4.5s]"
	></div>
	<div
		class="bg-success-500 left-[60%] top-8 opacity-30 [--size:10] [--animation-delay:0.3s]
			[--rotate-offset:-3deg] [--animation-duration:7s]"
	></div>
	<div
		class="bg-primary-300 left-[35%] top-1 opacity-15 [--size:24] [--animation-delay:3s] [--rotate-offset:8deg]
			[--animation-duration:5.5s]"
	></div>
	<div
		class="bg-warning-400 left-[85%] -top-8 rounded-[30%] opacity-25 [--size:22] [--animation-delay:2s]
			[--rotate-offset:-7deg] [--animation-duration:8s]"
	></div>
</div>

<style lang="scss">
	.blurry-bg {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 0;
		width: var(--auto-width);
		pointer-events: none;

		> div {
			position: absolute;
			padding: 2rem;
			--calculated-size: clamp(
				calc(375px * var(--size) / 100),
				calc(var(--size) * 1vw),
				calc(2160px * var(--size) / 100)
			);
			width: var(--calculated-size);
			height: var(--calculated-size);
			animation: pop-blob var(--animation-duration, 5s) infinite;
			animation-delay: calc(var(--animation-delay));
			transform: translate(-50%, -50%);
		}

		@keyframes pop-blob {
			0% {
				transform: translate(-50%, -50%) scale(1) rotate(calc(0deg + var(--rotate-offset))); /* 初始位置 */
			}

			33% {
				transform: translate(-50%, -50%) scale(1.4) rotate(calc(30deg + var(--rotate-offset)));
			}

			66% {
				transform: translate(-50%, -50%) scale(0.6) rotate(calc(60deg + var(--rotate-offset)));
			}

			100% {
				transform: translate(-50%, -50%) scale(1) rotate(calc(90deg + var(--rotate-offset)));
			}
		}
	}
</style>
