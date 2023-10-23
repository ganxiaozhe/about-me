<script lang='ts'>
  const EmploymentList:EmploymentList[] = [
    {
      name: '荣昌区甘小蔗网络技术工作室',
      location: '重庆, 中国',
      role: 'CEO / CTO',
      created_at: '2020-03-16',
      finished_at: '2022-03-03'
    },
    {
      name: '***',
      location: '',
      role: '保密需要该经历不可见',
      created_at: '2020-05',
      finished_at: '2021-05'
    },
    {
      name: '广西迈特优科技发展有限公司',
      location: '远程工作',
      role: 'CTO',
      created_at: '2021-05'
    },
    {
      name: '重庆浮木科技有限公司',
      location: '重庆, 中国',
      role: 'CEO / CTO',
      created_at: '2021-12-14'
    }
  ];
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
</div>
{/each}