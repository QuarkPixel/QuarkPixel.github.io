<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { circInOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<SVGElement> {
		official?: boolean;
	}

	const { official = true, ...rest }: Props = $props();

	const easing: (t: number) => number = circInOut;

	type Point = number[];

	type Shape = Point[];

	interface AnimateDefinition {
		initial: Shape,
		target: Shape,
		fill: string,
		tween: Tween<number>
	}

	// Define initial and target path coordinates with fill colors
	const paths: AnimateDefinition[] = [
		{
			initial: [[11.7642, 3.46387], [15.7642, 3.46387], [38.5312, 41.61], [34.5312, 41.61]],
			target: [[11.7642, 3.46387], [15.7642, 3.46387], [22.2574, 14.3342], [20.2018, 17.5893]],
			fill: '#309898',
			tween: new Tween(0, { duration: 700, delay: 100, easing })
		},
		{
			initial: [[15.7642, 3.46387], [19.7642, 3.46387], [42.5312, 41.61], [38.5312, 41.61]],
			target: [[15.7642, 3.46387], [19.7642, 3.46387], [24.3196, 11.0685], [22.2574, 14.3342]],
			fill: '#FE9F0D',
			tween: new Tween(0, { duration: 700, delay: 200, easing })

		},
		{
			initial: [[19.7642, 3.46387], [23.7642, 3.46387], [46.5313, 41.61], [42.5312, 41.61]],
			target: [[19.7642, 3.46387], [23.7642, 3.46387], [26.3686, 7.82389], [24.3196, 11.0685]],
			fill: '#F4631E',
			tween: new Tween(0, { duration: 600, delay: 100, easing })
		},
		{
			initial: [[23.7642, 3.46387], [26.794, 3.46387], [49.5586, 41.61], [46.5312, 41.61]],
			target: [[23.7642, 3.46387], [26.794, 3.46387], [27.925, 5.35916], [26.3686, 7.82389]],
			fill: '#D92E10',
			tween: new Tween(0, { duration: 900, delay: 0, easing })
		}
	];

	// Derive interpolated path coordinates
	let interpolatedPaths: Shape[] = $derived(
		paths.map(path =>
			path.initial.map((start, i) => {
				const end = path.target[i];
				const x = start[0] + (end[0] - start[0]) * path.tween.current;
				const y = start[1] + (end[1] - start[1]) * path.tween.current;
				return [x, y];
			})
		)
	);

	// Derive SVG path d attributes
	let dValues: string[] = $derived(
		interpolatedPaths.map(points =>
			`M${points.map((point) => point.join(' ')).join('L')}Z`
		)
	);

	const global = new Tween(0, { duration: 900, easing });

	$effect(() => {
		const value = official ? 1 : 0;
		paths.forEach((path) => {
			path.tween.target = value;
		});
		global.target = value;
	});

</script>

<svg {...rest} style="transform: scale({1.2 - global.current / 5})" width="58" height="44" viewBox="0 0 58 44" fill="none"
		 xmlns="http://www.w3.org/2000/svg">
	<path
		d="M0.618652 41.6084C1.50667 41.6084 2.25342 41.5781 2.85889 41.5176C3.48454 41.4368 4.00928 41.3258 4.43311 41.1846C4.85693 41.0231 5.21012 40.8213 5.49268 40.5791C5.77523 40.3369 6.01742 40.0544 6.21924 39.7314L17.63 21.66L27.925 5.35916L26.794 3.46387L6.76102 3.46387L1.95068 3.46387V1.10254H34.5854V3.46387H29.7417L38.7026 18.4795L47.2095 5.25C47.27 5.16927 47.3003 5.03809 47.3003 4.85645C47.3003 4.59408 47.159 4.38216 46.8765 4.2207C46.6141 4.03906 46.2407 3.89779 45.7563 3.79688C45.272 3.67578 44.6867 3.59505 44.0005 3.55469C43.3345 3.49414 42.5978 3.46387 41.7905 3.46387V1.10254H55.8979V3.46387C55.0099 3.46387 54.2531 3.50423 53.6274 3.58496C53.0018 3.66569 52.4771 3.78678 52.0532 3.94824C51.6294 4.08952 51.2762 4.28125 50.9937 4.52344C50.7313 4.74544 50.4992 5.0179 50.2974 5.34082L40.3071 21.1738L52.5376 41.6084H57.3813V44H24.7466V41.6084H29.5601L19.2368 24.3525L9.27686 39.8828C9.21631 39.9837 9.18604 40.0947 9.18604 40.2158C9.18604 40.4984 9.31722 40.7305 9.57959 40.9121C9.86214 41.0736 10.2456 41.2148 10.73 41.3359C11.2345 41.4368 11.8198 41.5075 12.4858 41.5479C13.172 41.5882 13.9188 41.6084 14.7261 41.6084V44H0.618652V41.6084Z"
		fill="currentColor" />
	<path d="M27.925 5.35916L26.794 3.46387L6.76102 3.46387L17.63 21.66L27.925 5.35916Z" fill="currentColor"
				fill-opacity="0.8" />
	{#each paths as path, i (i)}
		<path d={dValues[i]} fill={path.fill} />
	{/each}
</svg>