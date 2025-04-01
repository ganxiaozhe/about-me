<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card } from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Badge } from "$lib/components/ui/badge";
	import { Slider } from "$lib/components/ui/slider";
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Seo from "$lib/modules/SEO.svelte";

	// 题目数据
  interface Question {
    content: string;
    category?: string;
    tags?: string[];
    intensity: number;
  }

  const highIntensityQuestions: Question[] = [
    {
      content: "你曾经对伴侣撒过的最大的谎是什么？",
      category: "关系",
      tags: ["诚实", "伴侣"],
      intensity: 8
    },
    {
      content: "描述一下你最疯狂的性幻想，不要隐藏细节",
      category: "性",
      tags: ["幻想", "刺激"],
      intensity: 9
    },
    {
      content: "你有没有对现在在座的某个人产生过性幻想？是谁？",
      category: "性",
      tags: ["幻想", "现场"],
      intensity: 9
    },
    {
      content: "你曾经做过的最出格的性体验是什么？",
      category: "性",
      tags: ["经验", "刺激"],
      intensity: 10
    },
    {
      content: "如果可以和在座的任何一个人发生一夜情，你会选择谁？为什么？",
      category: "性",
      tags: ["选择", "欲望"],
      intensity: 9
    },
    {
      content: "你最后一次自慰是什么时候？当时在想什么？",
      category: "性",
      tags: ["自慰", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经出轨过吗？详细描述那次经历",
      category: "关系",
      tags: ["出轨", "背叛"],
      intensity: 10
    },
    {
      content: "你有没有过一夜情？最刺激的一次是什么样的？",
      category: "性",
      tags: ["一夜情", "经验"],
      intensity: 9
    },
    {
      content: "你最喜欢的性爱姿势是什么？为什么喜欢？",
      category: "性",
      tags: ["姿势", "偏好"],
      intensity: 8
    },
    {
      content: "你有什么特殊的性癖好是伴侣不知道的？",
      category: "性",
      tags: ["癖好", "秘密"],
      intensity: 9
    },
    {
      content: "你曾经在什么最奇怪或公开的地方做爱？",
      category: "性",
      tags: ["场所", "冒险"],
      intensity: 8
    },
    {
      content: "你有没有过同性经验或幻想？详细描述",
      category: "性",
      tags: ["同性", "幻想"],
      intensity: 9
    },
    {
      content: "你看过最让你兴奋的色情内容是什么类型的？",
      category: "性",
      tags: ["色情", "兴趣"],
      intensity: 8
    },
    {
      content: "你曾经因为什么事情被性唤起，但羞于告诉别人？",
      category: "性",
      tags: ["唤起", "羞耻"],
      intensity: 8
    },
    {
      content: "你曾经偷看过别人做爱或自慰吗？什么情况？",
      category: "性",
      tags: ["偷窥", "经验"],
      intensity: 9
    },
    {
      content: "你曾经假装高潮过吗？为什么？",
      category: "性",
      tags: ["高潮", "伪装"],
      intensity: 8
    },
    {
      content: "你有没有性幻想过你最好朋友的伴侣？详细说说",
      category: "性",
      tags: ["幻想", "禁忌"],
      intensity: 9
    },
    {
      content: "你曾经在性方面欺骗过伴侣什么事情？",
      category: "关系",
      tags: ["欺骗", "性"],
      intensity: 9
    },
    {
      content: "你曾经尝试过哪些角色扮演？哪个是你最喜欢的？",
      category: "性",
      tags: ["角色扮演", "幻想"],
      intensity: 8
    },
    {
      content: "你最近的性梦是关于谁的？详细描述",
      category: "性",
      tags: ["梦境", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经在工作或学习场所有过性行为吗？描述一下",
      category: "性",
      tags: ["场所", "冒险"],
      intensity: 9
    },
    {
      content: "你曾经对伴侣有过什么变态的要求？",
      category: "性",
      tags: ["要求", "癖好"],
      intensity: 9
    },
    {
      content: "你曾经为了性而做过什么疯狂的事情？",
      category: "性",
      tags: ["冒险", "疯狂"],
      intensity: 9
    },
    {
      content: "你有没有过多人性行为的经历或幻想？详细说说",
      category: "性",
      tags: ["多人", "幻想"],
      intensity: 10
    },
    {
      content: "你最想和哪位名人发生性关系？为什么是他/她？",
      category: "性",
      tags: ["名人", "幻想"],
      intensity: 7
    },
    {
      content: "你曾经在性方面让自己或伴侣失望的经历是什么？",
      category: "性",
      tags: ["失望", "经验"],
      intensity: 8
    },
    {
      content: "你曾经在约会应用上做过最出格的事情是什么？",
      category: "关系",
      tags: ["约会", "社交媒体"],
      intensity: 8
    },
    {
      content: "你曾经因为什么性幻想而感到内疚？",
      category: "性",
      tags: ["幻想", "内疚"],
      intensity: 8
    },
    {
      content: "你有没有过与陌生人发生性关系的经历？详细描述",
      category: "性",
      tags: ["陌生人", "冒险"],
      intensity: 9
    },
    {
      content: "你最后悔的性经历是什么？为什么会后悔？",
      category: "性",
      tags: ["后悔", "经验"],
      intensity: 9
    },
    {
      content: "你曾经在性方面做过什么让你感到羞耻的事情？",
      category: "性",
      tags: ["羞耻", "经验"],
      intensity: 9
    },
    {
      content: "你曾经在性爱中喊错名字吗？详细说说那次经历",
      category: "性",
      tags: ["尴尬", "失误"],
      intensity: 8
    },
    {
      content: "你曾经在什么不合适的场合被性唤起？",
      category: "性",
      tags: ["唤起", "尴尬"],
      intensity: 7
    },
    {
      content: "你曾经对伴侣隐瞒过什么重要的性史？",
      category: "关系",
      tags: ["隐瞒", "性史"],
      intensity: 8
    },
    {
      content: "你曾经为了性而花过最多的钱是什么时候？花在什么上？",
      category: "性",
      tags: ["消费", "欲望"],
      intensity: 8
    },
    {
      content: "你曾经在性方面做过什么让伴侣震惊的事情？",
      category: "性",
      tags: ["震惊", "行为"],
      intensity: 9
    },
    {
      content: "你曾经在醉酒状态下做过什么性方面的事情后来后悔了？",
      category: "性",
      tags: ["醉酒", "后悔"],
      intensity: 9
    },
    {
      content: "你最疯狂的性癖好是什么？为什么会有这种癖好？",
      category: "性",
      tags: ["癖好", "心理"],
      intensity: 9
    },
    {
      content: "你曾经在性方面被拒绝过最尴尬的一次是什么情况？",
      category: "性",
      tags: ["拒绝", "尴尬"],
      intensity: 8
    },
    {
      content: "你曾经对谁有过不伦之恋？发展到了什么程度？",
      category: "关系",
      tags: ["不伦", "禁忌"],
      intensity: 10
    },
    {
      content: "你曾经在性方面做过什么让你感到非常内疚的事情？",
      category: "性",
      tags: ["内疚", "道德"],
      intensity: 9
    },
    {
      content: "如果可以和在座任何人的伴侣发生关系而不会被发现，你会选谁的？",
      category: "关系",
      tags: ["禁忌", "幻想"],
      intensity: 10
    },
    {
      content: "你曾经因为性而伤害过谁？详细说说那次经历",
      category: "关系",
      tags: ["伤害", "后果"],
      intensity: 9
    },
    {
      content: "你曾经在性方面说过的最大谎言是什么？",
      category: "性",
      tags: ["谎言", "欺骗"],
      intensity: 8
    },
    {
      content: "你曾经在性方面做过什么让你感到非常自豪的事情？",
      category: "性",
      tags: ["自豪", "成就"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么奇怪的意外？详细描述",
      category: "性",
      tags: ["意外", "尴尬"],
      intensity: 8
    },
    {
      content: "你曾经为了性而牺牲过什么重要的东西？后悔吗？",
      category: "性",
      tags: ["牺牲", "后悔"],
      intensity: 9
    },
    {
      content: "你曾经在性方面做过什么最冒险的事情？",
      category: "性",
      tags: ["冒险", "刺激"],
      intensity: 9
    },
    {
      content: "你曾经在什么最不寻常的地点或情况下达到高潮？",
      category: "性",
      tags: ["高潮", "场所"],
      intensity: 8
    },
    {
      content: "你最不为人知的性幻想是什么？为什么不敢实现它？",
      category: "性",
      tags: ["幻想", "秘密"],
      intensity: 10
    }
  ];
  const mediumHighIntensityQuestions: Question[] = [
    {
      content: "你曾经对某人有过性幻想但从未告诉过他/她吗？是谁？",
      category: "性",
      tags: ["幻想", "暗恋"],
      intensity: 7
    },
    {
      content: "你在性方面最大的遗憾是什么？",
      category: "性",
      tags: ["遗憾", "反思"],
      intensity: 7
    },
    {
      content: "你曾经在什么公共场所差点被发现做爱？",
      category: "性",
      tags: ["公共场所", "冒险"],
      intensity: 8
    },
    {
      content: "你曾经对伴侣撒过什么谎来逃避性行为？",
      category: "关系",
      tags: ["谎言", "逃避"],
      intensity: 6
    },
    {
      content: "你最喜欢伴侣对你做的性行为是什么？详细描述",
      category: "性",
      tags: ["偏好", "快感"],
      intensity: 7
    },
    {
      content: "你曾经因为什么性幻想而自慰？最近一次是什么时候？",
      category: "性",
      tags: ["自慰", "幻想"],
      intensity: 7
    },
    {
      content: "你曾经在约会中有过什么尴尬的性经历？",
      category: "性",
      tags: ["约会", "尴尬"],
      intensity: 6
    },
    {
      content: "如果可以和在座的人中交换伴侣一晚，你会选择谁？",
      category: "关系",
      tags: ["交换", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经对性伴侣说过什么谎言来取悦对方？",
      category: "性",
      tags: ["谎言", "取悦"],
      intensity: 6
    },
    {
      content: "你最近一次看色情内容是什么时候？内容是什么？",
      category: "性",
      tags: ["色情", "消费"],
      intensity: 6
    },
    {
      content: "你曾经尝试过什么性玩具？哪个是你的最爱？",
      category: "性",
      tags: ["玩具", "体验"],
      intensity: 7
    },
    {
      content: "你曾经在什么奇怪的地方留下过\"痕迹\"？",
      category: "性",
      tags: ["场所", "痕迹"],
      intensity: 7
    },
    {
      content: "你曾经在性方面做过什么让自己感到惊讶的事情？",
      category: "性",
      tags: ["惊讶", "发现"],
      intensity: 7
    },
    {
      content: "你最想尝试但还没尝试过的性行为是什么？",
      category: "性",
      tags: ["愿望", "好奇"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因拒绝了伴侣的性要求？",
      category: "关系",
      tags: ["拒绝", "理由"],
      intensity: 6
    },
    {
      content: "你曾经在性方面让伴侣失望的事情是什么？",
      category: "性",
      tags: ["失望", "遗憾"],
      intensity: 6
    },
    {
      content: "你曾经在什么不合适的场合想到性而分心？",
      category: "性",
      tags: ["分心", "场合"],
      intensity: 6
    },
    {
      content: "你曾经对什么类型的人产生过性吸引但不愿公开承认？",
      category: "性",
      tags: ["吸引", "秘密"],
      intensity: 7
    },
    {
      content: "你曾经在性方面做过什么让伴侣特别开心的事情？",
      category: "性",
      tags: ["取悦", "技巧"],
      intensity: 6
    },
    {
      content: "你曾经在性方面有过什么尴尬的\"第一次\"经历？",
      category: "性",
      tags: ["第一次", "尴尬"],
      intensity: 7
    },
    {
      content: "你最疯狂的约会经历是什么？结果如何？",
      category: "关系",
      tags: ["约会", "疯狂"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己后悔的决定？",
      category: "性",
      tags: ["决定", "后悔"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因假装对性感兴趣？",
      category: "性",
      tags: ["伪装", "动机"],
      intensity: 6
    },
    {
      content: "你曾经在多长时间内和多少不同的人发生过关系？",
      category: "性",
      tags: ["数量", "时间"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下被他人的某个特质意外地性唤起？",
      category: "性",
      tags: ["唤起", "特质"],
      intensity: 6
    },
    {
      content: "你曾经为了性而做过什么让自己感到羞耻的事情？",
      category: "性",
      tags: ["羞耻", "行为"],
      intensity: 7
    },
    {
      content: "你最享受的前戏是什么？为什么特别喜欢？",
      category: "性",
      tags: ["前戏", "偏好"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下对不应该有感觉的人产生过性冲动？",
      category: "性",
      tags: ["冲动", "禁忌"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么让你感到尴尬的身体反应？",
      category: "性",
      tags: ["身体", "尴尬"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让伴侣惊讶的事情？反应如何？",
      category: "性",
      tags: ["惊喜", "反应"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因在性行为中途停止？",
      category: "性",
      tags: ["中断", "原因"],
      intensity: 6
    },
    {
      content: "你曾经对伴侣隐瞒过什么性方面的秘密？",
      category: "关系",
      tags: ["秘密", "隐瞒"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么特别难忘的经历？为什么难忘？",
      category: "性",
      tags: ["难忘", "经历"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下感到最性感或最有魅力？",
      category: "性",
      tags: ["自信", "魅力"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么冒险但值得的事情？",
      category: "性",
      tags: ["冒险", "价值"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因拒绝了一个你有好感的人？",
      category: "关系",
      tags: ["拒绝", "原因"],
      intensity: 6
    },
    {
      content: "你曾经在性方面有过什么特别疯狂的幻想？",
      category: "性",
      tags: ["幻想", "疯狂"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下对性感到恐惧或焦虑？",
      category: "性",
      tags: ["恐惧", "焦虑"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己感到特别满足的事情？",
      category: "性",
      tags: ["满足", "成就"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感觉自己被性方面的欲望控制？",
      category: "性",
      tags: ["欲望", "控制"],
      intensity: 7
    },
    {
      content: "你曾经对伴侣有过什么性方面的不满但没有直接表达？",
      category: "关系",
      tags: ["不满", "沟通"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让伴侣感到不舒服的事情？",
      category: "性",
      tags: ["不适", "边界"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下对性感到特别渴望？",
      category: "性",
      tags: ["渴望", "情境"],
      intensity: 6
    },
    {
      content: "你曾经在性方面有过什么误解导致的尴尬经历？",
      category: "性",
      tags: ["误解", "尴尬"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感到自己在性方面表现出色？",
      category: "性",
      tags: ["表现", "自信"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己感到特别兴奋的事情？",
      category: "性",
      tags: ["兴奋", "体验"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下感觉自己被性方面的欲望拒绝？",
      category: "性",
      tags: ["拒绝", "挫折"],
      intensity: 6
    },
    {
      content: "你曾经对什么类型的性行为感到好奇但害怕尝试？",
      category: "性",
      tags: ["好奇", "恐惧"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么让你感到惊喜的发现？",
      category: "性",
      tags: ["发现", "惊喜"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感觉自己在性方面特别有创意？",
      category: "性",
      tags: ["创意", "表现"],
      intensity: 6
    },
    {
      content: "你曾经为了取悦伴侣而做过什么自己不太喜欢的性行为？",
      category: "性",
      tags: ["取悦", "牺牲"],
      intensity: 7
    }
  ];
  // 较为轻松适合破冰
  const lowIntensityQuestions: Question[] = [
    {
      content: "你第一次约会的经历是什么样的？",
      category: "关系",
      tags: ["约会", "回忆"],
      intensity: 3
    },
    {
      content: "你做过的最尴尬的事情是什么？",
      category: "个人",
      tags: ["尴尬", "经历"],
      intensity: 4
    },
    {
      content: "你有什么特殊的才能是大多数人不知道的？",
      category: "个人",
      tags: ["才能", "秘密"],
      intensity: 2
    },
    {
      content: "你最后一次对某人撒谎是什么时候？为什么要撒谎？",
      category: "行为",
      tags: ["诚实", "谎言"],
      intensity: 5
    },
    {
      content: "你曾经暗恋过谁？他/她知道吗？",
      category: "关系",
      tags: ["暗恋", "感情"],
      intensity: 4
    },
    {
      content: "你最喜欢自己身体的哪个部位？为什么？",
      category: "个人",
      tags: ["身体", "自信"],
      intensity: 3
    },
    {
      content: "你最近一次哭是因为什么？",
      category: "情感",
      tags: ["脆弱", "情绪"],
      intensity: 4
    },
    {
      content: "你做过的最疯狂的事情是什么？",
      category: "冒险",
      tags: ["冒险", "刺激"],
      intensity: 5
    },
    {
      content: "如果可以和一位名人共进晚餐，你会选谁？为什么？",
      category: "幻想",
      tags: ["名人", "兴趣"],
      intensity: 2
    },
    {
      content: "你曾经因为什么事情感到特别骄傲？",
      category: "成就",
      tags: ["骄傲", "成就"],
      intensity: 2
    },
    {
      content: "你有什么奇怪的习惯是别人不知道的？",
      category: "个人",
      tags: ["习惯", "怪癖"],
      intensity: 3
    },
    {
      content: "你最后一次做的冲动决定是什么？结果如何？",
      category: "决策",
      tags: ["冲动", "后果"],
      intensity: 3
    },
    {
      content: "你曾经熬夜做过最疯狂的事情是什么？",
      category: "经历",
      tags: ["熬夜", "疯狂"],
      intensity: 4
    },
    {
      content: "你收到过最糟糕的礼物是什么？当时你是怎么反应的？",
      category: "社交",
      tags: ["礼物", "反应"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事后来让你感到特别后悔？",
      category: "反思",
      tags: ["后悔", "教训"],
      intensity: 4
    },
    {
      content: "你最喜欢的约会活动是什么？",
      category: "关系",
      tags: ["约会", "活动"],
      intensity: 2
    },
    {
      content: "你曾经在公共场合做过什么令人尴尬的事情？",
      category: "社交",
      tags: ["尴尬", "公共"],
      intensity: 4
    },
    {
      content: "你有什么奇怪的食物组合是你特别喜欢的？",
      category: "喜好",
      tags: ["食物", "怪癖"],
      intensity: 1
    },
    {
      content: "你最大的恐惧是什么？为什么会害怕？",
      category: "心理",
      tags: ["恐惧", "脆弱"],
      intensity: 4
    },
    {
      content: "你曾经因为什么事情被误解最深？",
      category: "沟通",
      tags: ["误解", "沟通"],
      intensity: 3
    },
    {
      content: "你最近一次感到特别开心是因为什么事？",
      category: "情感",
      tags: ["快乐", "情绪"],
      intensity: 2
    },
    {
      content: "你曾经在社交媒体上做过什么让你后悔的事情？",
      category: "社交",
      tags: ["社交媒体", "后悔"],
      intensity: 4
    },
    {
      content: "你最喜欢的电影是什么？为什么特别喜欢它？",
      category: "喜好",
      tags: ["电影", "兴趣"],
      intensity: 1
    },
    {
      content: "你曾经因为什么事情感到非常尴尬但后来发现其实没人注意到？",
      category: "社交",
      tags: ["尴尬", "自我意识"],
      intensity: 3
    },
    {
      content: "如果你可以改变过去的一件事，会是什么？",
      category: "反思",
      tags: ["后悔", "改变"],
      intensity: 4
    },
    {
      content: "你最近一次说谎是什么时候？说了什么谎？",
      category: "行为",
      tags: ["谎言", "诚实"],
      intensity: 4
    },
    {
      content: "你有什么特别的童年记忆让你至今难忘？",
      category: "回忆",
      tags: ["童年", "记忆"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情让你的朋友感到惊讶？",
      category: "社交",
      tags: ["惊喜", "朋友"],
      intensity: 3
    },
    {
      content: "你最近一次感到非常尴尬是什么时候？发生了什么？",
      category: "社交",
      tags: ["尴尬", "经历"],
      intensity: 4
    },
    {
      content: "你曾经有过什么特别浪漫的经历？",
      category: "关系",
      tags: ["浪漫", "经历"],
      intensity: 3
    },
    {
      content: "你最喜欢的放松方式是什么？",
      category: "个人",
      tags: ["放松", "习惯"],
      intensity: 1
    },
    {
      content: "你曾经因为什么事情感到特别嫉妒？",
      category: "情感",
      tags: ["嫉妒", "情绪"],
      intensity: 4
    },
    {
      content: "你做过的最勇敢的事情是什么？",
      category: "个人",
      tags: ["勇气", "挑战"],
      intensity: 3
    },
    {
      content: "如果你可以立刻掌握一项新技能，会选择什么？",
      category: "愿望",
      tags: ["技能", "梦想"],
      intensity: 2
    },
    {
      content: "你生活中最大的遗憾是什么？",
      category: "反思",
      tags: ["遗憾", "后悔"],
      intensity: 5
    },
    {
      content: "你曾经做过什么事情后来发现完全是场误会？",
      category: "经历",
      tags: ["误会", "尴尬"],
      intensity: 3
    },
    {
      content: "你有什么秘密技能是大多数人不知道的？",
      category: "个人",
      tags: ["技能", "秘密"],
      intensity: 2
    },
    {
      content: "你最喜欢自己的什么性格特点？",
      category: "个人",
      tags: ["性格", "自我认知"],
      intensity: 2
    },
    {
      content: "你曾经在什么场合笑得最不受控制？",
      category: "经历",
      tags: ["笑", "尴尬"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情让你的家人感到惊讶？",
      category: "家庭",
      tags: ["惊喜", "家人"],
      intensity: 3
    },
    {
      content: "你最近一次感到特别感动是因为什么？",
      category: "情感",
      tags: ["感动", "情绪"],
      intensity: 3
    },
    {
      content: "你曾经有过什么特别难忘的旅行经历？",
      category: "经历",
      tags: ["旅行", "回忆"],
      intensity: 2
    },
    {
      content: "你最近一次做了什么让自己感到自豪的事情？",
      category: "成就",
      tags: ["自豪", "成就"],
      intensity: 2
    },
    {
      content: "你曾经因为什么事情感到特别尴尬但后来变成了笑话？",
      category: "经历",
      tags: ["尴尬", "幽默"],
      intensity: 3
    },
    {
      content: "你最喜欢的儿时游戏是什么？",
      category: "回忆",
      tags: ["童年", "游戏"],
      intensity: 1
    },
    {
      content: "你曾经有过什么误会导致的有趣经历？",
      category: "经历",
      tags: ["误会", "幽默"],
      intensity: 2
    },
    {
      content: "你最想去但还没去过的地方是哪里？为什么想去？",
      category: "愿望",
      tags: ["旅行", "梦想"],
      intensity: 1
    },
    {
      content: "你曾经收到过什么让你特别感动的礼物？",
      category: "经历",
      tags: ["礼物", "感动"],
      intensity: 2
    },
    {
      content: "你有什么小时候特别喜欢但现在觉得很尴尬的爱好？",
      category: "回忆",
      tags: ["爱好", "成长"],
      intensity: 2
    },
    {
      content: "如果你可以和过去的自己说一句话，会说什么？",
      category: "反思",
      tags: ["自我", "建议"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情完全超出了自己的舒适区？",
      category: "成长",
      tags: ["挑战", "舒适区"],
      intensity: 3
    },
    {
      content: "你最后一次因为什么事情感到特别惊喜？",
      category: "经历",
      tags: ["惊喜", "情绪"],
      intensity: 2
    }
  ];

  const questions: Question[] = [
    ...lowIntensityQuestions,
    ...mediumHighIntensityQuestions,
    ...highIntensityQuestions
  ];

  let counter = 0;

	// 筛选条件
	let selectedCategory = "all";
	let selectedTag = "all";
	let intensityLevel = [5]; // 修改为数组类型
	
	// 当前显示的题目
	let currentQuestion: typeof questions[0] | null = null;
	let isAnimating = false;

	// 根据筛选条件过滤题目
	$: filteredQuestions = questions.filter(q => {
		const categoryMatch = selectedCategory === "all" || q.category === selectedCategory;
		const tagMatch = selectedTag === "all" || q.tags?.includes(selectedTag);
		const intensityMatch = q.intensity <= intensityLevel[0]; // 使用数组的第一个值
		return categoryMatch && tagMatch && intensityMatch;
	});

	// 获取所有可用的分类和标签
	$: categories = [...new Set(questions.map(q => q.category))];
	$: tags = [...new Set(questions.flatMap(q => q.tags || []))];

	// 抽取新题目
	async function drawNewQuestion() {
		if (isAnimating || filteredQuestions.length === 0) return;

    counter++;
		
		isAnimating = true;
		currentQuestion = null;
		
		// 添加一点延迟以展示动画效果
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
			<div class="grid gap-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<label for="category-select" class="text-sm font-medium">分类</label>
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="选择分类" />
							</Select.Trigger>
							<Select.Content class='max-h-96 overflow-y-auto'>
								<Select.Group>
									<Select.Item value="all">全部分类</Select.Item>
									{#each categories as category}
										<Select.Item value={category}>{category}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
              <Select.Input bind:value={selectedCategory} />
						</Select.Root>
					</div>

					<div class="space-y-2">
						<label for="tag-select" class="text-sm font-medium">标签</label>
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="选择标签" />
							</Select.Trigger>
							<Select.Content class='max-h-96 overflow-y-auto'>
								<Select.Group>
									<Select.Item value="all">全部标签</Select.Item>
									{#each tags as tag}
										<Select.Item value={tag}>{tag}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
              <Select.Input bind:value={selectedTag} />
						</Select.Root>
					</div>
				</div>

				<div class="space-y-2">
					<label for="intensity-slider" class="text-sm font-medium">刺激程度 {intensityLevel} / 10</label>
					<Slider
						id="intensity-slider"
						bind:value={intensityLevel}
						min={1}
						max={10}
						step={1}
					/>
				</div>
			</div>
		</Card>

		<Card class="p-6">
			<div class="text-center">
				<div class="min-h-[200px] flex items-center justify-center mb-6">
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
