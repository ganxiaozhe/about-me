<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card } from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Badge } from "$lib/components/ui/badge";
	import { Slider } from "$lib/components/ui/slider";
	import { Input } from "$lib/components/ui/input";
  import * as Collapsible from "$lib/components/ui/collapsible";
	import { ChevronDown, ChevronUp, Search } from "lucide-svelte";
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Seo from "$lib/modules/SEO.svelte";
  import { 
    HumanHighIntensityQuestions, 
    LowIntensityQuestions, 
    MediumHighIntensityQuestions, 
    SexHighIntensityQuestions, 
    HypotheticalQuestions,
    type Question 
  } from "./questions";

  const questions: Question[] = [
    ...LowIntensityQuestions,
    ...MediumHighIntensityQuestions,
    ...SexHighIntensityQuestions,
    ...HumanHighIntensityQuestions,
		...HypotheticalQuestions
  ];

  let counter = 0;
	let categorySearchTerm = "";
	let tagSearchTerm = "";

	let showIncludeCategories = true;
	let showExcludeCategories = false;
	let showIncludeTags = false;
	let showExcludeTags = false;
	// 记录搜索前的展开状态
	let wasIncludeCategoriesOpen = true;
	let wasExcludeCategoriesOpen = false;
	let wasIncludeTagsOpen = false;
	let wasExcludeTagsOpen = false;

	// 根据搜索输入控制 Collapsible 状态
	$: {
		if (categorySearchTerm) {
			showIncludeCategories = true;
			showExcludeCategories = true;
		} else {
			showIncludeCategories = wasIncludeCategoriesOpen;
			showExcludeCategories = wasExcludeCategoriesOpen;
		}
	}

	$: {
		if (tagSearchTerm) {
			showIncludeTags = true;
			showExcludeTags = true;
		} else {
			showIncludeTags = wasIncludeTagsOpen;
			showExcludeTags = wasExcludeTagsOpen;
		}
	}

	// 记录用户手动切换的状态
	function handleIncludeCategoriesToggle() {
		wasIncludeCategoriesOpen = showIncludeCategories;
	}
	function handleExcludeCategoriesToggle() {
		wasExcludeCategoriesOpen = showExcludeCategories;
	}
	function handleIncludeTagsToggle() {
		wasIncludeTagsOpen = showIncludeTags;
	}
	function handleExcludeTagsToggle() {
		wasExcludeTagsOpen = showExcludeTags;
	}

	// 筛选条件
	let selectedCategories: string[] = [];
	let excludedCategories: string[] = [];
	let selectedTags: string[] = [];
	let excludedTags: string[] = [];
	let intensityLevel = [6];
	
	// 当前显示的题目
	let currentQuestion: typeof questions[0] | null = null;
	let isAnimating = false;

	// 根据筛选条件过滤题目
	$: filteredQuestions = questions.filter(q => {
		const categoryMatch = 
			(selectedCategories.length === 0 || (q.category && selectedCategories.includes(q.category))) &&
			!(q.category && excludedCategories.includes(q.category));
		
		const tagMatch = 
			(selectedTags.length === 0 || (q.tags && q.tags.some(tag => selectedTags.includes(tag)))) &&
			!(q.tags && q.tags.some(tag => excludedTags.includes(tag)));
		
		const intensityMatch = q.intensity <= intensityLevel[0];
		
		return categoryMatch && tagMatch && intensityMatch;
	});

	// 获取所有可用的分类和标签并过滤空值
	$: categories = [...new Set(questions.map(q => q.category))].filter((c): c is string => Boolean(c));
	$: tags = [...new Set(questions.flatMap(q => q.tags || []))].filter((t): t is string => Boolean(t));

	// 搜索过滤
	$: filteredCategories = categories.filter(category => 
		category.toLowerCase().includes(categorySearchTerm.toLowerCase())
	);
	$: filteredTags = tags.filter(tag => 
		tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
	);

	function toggleCategory(category: string, isExcluded: boolean = false) {
		console.log(category, isExcluded);
		if (isExcluded) {
			excludedCategories = excludedCategories.includes(category)
				? excludedCategories.filter(c => c !== category)
				: [...excludedCategories, category];
		} else {
			selectedCategories = selectedCategories.includes(category)
				? selectedCategories.filter(c => c !== category)
				: [...selectedCategories, category];
		}
	}

	function toggleTag(tag: string, isExcluded: boolean = false) {
		if (isExcluded) {
			excludedTags = excludedTags.includes(tag)
				? excludedTags.filter(t => t !== tag)
				: [...excludedTags, tag];
		} else {
			selectedTags = selectedTags.includes(tag)
				? selectedTags.filter(t => t !== tag)
				: [...selectedTags, tag];
		}
	}

	async function drawNewQuestion() {
		if (isAnimating || filteredQuestions.length === 0) return;

    counter++;
		
		isAnimating = true;
		currentQuestion = null;
		
		await new Promise(resolve => setTimeout(resolve, 300));
		
		const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
		currentQuestion = filteredQuestions[randomIndex];
		
		isAnimating = false;
	}
</script>

<Seo title='Tell The Truth | 真心话大冒险' />

<div class="container mx-auto px-4 py-12 max-w-3xl">
	<h1 class="text-4xl font-bold text-center mb-12">Tell The Truth</h1>

	<div class="grid gap-6 mb-8">
		<Card class="p-6">
			<h2 class="text-xl font-semibold mb-4">筛选选项</h2>
			<div class="grid gap-6">
				<div class="grid gap-4">
					<div class="space-y-4">
						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-medium">分类</h3>
								<div class="relative w-48">
									<Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="搜索分类..."
										class="pl-8"
										bind:value={categorySearchTerm}
									/>
								</div>
							</div>
							
							<div class="space-y-2">
								<Collapsible.Root bind:open={showIncludeCategories} on:change={handleIncludeCategoriesToggle}>
									<div class="flex items-center justify-between">
										<h4 class="text-sm text-gray-500">包含：</h4>
										<Collapsible.Trigger class="p-1">
											{#if showIncludeCategories}
												<ChevronUp class="h-4 w-4" />
											{:else}
												<ChevronDown class="h-4 w-4" />
											{/if}
										</Collapsible.Trigger>
									</div>
									<Collapsible.Content>
										<div class="grid grid-cols-4 md:grid-cols-6 gap-2 pt-2">
											{#each filteredCategories as category}
												<Button
													size="sm"
													variant={selectedCategories.includes(category) ? "default" : "outline"}
													class="cursor-pointer truncate"
													on:click={() => toggleCategory(category)}
												>
													{category}
												</Button>
											{/each}
										</div>
									</Collapsible.Content>
								</Collapsible.Root>

								<Collapsible.Root bind:open={showExcludeCategories} on:change={handleExcludeCategoriesToggle}>
									<div class="flex items-center justify-between">
										<h4 class="text-sm text-gray-500">排除：</h4>
										<Collapsible.Trigger class="p-1">
											{#if showExcludeCategories}
												<ChevronUp class="h-4 w-4" />
											{:else}
												<ChevronDown class="h-4 w-4" />
											{/if}
										</Collapsible.Trigger>
									</div>
									<Collapsible.Content>
										<div class="grid grid-cols-4 md:grid-cols-6 gap-2 pt-2">
											{#each filteredCategories as category}
												<Button
													size="sm"
													variant={excludedCategories.includes(category) ? "destructive" : "outline"}
													class="cursor-pointer truncate"
													on:click={() => toggleCategory(category, true)}
												>
													{category}
												</Button>
											{/each}
										</div>
									</Collapsible.Content>
								</Collapsible.Root>
							</div>
						</div>

						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-medium">标签</h3>
								<div class="relative w-48">
									<Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="搜索标签..."
										class="pl-8"
										bind:value={tagSearchTerm}
									/>
								</div>
							</div>
							
							<div class="space-y-2">
								<Collapsible.Root bind:open={showIncludeTags} on:change={handleIncludeTagsToggle}>
									<div class="flex items-center justify-between">
										<h4 class="text-sm text-gray-500">包含：</h4>
										<Collapsible.Trigger class="p-1">
											{#if showIncludeTags}
												<ChevronUp class="h-4 w-4" />
											{:else}
												<ChevronDown class="h-4 w-4" />
											{/if}
										</Collapsible.Trigger>
									</div>
									<Collapsible.Content>
										<div class="grid grid-cols-4 md:grid-cols-6 gap-2 pt-2">
											{#each filteredTags as tag}
												<Button
													size="sm"
													variant={selectedTags.includes(tag) ? "default" : "outline"}
													class="cursor-pointer truncate"
													on:click={() => toggleTag(tag)}
												>
													{tag}
												</Button>
											{/each}
										</div>
									</Collapsible.Content>
								</Collapsible.Root>

								<Collapsible.Root bind:open={showExcludeTags} on:change={handleExcludeTagsToggle}>
									<div class="flex items-center justify-between">
										<h4 class="text-sm text-gray-500">排除：</h4>
										<Collapsible.Trigger class="p-1">
											{#if showExcludeTags}
												<ChevronUp class="h-4 w-4" />
											{:else}
												<ChevronDown class="h-4 w-4" />
											{/if}
										</Collapsible.Trigger>
									</div>
									<Collapsible.Content>
										<div class="grid grid-cols-4 md:grid-cols-6 gap-2 pt-2">
											{#each filteredTags as tag}
												<Button
													size="sm"
													variant={excludedTags.includes(tag) ? "destructive" : "outline"}
													class="cursor-pointer truncate"
													on:click={() => toggleTag(tag, true)}
												>
													{tag}
												</Button>
											{/each}
										</div>
									</Collapsible.Content>
								</Collapsible.Root>
							</div>
						</div>
					</div>

					<div class="space-y-2">
						<label for="intensity-slider" class="text-lg font-medium">刺激程度 {intensityLevel} / 10</label>
						<Slider
							id="intensity-slider"
							bind:value={intensityLevel}
							min={1}
							max={10}
							step={1}
						/>
					</div>
				</div>
			</div>
		</Card>

		<Card class="p-6">
			<div class="text-center">
				<div class="min-h-[200px] md:px-16 flex items-center justify-center mb-6">
					{#if currentQuestion}
						<div
							class="text-xl"
							in:fly={{ y: 50, duration: 500, easing: quintOut }}
							out:fly={{ y: -50, duration: 300 }}
						>
							{currentQuestion.content}
						</div>
					{:else if counter < 1}
						<div out:fade={{duration: 300}} class="text-gray-500">点击下方按钮抽取题目</div>
					{/if}
				</div>

				{#if currentQuestion}
					<div class="flex gap-2 justify-center mb-6">
						<Badge variant="secondary">{currentQuestion.category || '未分类'}</Badge>
						{#each currentQuestion.tags || [] as tag}
							<Badge variant="outline">{tag}</Badge>
						{/each}
						<Badge variant="destructive">刺激度 {currentQuestion.intensity}</Badge>
					</div>
				{/if}

				<Button
					size="lg"
					on:click={drawNewQuestion}
					disabled={filteredQuestions.length === 0}
				>
					{filteredQuestions.length === 0 ? '没有符合条件的题目' : '抽取新题目'}
				</Button>
        <p class="text-xs text-gray-500 mt-2">总题库：{questions.length} 题，当前题库：{filteredQuestions.length} 题</p>
			</div>
		</Card>
	</div>
</div>
