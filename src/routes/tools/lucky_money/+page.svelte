<!-- 
 TODO: 创建一个红包转账界面，上方是金额展示；
 下方是按键，包括 0～9 的数字，以及小数点、删除和确认按钮（考虑用 grid 布局）。
 下方按键的数字会实时更新到上方金额展示中。
 同时，为了表达 lucky_money 的含义，下方数字会随机变动。
-->

<script lang="ts">
	import Seo from '$lib/modules/SEO.svelte';
  import { onMount, onDestroy } from 'svelte';
	import toast from 'svelte-french-toast';

  let amount = '0';
  let inputCount = 0;
  let interval: any;
  let buttonValues: (number | string)[] = [...Array(9).fill(0).map((_, i) => i + 1), '.', 0, '←'];

  // 处理数字输入
  function handleInput(value: string) {
    // 检查第一次输入（百位）时的数字限制
    if (amount === '0' && value !== '.') {
      if (inputCount === 0 && Number(value) > 5) {
        return; // 如果是第一次输入且数字大于5，则忽略此次输入
      }
      amount = value;
      inputCount++;
    } else {
      // 处理小数点
      if (value === '.' && amount.includes('.')) return;
      if (value === '.' && amount === '0') {
        amount = '0.';
      } else {
        amount += value;
        if (value !== '.') {
          inputCount++;
        }
      }
    }

    console.log(`inputCount:`, inputCount);
  }

  // 处理删除
  function handleDelete() {
    if (amount.length === 1) {
      amount = '0';
      inputCount = 0;
    } else {
      amount = amount.slice(0, -1);
      inputCount = Math.max(0, inputCount - 1);
    }
  }

  function handleClear() {
    amount = '0';
    inputCount = 0;
  }

  // 处理确认
  function handleConfirm() {
    toast.success(`确认转账金额 ¥${Number(amount).toFixed(2)}`);
  }

  // 随机变动数字效果
  function startRandomEffect() {
    // 定义权重数组
    const weights = [15, 30, 10, 6, 4, 1, 1, 1, 1, 1];
    // 展开权重数组生成带权重的数字池
    const numberPool = weights.flatMap((weight, number) => 
      Array(weight).fill(number)
    );
    const specialChars = [
      '.', '←', '.', '←',
      '←', '←', '←', '←'
    ];
    // 将特殊字符也加入随机池中
    const fullPool = [...numberPool, ...specialChars];
    console.log(`fullPool:`, fullPool);

    interval = setInterval(() => {
      // 在首次输入时排除大于 5 的数字
      let pool = [...fullPool];
      if (inputCount < 1) {
        pool = pool.filter(num => (
          isNaN(Number(num)) || Number(num) <= 5
        ));
      }

      buttonValues = buttonValues.map((value) => {
        if (Math.random() > 0.7) { // 30% 的概率变化
          // 从完整的随机池中选择一个值
          const randomIndex = Math.floor(Math.random() * pool.length);
          return pool[randomIndex];
        }
        return value;
      });
    }, 300);
  }

  onMount(() => {
    startRandomEffect();
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<Seo title='幸运红包' />


<div class="min-h-screen p-4
flex justify-center items-center
">
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden w-full sm:min-w-96">
    <!-- 金额显示区域 -->
    <div class="p-8 bg-red-500 text-white">
      <div class="text-sm mb-2">金额</div>
      <div class="text-4xl font-bold">¥ {amount}</div>
    </div>

    <!-- 数字键盘 -->
    <div class="">
      <div class="grid grid-cols-3 border-l border-t border-gray-200">
        {#each buttonValues as value}
          {#if value === '←'}
            <button 
              class="text-black hover:bg-gray-100 p-4 py-6 text-xl font-semibold 
              border-b border-r border-gray-200"
              on:click={handleDelete}
            >
              {value}
            </button>
          {:else}
            <button 
              class="number-btn text-black hover:bg-gray-100 
              p-4 py-6 text-xl font-semibold 
              border-b border-r border-gray-200"
              on:click={() => handleInput(value.toString())}
            >
              {value}
            </button>
          {/if}
        {/each}

        <button 
          class="col-span-1 text-black bg-gray-100 hover:bg-gray-200 p-4 text-xl font-semibold
          border-r border-gray-200"
          on:click={handleClear}
        >
          清空
        </button>
        <button 
          class="col-span-2 bg-red-500 hover:bg-red-600 p-4 text-xl font-semibold text-white"
          on:click={handleConfirm}
        >
          确认
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  button {
    touch-action: manipulation;
  }
</style>