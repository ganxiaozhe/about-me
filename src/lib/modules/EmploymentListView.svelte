<script lang='ts'>
	export let EmploymentList:EmploymentItem[];
</script>


{#each EmploymentList as item(item.name)}
<div class='px-profile'>
  <div class='flex items-center justify-between'>
    <h2 class='font-semibold sm:text-lg'>{item.name}</h2>
    <p>{item.location}</p>
  </div>
  <div class='flex items-center justify-between text-sm'>
    {#if item.role}
    <i>{item.role}</i>
    {/if}
    {#if item.created_at||item.finished_at}
    <i>{item.created_at} / {item.finished_at||'至今'}</i>
    {/if}
  </div>
  {#if item.contents}
  <ul class='list-disc space-y-2 pl-4 mt-2 
  text-sm opacity-90'>
    {#each item.contents as content}
    <li>{content}</li>
    {/each}
  </ul>
  {/if}
  {#if item.supports}
  <ul class='mt-3 grid grid-cols-1 items-stretch'>
    {#each item.supports as sup, i}
    <img src='/employments/{item.id}/{sup.value}' alt='佐证材料 #{i}' 
    data-lightbox={true} data-width={sup.imageSize?.width} data-height={sup.imageSize?.height} />
    {/each}
  </ul>
  {/if}
</div>
{/each}