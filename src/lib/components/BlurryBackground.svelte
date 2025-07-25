<script lang="ts">
	import { lightDark } from '$lib/stores/theme.js';
	import { isSafari } from '$lib/utils/isSafari.js';
	import { isFirefox } from '$lib/utils/isFirefox.js';

	const slopeValue = lightDark(1, 0.3);
	let shouldUseSimpleBlur = true;

	// 在客户端检测浏览器类型
	if (typeof window !== 'undefined') {
		shouldUseSimpleBlur = isSafari() || isFirefox();
	}
</script>

<svg class="hidden">
	<filter id="noisy-blur" width="200%" height="200%">
		<feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blurred" />
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
		class="bg-tertiary-400 w-64 h-64 left-[20%] -top-4 opacity-25 [--animation-delay:1s] [--rotate-offset:5deg]"
	></div>
	<div
		class="bg-success-500 w-96 h-96 left-[60%] top-8 opacity-10 rounded-[30%] [--animation-delay:0s]
			[--rotate-offset:-3deg]"
	></div>
	<div
		class="bg-success-500 w-32 h-32 left-[60%] top-8 opacity-30 [--animation-delay:0.3s]
			[--rotate-offset:-3deg]"
	></div>
	<div
		class="bg-primary-300 w-80 h-80 left-[30%] top-1 opacity-15 [--animation-delay:3s] [--rotate-offset:8deg]"
	></div>
	<div
		class="bg-warning-100 w-72 h-72 left-[85%] -top-8 opacity-20 [--animation-delay:2s] [--rotate-offset:-7deg]"
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

		> div {
			position: absolute;
			padding: 2rem;
			animation: pop-blob 5s infinite;
			animation-delay: calc(5s - var(--animation-delay));
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
