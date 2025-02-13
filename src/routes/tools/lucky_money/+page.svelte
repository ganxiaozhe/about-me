<!-- 
 TODO: 创建一个红包转账界面，上方是金额展示；
 下方是按键，包括 0～9 的数字，以及小数点、删除和确认按钮（考虑用 grid 布局）。
 下方按键的数字会实时更新到上方金额展示中。
 同时，为了表达 lucky_money 的含义，下方数字会随机变动。
-->

<script lang="ts">
	import Seo from '$lib/modules/SEO.svelte';
  import { onMount, onDestroy } from 'svelte';

  let amount = '0';
  let interval: any;
  let buttonValues: (number | string)[] = [...Array(9).fill(0).map((_, i) => i + 1), '.', 0, '←'];

  // 处理数字输入
  function handleInput(value: string) {
    if (amount === '0' && value !== '.') {
      amount = value;
    } else {
      // 处理小数点
      if (value === '.' && amount.includes('.')) return;
      if (value === '.' && amount === '0') {
        amount = '0.';
      } else {
        amount += value;
      }
    }
  }

  // 处理删除
  function handleDelete() {
    if (amount.length === 1) {
      amount = '0';
    } else {
      amount = amount.slice(0, -1);
    }
  }

  // 处理确认
  function handleConfirm() {
    alert(`确认转账金额：${amount}元`);
  }

  // 随机变动数字效果
  function startRandomEffect() {
    // 定义权重数组
    const weights = [9, 8, 7, 6, 5, 1, 1, 1, 1, 1];
    // 展开权重数组生成带权重的数字池
    const numberPool = weights.flatMap((weight, number) => 
      Array(weight).fill(number)
    );
    const specialChars = ['.', '←'];
    console.log(`numberPool:`, numberPool);

    interval = setInterval(() => {
      buttonValues = buttonValues.map((value) => {
        if (Math.random() > 0.7) { // 30%的概率变化
          if (specialChars.includes(value as string)) {
            // 特殊字符在自己和其他特殊字符之间随机切换
            return specialChars[Math.floor(Math.random() * specialChars.length)];
          } else {
            // 数字从带权重的数字池中随机选择
            const randomIndex = Math.floor(Math.random() * numberPool.length);
            return numberPool[randomIndex];
          }
        }
        return value;
      });
    }, 200);
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
    <div class="p-4">
      <div class="grid grid-cols-3 gap-4">
        {#each buttonValues as value}
          {#if value === '←'}
            <button 
              class="text-black bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-xl font-semibold"
              on:click={handleDelete}
            >
              {value}
            </button>
          {:else}
            <button 
              class="number-btn text-black bg-gray-100 hover:bg-gray-200 
              p-4 rounded-lg text-xl font-semibold"
              on:click={() => handleInput(value.toString())}
            >
              {value}
            </button>
          {/if}
        {/each}
        <button 
          class="col-span-3 bg-red-500 hover:bg-red-600 p-4 rounded-lg text-xl font-semibold text-white"
          on:click={handleConfirm}
        >
          确认
        </button>
      </div>
    </div>
  </div>
</div>