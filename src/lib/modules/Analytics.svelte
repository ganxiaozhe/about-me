<svelte:head>
	<!-- 51.LA Analytics -->
	<script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
	<script>
		if (typeof __AnalyTimer == 'undefined') {
			let __AnalyTimer = setInterval(() => {
				if (!LA || !LA.init) {return;}

				LA.init({id:"KEIxrFsbADmTVb9W",ck:"KEIxrFsbADmTVb9W"});
				clearInterval(__AnalyTimer);
			}, 500);
		}
	</script>
</svelte:head>
