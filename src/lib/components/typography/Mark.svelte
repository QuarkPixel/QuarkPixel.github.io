<script>
	const { children, hoverable = false, class: className = '', ...rest } = $props();
</script>

<mark class="{hoverable ? 'hoverable' : ''} {className}" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</mark>

<style lang="scss">
  mark {
    background-color: unset;
    color: inherit;
    position: relative;

    &::before {
      content: '';
      pointer-events: none;
      z-index: -1;
      transition: .5s var(--ease-jelly);

      position: absolute;
      top: 60%;
      left: 0;
      bottom: 10%;
      right: 0;

      background-color: var(--color-primary-500);
      opacity: .4;
    }

    &.hoverable:hover::before {
      opacity: .6;
      top: 40%;
      bottom: 15%;
    }
  }
</style>