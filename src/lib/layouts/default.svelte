<script lang="ts" module>
	import { H1, H2, H3, H4, H5, H6, Mark } from '$lib/components/typography/index.js';

	// 导出这些组件以供 mdsvex 使用
	export {
		// eslint-disable-next-line no-import-assign
		H1 as h1,
		// eslint-disable-next-line no-import-assign
		H2 as h2,
		// eslint-disable-next-line no-import-assign
		H3 as h3,
		// eslint-disable-next-line no-import-assign
		H4 as h4,
		// eslint-disable-next-line no-import-assign
		H5 as h5,
		// eslint-disable-next-line no-import-assign
		H6 as h6,
		// eslint-disable-next-line no-import-assign
		Mark as mark
	};
</script>

<script lang="ts">
	const {
		children
	} = $props();
</script>


<div>
	DEFAULT
	{@render children()}
</div>
