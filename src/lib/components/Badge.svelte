<script lang='ts'>
  export let type:string = 'default';
  export let icon:string = '';
  export let iconClass:string = '';
  export let rightClass:string = 'bg-neutral';
  export let size:string = 'md';
</script>


<div class='badge-item bg-muted/50 {size}'>
  <div class='bg-muted'>
    {#if type==='gender'}
    <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon {iconClass}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
      <path d="M19 5l-5.4 5.4"></path>
      <path d="M19 5h-5"></path>
      <path d="M19 5v5"></path>
    </svg>
    {/if}
    {#if type==='mail'}
    <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon {iconClass}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
      <path d="M3 7l9 6l9 -6"></path>
    </svg>
    {/if}
    {#if type==='phone'}
    <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon {iconClass}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 3h8.5l4.5 4.5v12.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z"></path>
      <path d="M9 11h3v6"></path>
      <path d="M15 17v.01"></path>
      <path d="M15 14v.01"></path>
      <path d="M15 11v.01"></path>
      <path d="M9 14v.01"></path>
      <path d="M9 17v.01"></path>
    </svg>
    {/if}
    {#if type==='website'}
    <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon {iconClass}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4"></path>
      <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4"></path>
      <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4"></path>
      <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4"></path>
      <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4"></path>
      <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4"></path>
      <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4"></path>
      <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4"></path>
      <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4"></path>
    </svg>
    {/if}
    {#if type==='link'}
    <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon {iconClass}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 15l6 -6"></path>
      <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path>
      <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path>
    </svg>
    {/if}

    {#if type==='default'}
      <span class={iconClass}>{icon}</span>
    {/if}
  </div>

  <div class='{rightClass} min-w-[30px] 
  text-white'>
    <slot />
  </div>
</div>


<style>
  .badge-item {
    position: relative;display: inline-flex;
    align-items: stretch;
    flex-wrap: wrap;
    border-radius: 2px;overflow: hidden;
  }
  .badge-icon {
    width: 14px;height: 14px;
  }
  .badge-item > div {
    display: inline-flex;
    align-items: center;justify-content: center;
    font-size: 11px;padding: 1px 5px;
  }
  .badge-item.sm > div {
    font-size: 10px;padding: 0px 5px;
  }
</style>