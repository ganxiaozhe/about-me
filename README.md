# AboutMe
基于 SvelteKit 构建的，适用于独立开发者的多功能自适应在线简历。

查看在线 Demo: [Cloudflare Pages](https://about.gxzv.com/resume?repo)

![部分页面截图](./readme/image.jpg)


## 简历结构
### 简述
![简述部分截图](./readme/image-1.jpg)
`/src/routes/+page.svelte`

手机号经过 `window.atob` 方法进行编码，非明文。实际分发链接时可以通过传参以明文显示，如：`resume?phone=18800000000`


### 工作经历
![工作经历部分截图](./readme/image-2.jpg)
`/src/lib/data/EmploymentList.ts`


### 个人项目
![个人项目部分截图](./readme/image-3.jpg)
`/src/lib/data/ProjectList.ts`

支持通过标签进行筛选：

![筛选功能截图](./readme/image-4.jpg)


### 个人能力
![个人能力部分截图](./readme/image-5.jpg)
`/src/lib/modules/AbilityListView.svelte`


### 个人技能
![个人技能部分截图](./readme/image-6.jpg)
`/src/lib/modules/SkillListView.svelte`


## 作证材料支持
![个人项目部分截图](./readme/image-7.jpg)