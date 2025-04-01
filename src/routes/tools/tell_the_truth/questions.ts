export interface Question {
  content: string;
  category?: string;
  tags?: string[];
  intensity: number;
}

// 性方面高刺激度题库
export const SexHighIntensityQuestions: Question[] = [
  {
    content: "你曾经对伴侣撒过的最大的谎是什么？",
    category: "关系",
    tags: ["谎言", "关系"],
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
    tags: ["幻想", "场所"],
    intensity: 9
  },
  {
    content: "你曾经做过的最出格的性体验是什么？",
    category: "性",
    tags: ["体验", "刺激"],
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
    tags: ["行为", "幻想"],
    intensity: 8
  },
  {
    content: "你曾经出轨过吗？详细描述那次经历",
    category: "关系",
    tags: ["背叛", "秘密"],
    intensity: 10
  },
  {
    content: "你有没有过一夜情？最刺激的一次是什么样的？",
    category: "性",
    tags: ["体验", "刺激"],
    intensity: 9
  },
  {
    content: "你最喜欢的性爱姿势是什么？为什么喜欢？",
    category: "性",
    tags: ["行为", "偏好"],
    intensity: 8
  },
  {
    content: "你有什么特殊的性癖好是伴侣不知道的？",
    category: "性",
    tags: ["秘密", "心理"],
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
    tags: ["幻想", "体验"],
    intensity: 9
  },
  {
    content: "你看过最让你兴奋的色情内容是什么类型的？",
    category: "性",
    tags: ["刺激", "心理"],
    intensity: 8
  },
  {
    content: "你曾经因为什么事情被性唤起，但羞于告诉别人？",
    category: "性",
    tags: ["欲望", "秘密"],
    intensity: 8
  },
  {
    content: "你曾经偷看过别人做爱或自慰吗？什么情况？",
    category: "性",
    tags: ["行为", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经假装高潮过吗？为什么？",
    category: "性",
    tags: ["谎言", "行为"],
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
    tags: ["谎言", "关系"],
    intensity: 9
  },
  {
    content: "你曾经尝试过哪些角色扮演？哪个是你最喜欢的？",
    category: "性",
    tags: ["幻想", "体验"],
    intensity: 8
  },
  {
    content: "你最近的性梦是关于谁的？详细描述",
    category: "性",
    tags: ["幻想", "心理"],
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
    tags: ["行为", "心理"],
    intensity: 9
  },
  {
    content: "你曾经为了性而做过什么疯狂的事情？",
    category: "性",
    tags: ["冒险", "刺激"],
    intensity: 9
  },
  {
    content: "你有没有过多人性行为的经历或幻想？详细说说",
    category: "性",
    tags: ["幻想", "体验"],
    intensity: 10
  },
  {
    content: "你最想和哪位名人发生性关系？为什么是他/她？",
    category: "性",
    tags: ["幻想", "选择"],
    intensity: 7
  },
  {
    content: "你曾经在性方面让自己或伴侣失望的经历是什么？",
    category: "性",
    tags: ["体验", "关系"],
    intensity: 8
  },
  {
    content: "你曾经在约会应用上做过最出格的事情是什么？",
    category: "关系",
    tags: ["冒险", "场所"],
    intensity: 8
  },
  {
    content: "你曾经因为什么性幻想而感到内疚？",
    category: "性",
    tags: ["幻想", "情感"],
    intensity: 8
  },
  {
    content: "你有没有过与陌生人发生性关系的经历？详细描述",
    category: "性",
    tags: ["体验", "冒险"],
    intensity: 9
  },
  {
    content: "你最后悔的性经历是什么？为什么会后悔？",
    category: "性",
    tags: ["体验", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到羞耻的事情？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性爱中喊错名字吗？详细说说那次经历",
    category: "性",
    tags: ["行为", "尴尬"],
    intensity: 8
  },
  {
    content: "你曾经在什么不合适的场合被性唤起？",
    category: "性",
    tags: ["欲望", "场所"],
    intensity: 7
  },
  {
    content: "你曾经对伴侣隐瞒过什么重要的性史？",
    category: "关系",
    tags: ["秘密", "关系"],
    intensity: 8
  },
  {
    content: "你曾经为了性而花过最多的钱是什么时候？花在什么上？",
    category: "性",
    tags: ["行为", "选择"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让伴侣震惊的事情？",
    category: "性",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在醉酒状态下做过什么性方面的事情后来后悔了？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你最疯狂的性癖好是什么？为什么会有这种癖好？",
    category: "性",
    tags: ["心理", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经在性方面被拒绝过最尴尬的一次是什么情况？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你曾经对谁有过不伦之恋？发展到了什么程度？",
    category: "关系",
    tags: ["禁忌", "关系"],
    intensity: 10
  },
  {
    content: "你曾经在性方面做过什么让你感到非常内疚的事情？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "如果可以和在座任何人的伴侣发生关系而不会被发现，你会选谁的？",
    category: "关系",
    tags: ["禁忌", "选择"],
    intensity: 10
  },
  {
    content: "你曾经因为性而伤害过谁？详细说说那次经历",
    category: "关系",
    tags: ["伤害", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在性方面说过的最大谎言是什么？",
    category: "性",
    tags: ["谎言", "秘密"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让你感到非常自豪的事情？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 7
  },
  {
    content: "你曾经在性方面有过什么奇怪的意外？详细描述",
    category: "性",
    tags: ["行为", "意外"],
    intensity: 8
  },
  {
    content: "你曾经为了性而牺牲过什么重要的东西？后悔吗？",
    category: "性",
    tags: ["选择", "情感"],
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
    tags: ["场所", "体验"],
    intensity: 8
  },
  {
    content: "你最不为人知的性幻想是什么？为什么不敢实现它？",
    category: "性",
    tags: ["幻想", "秘密"],
    intensity: 10
  },
  {
    content: "你曾经在性方面最大的遗憾是什么？如果可以重来你会怎么做？",
    category: "性",
    tags: ["情感", "选择"],
    intensity: 9
  },
  {
    content: "你曾经在什么场合下故意展示自己的身体以引起他人注意？",
    category: "性",
    tags: ["行为", "场所"],
    intensity: 8
  },
  {
    content: "你曾经对伴侣有过哪些性方面的不满但从未说出口？",
    category: "关系",
    tags: ["秘密", "关系"],
    intensity: 8
  },
  {
    content: "你曾经在性爱中叫错名字吗？详细描述当时的情况和后果",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经为了性而做过的最卑微的事情是什么？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在网上发布过自己的裸照或性感照片吗？给谁看的？",
    category: "性",
    tags: ["行为", "场所"],
    intensity: 9
  },
  {
    content: "你曾经对伴侣提出过什么极端的性要求被拒绝了？",
    category: "性",
    tags: ["行为", "关系"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让自己感到非常羞耻的事？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面被别人占便宜或利用过吗？详细说说",
    category: "性",
    tags: ["创伤", "关系"],
    intensity: 10
  },
  {
    content: "你曾经因为好奇而尝试过什么极端的性行为？感受如何？",
    category: "性",
    tags: ["体验", "冒险"],
    intensity: 10
  },
  {
    content: "你曾经在性方面做过什么让你的朋友震惊的事情？",
    category: "性",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在什么情况下违背自己的意愿发生性关系？",
    category: "性",
    tags: ["创伤", "体验"],
    intensity: 10
  },
  {
    content: "你曾经对性伴侣撒过什么谎来增加自己的性魅力？",
    category: "性",
    tags: ["谎言", "行为"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让自己感到非常后悔的事情？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性爱中尝试过什么特别疯狂的玩具或道具？效果如何？",
    category: "性",
    tags: ["体验", "冒险"],
    intensity: 8
  },
  {
    content: "你曾经因为什么性幻想而感到自我厌恶？",
    category: "性",
    tags: ["幻想", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面被谁深深伤害过？具体发生了什么？",
    category: "关系",
    tags: ["创伤", "关系"],
    intensity: 10
  },
  {
    content: "如果可以和在座的两个人发生三人行，你会选择谁？为什么？",
    category: "性",
    tags: ["幻想", "选择"],
    intensity: 10
  },
  {
    content: "你曾经在性方面有过什么让你感到非常尴尬的失败经历？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在什么情况下对不应该有性吸引的人产生了性冲动？",
    category: "性",
    tags: ["欲望", "禁忌"],
    intensity: 9
  },
  {
    content: "你最疯狂的性体验是在什么情况下发生的？详细描述",
    category: "性",
    tags: ["体验", "刺激"],
    intensity: 10
  },
  {
    content: "你曾经在性方面做过什么让你感到非常愧疚的事情？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别危险的经历？",
    category: "性",
    tags: ["冒险", "体验"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让伴侣感到非常不舒服的事情？",
    category: "关系",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别奇怪的癖好？是怎么发现的？",
    category: "性",
    tags: ["心理", "体验"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到非常兴奋但又害怕的事情？",
    category: "性",
    tags: ["刺激", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面被谁彻底征服？他/她做了什么？",
    category: "性",
    tags: ["体验", "关系"],
    intensity: 8
  },
  {
    content: "你曾经对什么样的性爱场景有强烈幻想但从未实现？",
    category: "性",
    tags: ["幻想", "选择"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让你感到非常惊讶的事情？",
    category: "性",
    tags: ["体验", "心理"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么特别难忘的第一次经历？",
    category: "性",
    tags: ["体验", "心理"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么让你感到非常困惑的经历？",
    category: "性",
    tags: ["体验", "心理"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让你感到特别刺激的事情？",
    category: "性",
    tags: ["刺激", "体验"],
    intensity: 9
  },
  {
    content: "如果要在在座的人中选一个人进行捆绑游戏，你会选谁？为什么？",
    category: "性",
    tags: ["幻想", "选择"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别疯狂的幻想但不敢告诉伴侣？",
    category: "性",
    tags: ["幻想", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经在什么公共场合几乎要发生性行为？详细描述当时的情况",
    category: "性",
    tags: ["场所", "冒险"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到非常满足的事情？",
    category: "性",
    tags: ["体验", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么特别痛苦的经历？",
    category: "性",
    tags: ["创伤", "体验"],
    intensity: 10
  },
  {
    content: "你曾经在性方面做过什么让你感到非常紧张的事情？",
    category: "性",
    tags: ["体验", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么特别疯狂的即兴行为？",
    category: "性",
    tags: ["冒险", "行为"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到非常大胆的事情？",
    category: "性",
    tags: ["冒险", "行为"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别意外的惊喜经历？",
    category: "性",
    tags: ["体验", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让你感到非常有创意的事情？",
    category: "性",
    tags: ["行为", "体验"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么特别激烈的争吵？为什么？",
    category: "关系",
    tags: ["关系", "情感"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到非常冒险的事情？",
    category: "性",
    tags: ["冒险", "刺激"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别尴尬的笑话或误会？",
    category: "性",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在性方面做过什么让你感到非常放纵的事情？",
    category: "性",
    tags: ["行为", "刺激"],
    intensity: 9
  },
  {
    content: "你曾经在性方面有过什么特别令人心跳加速的经历？",
    category: "性",
    tags: ["刺激", "体验"],
    intensity: 9
  },
  {
    content: "你曾经在性方面做过什么让你感到非常解放的事情？",
    category: "性",
    tags: ["体验", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在性方面有过什么特别让你感到羞耻但又兴奋的经历？",
    category: "性",
    tags: ["情感", "刺激"],
    intensity: 9
  }
];

// 人性深层特质的高刺激度题库
export const HumanHighIntensityQuestions: Question[] = [
  {
    content: "你人生中做过的最不道德的事情是什么？",
    category: "道德",
    tags: ["道德", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经背叛过最信任你的人吗？详细说说那次经历",
    category: "关系",
    tags: ["背叛", "关系"],
    intensity: 9
  },
  {
    content: "如果可以毁掉在座一个人的生活而不会被发现，你会选谁？为什么？",
    category: "人际",
    tags: ["选择", "秘密"],
    intensity: 10
  },
  {
    content: "你曾经偷过最贵重的东西是什么？当时什么情况？",
    category: "道德",
    tags: ["行为", "秘密"],
    intensity: 8
  },
  {
    content: "你最深的自卑是什么？为什么从不告诉别人？",
    category: "心理",
    tags: ["心理", "秘密"],
    intensity: 8
  },
  {
    content: "你曾经做过什么事情，如果公开可能会毁掉你的职业生涯？",
    category: "职业",
    tags: ["秘密", "选择"],
    intensity: 9
  },
  {
    content: "你曾经因嫉妒而做过最卑劣的事情是什么？",
    category: "心理",
    tags: ["情感", "行为"],
    intensity: 8
  },
  {
    content: "你最后悔的人生决定是什么？它如何改变了你的人生轨迹？",
    category: "生活",
    tags: ["选择", "情感"],
    intensity: 8
  },
  {
    content: "在座的人中，你最讨厌谁？为什么？直接指出来",
    category: "社交",
    tags: ["情感", "关系"],
    intensity: 10
  },
  {
    content: "你曾经对家人撒过的最大谎言是什么？",
    category: "关系",
    tags: ["谎言", "关系"],
    intensity: 8
  },
  {
    content: "你曾经为了个人利益而出卖过朋友吗？详细说说",
    category: "关系",
    tags: ["背叛", "选择"],
    intensity: 9
  },
  {
    content: "你内心最黑暗的想法是什么？那些你不敢告诉任何人的想法",
    category: "心理",
    tags: ["心理", "秘密"],
    intensity: 10
  },
  {
    content: "你曾经做过什么事情，如果家人知道会让他们彻底失望？",
    category: "关系",
    tags: ["秘密", "关系"],
    intensity: 9
  },
  {
    content: "你人生中最自私的决定是什么？它如何影响了他人？",
    category: "道德",
    tags: ["选择", "关系"],
    intensity: 8
  },
  {
    content: "如果可以毁掉一个前任的生活而不被发现，你会怎么做？",
    category: "关系",
    tags: ["选择", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在什么重要场合故意陷害过别人？结果如何？",
    category: "人际",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "你曾经因为嫉妒而散布过关于别人的谣言吗？详细说说",
    category: "人际",
    tags: ["情感", "行为"],
    intensity: 8
  },
  {
    content: "你对自己外表最不满意的部分是什么？为什么这么在意？",
    category: "个人",
    tags: ["心理", "情感"],
    intensity: 7
  },
  {
    content: "你曾经利用过别人的感情来达到自己的目的吗？详细说说",
    category: "关系",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "你曾经在什么情况下完全失控？后果是什么？",
    category: "心理",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你最大的人格缺陷是什么？它如何影响了你的人际关系？",
    category: "心理",
    tags: ["心理", "关系"],
    intensity: 8
  },
  {
    content: "如果可以不被发现，你会杀死一个人来获得1000万美元吗？为什么？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 10
  },
  {
    content: "你曾经在工作中做过什么严重违规的事情？有人知道吗？",
    category: "职业",
    tags: ["行为", "秘密"],
    intensity: 8
  },
  {
    content: "你曾经背着朋友做过什么会让他们永远不会原谅你的事？",
    category: "友情",
    tags: ["背叛", "关系"],
    intensity: 9
  },
  {
    content: "你最痛恨自己的什么特质？为什么无法改变它？",
    category: "个人",
    tags: ["心理", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在什么情况下彻底背叛了自己的原则？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 8
  },
  {
    content: "如果今晚你必须杀死在座的一个人，你会选择谁？为什么？",
    category: "假设",
    tags: ["选择", "道德"],
    intensity: 10
  },
  {
    content: "你曾经因为嫉妒而破坏过别人的关系或成功吗？",
    category: "人际",
    tags: ["情感", "行为"],
    intensity: 9
  },
  {
    content: "你最害怕别人发现你的什么秘密？",
    category: "心理",
    tags: ["心理", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经在醉酒状态下做过什么让你极度后悔的事情？",
    category: "生活",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你曾经在什么情况下故意伤害过爱你的人？",
    category: "关系",
    tags: ["行为", "关系"],
    intensity: 9
  },
  {
    content: "如果可以不被发现，你会偷走朋友最珍贵的东西吗？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 8
  },
  {
    content: "你人生中最大的谎言是什么？你打算永远保守这个秘密吗？",
    category: "个人",
    tags: ["谎言", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经为了报复而做过什么极端的事情？",
    category: "道德",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你最不愿面对的童年创伤是什么？它如何影响了你的成年生活？",
    category: "心理",
    tags: ["创伤", "心理"],
    intensity: 9
  },
  {
    content: "你曾经在什么情况下完全抛弃了自己的道德底线？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 9
  },
  {
    content: "如果可以毁掉一个名人的生活而不被发现，你会选谁？为什么？",
    category: "假设",
    tags: ["选择", "道德"],
    intensity: 8
  },
  {
    content: "你曾经因为什么原因彻底切断与亲人的联系？",
    category: "关系",
    tags: ["选择", "关系"],
    intensity: 8
  },
  {
    content: "你做过的最让自己感到羞耻的事情是什么？",
    category: "心理",
    tags: ["行为", "情感"],
    intensity: 9
  },
  {
    content: "你曾经因为嫉妒而希望朋友失败吗？详细说说",
    category: "友情",
    tags: ["情感", "关系"],
    intensity: 8
  },
  {
    content: "你最大的金钱丑闻是什么？有人知道吗？",
    category: "个人",
    tags: ["秘密", "行为"],
    intensity: 8
  },
  {
    content: "如果你可以抹去人生中的一段记忆，会是什么？为什么？",
    category: "心理",
    tags: ["选择", "心理"],
    intensity: 8
  },
  {
    content: "你曾经做过什么事情，如果公开会让所有朋友都离开你？",
    category: "友情",
    tags: ["秘密", "关系"],
    intensity: 10
  },
  {
    content: "你内心有什么黑暗的想法是你认为不正常的？",
    category: "心理",
    tags: ["心理", "秘密"],
    intensity: 9
  },
  {
    content: "你曾经在什么情况下彻底失去对自己的控制？结果如何？",
    category: "心理",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "你曾经因为嫉妒或报复而破坏过谁的名誉？",
    category: "人际",
    tags: ["情感", "行为"],
    intensity: 9
  },
  {
    content: "你最不想让父母知道关于你的什么事情？",
    category: "个人",
    tags: ["秘密", "关系"],
    intensity: 8
  },
  {
    content: "你曾经在什么情况下完全背叛了自己的信仰？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 8
  },
  {
    content: "你曾经做过什么事情，如果伴侣知道可能会立刻分手？",
    category: "关系",
    tags: ["秘密", "关系"],
    intensity: 9
  },
  {
    content: "你人生中最卑鄙的行为是什么？当时的情况如何？",
    category: "道德",
    tags: ["行为", "道德"],
    intensity: 10
  },
  {
    content: "你曾经为了钱做过什么让自己感到羞耻的事情？",
    category: "心理",
    tags: ["行为", "情感"],
    intensity: 8
  },
  {
    content: "在什么情况下，你认为自己能够为了生存而杀人？请详细描述你的心理过程",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 10
  },
  {
    content: "在什么情况下，你会为了安全感而完全抛弃同理心？这反映了你什么样的生存机制？",
    category: "心理",
    tags: ["选择", "心理"],
    intensity: 9
  },
  {
    content: "你内心最强烈的占有欲针对什么或谁？这种占有欲如何影响你的行为？",
    category: "心理",
    tags: ["心理", "行为"],
    intensity: 8
  },
  {
    content: "如果可以通过牺牲一个无辜的人来拯救世界，你会这么做吗？你会如何处理随之而来的内疚？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 10
  },
  {
    content: "你最不愿承认的人格特质是什么？为什么你如此抗拒这个特质？",
    category: "心理",
    tags: ["心理", "情感"],
    intensity: 8
  },
  {
    content: "在什么情况下，你会为了安全感而选择欺骗所有人？这反映了你什么样的不安全感？",
    category: "心理",
    tags: ["选择", "心理"],
    intensity: 9
  },
  {
    content: "你内心最深的羞耻感来源于什么？这种羞耻如何塑造了你的行为模式？",
    category: "心理",
    tags: ["心理", "行为"],
    intensity: 9
  },
  {
    content: "如果可以通过一个极其自私的选择来避免巨大痛苦，你会这么做吗？为什么？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 8
  },
  {
    content: "你最深的自我怀疑来源于什么？它如何阻碍你实现真正的潜力？",
    category: "心理",
    tags: ["心理", "情感"],
    intensity: 8
  },
  {
    content: "在什么情况下，你会为了被爱而完全放弃自我？这反映了你什么样的情感需求？",
    category: "心理",
    tags: ["选择", "心理"],
    intensity: 9
  },
  {
    content: "你内心最强烈但从未表达的愤怒是什么？为什么你选择压抑这种愤怒？",
    category: "心理",
    tags: ["心理", "情感"],
    intensity: 9
  },
  {
    content: "如果可以通过一个极其残酷的行为来保护你爱的人，你会这么做吗？这反映了你什么样的保护本能？",
    category: "道德",
    tags: ["选择", "道德"],
    intensity: 10
  },
  {
    content: "你最不愿面对的人性弱点是什么？你如何与这个弱点共存？",
    category: "心理",
    tags: ["心理", "情感"],
    intensity: 8
  }
];

// 中等刺激度题库
export const MediumHighIntensityQuestions: Question[] = [
  {
    content: "你曾经对某人有过性幻想但从未告诉过他/她吗？是谁？",
    category: "性",
    tags: ["幻想", "秘密"],
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
    tags: ["场所", "冒险"],
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
    tags: ["偏好", "体验"],
    intensity: 7
  },
  {
    content: "你曾经因为什么性幻想而自慰？最近一次是什么时候？",
    category: "性",
    tags: ["幻想", "行为"],
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
    tags: ["幻想", "选择"],
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
    tags: ["行为", "秘密"],
    intensity: 6
  },
  {
    content: "你曾经尝试过什么性玩具？哪个是你的最爱？",
    category: "性",
    tags: ["体验", "偏好"],
    intensity: 7
  },
  {
    content: "你曾经在什么奇怪的地方留下过\"痕迹\"？",
    category: "性",
    tags: ["场所", "行为"],
    intensity: 7
  },
  {
    content: "你曾经在性方面做过什么让自己感到惊讶的事情？",
    category: "性",
    tags: ["体验", "发现"],
    intensity: 7
  },
  {
    content: "你最想尝试但还没尝试过的性行为是什么？",
    category: "性",
    tags: ["幻想", "好奇"],
    intensity: 7
  },
  {
    content: "你曾经因为什么原因拒绝了伴侣的性要求？",
    category: "关系",
    tags: ["拒绝", "原因"],
    intensity: 6
  },
  {
    content: "你曾经在性方面让伴侣失望的事情是什么？",
    category: "性",
    tags: ["遗憾", "关系"],
    intensity: 6
  },
  {
    content: "你曾经在什么不合适的场合想到性而分心？",
    category: "性",
    tags: ["场所", "行为"],
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
    tags: ["取悦", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在性方面有过什么尴尬的\"第一次\"经历？",
    category: "性",
    tags: ["体验", "尴尬"],
    intensity: 7
  },
  {
    content: "你最疯狂的约会经历是什么？结果如何？",
    category: "关系",
    tags: ["约会", "冒险"],
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
    tags: ["伪装", "原因"],
    intensity: 6
  },
  {
    content: "你曾经在多长时间内和多少不同的人发生过关系？",
    category: "性",
    tags: ["体验", "秘密"],
    intensity: 7
  },
  {
    content: "你曾经在什么情况下被他人的某个特质意外地性唤起？",
    category: "性",
    tags: ["吸引", "体验"],
    intensity: 6
  },
  {
    content: "你曾经为了性而做过什么让自己感到羞耻的事情？",
    category: "性",
    tags: ["行为", "羞耻"],
    intensity: 7
  },
  {
    content: "你最享受的前戏是什么？为什么特别喜欢？",
    category: "性",
    tags: ["偏好", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在什么情况下对不应该有感觉的人产生过性冲动？",
    category: "性",
    tags: ["吸引", "禁忌"],
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
    tags: ["体验", "反应"],
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
    tags: ["秘密", "关系"],
    intensity: 7
  },
  {
    content: "你曾经在性方面有过什么特别难忘的经历？为什么难忘？",
    category: "性",
    tags: ["体验", "难忘"],
    intensity: 7
  },
  {
    content: "你曾经在什么情况下感到最性感或最有魅力？",
    category: "性",
    tags: ["自信", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在性方面做过什么冒险但值得的事情？",
    category: "性",
    tags: ["冒险", "体验"],
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
    tags: ["幻想", "冒险"],
    intensity: 7
  },
  {
    content: "你曾经在什么情况下对性感到恐惧或焦虑？",
    category: "性",
    tags: ["恐惧", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在性方面做过什么让自己感到特别满足的事情？",
    category: "性",
    tags: ["体验", "满足"],
    intensity: 6
  },
  {
    content: "你曾经在什么情况下感觉自己被性方面的欲望控制？",
    category: "性",
    tags: ["欲望", "体验"],
    intensity: 7
  },
  {
    content: "你曾经对伴侣有过什么性方面的不满但没有直接表达？",
    category: "关系",
    tags: ["不满", "关系"],
    intensity: 6
  },
  {
    content: "你曾经在性方面做过什么让伴侣感到不舒服的事情？",
    category: "性",
    tags: ["体验", "关系"],
    intensity: 7
  },
  {
    content: "你曾经在什么情况下对性感到特别渴望？",
    category: "性",
    tags: ["欲望", "体验"],
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
    tags: ["自信", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在性方面做过什么让自己感到特别兴奋的事情？",
    category: "性",
    tags: ["体验", "刺激"],
    intensity: 7
  },
  {
    content: "你曾经在什么情况下感觉自己被性方面的欲望拒绝？",
    category: "性",
    tags: ["拒绝", "体验"],
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
    tags: ["发现", "体验"],
    intensity: 6
  },
  {
    content: "你曾经在什么情况下感觉自己在性方面特别有创意？",
    category: "性",
    tags: ["创意", "体验"],
    intensity: 6
  },
  {
    content: "你曾经为了取悦伴侣而做过什么自己不太喜欢的性行为？",
    category: "性",
    tags: ["取悦", "体验"],
    intensity: 7
  }
];

// 较为轻松适合破冰的题库
export const LowIntensityQuestions: Question[] = [
  {
    content: "你第一次约会的经历是什么样的？",
    category: "关系",
    tags: ["约会", "经历"],
    intensity: 3
  },
  {
    content: "你做过的最尴尬的事情是什么？",
    category: "社交",
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
    category: "道德",
    tags: ["谎言", "原因"],
    intensity: 5
  },
  {
    content: "你曾经暗恋过谁？他/她知道吗？",
    category: "关系",
    tags: ["暗恋", "秘密"],
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
    category: "心理",
    tags: ["情绪", "经历"],
    intensity: 4
  },
  {
    content: "你做过的最疯狂的事情是什么？",
    category: "生活",
    tags: ["冒险", "经历"],
    intensity: 5
  },
  {
    content: "如果可以和一位名人共进晚餐，你会选谁？为什么？",
    category: "生活",
    tags: ["选择", "兴趣"],
    intensity: 2
  },
  {
    content: "你曾经因为什么事情感到特别骄傲？",
    category: "个人",
    tags: ["骄傲", "经历"],
    intensity: 2
  },
  {
    content: "你有什么奇怪的习惯是别人不知道的？",
    category: "个人",
    tags: ["习惯", "秘密"],
    intensity: 3
  },
  {
    content: "你最后一次做的冲动决定是什么？结果如何？",
    category: "生活",
    tags: ["冲动", "经历"],
    intensity: 3
  },
  {
    content: "你曾经熬夜做过最疯狂的事情是什么？",
    category: "生活",
    tags: ["熬夜", "冒险"],
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
    category: "生活",
    tags: ["后悔", "经历"],
    intensity: 4
  },
  {
    content: "你最喜欢的约会活动是什么？",
    category: "关系",
    tags: ["约会", "偏好"],
    intensity: 2
  },
  {
    content: "你曾经在公共场合做过什么令人尴尬的事情？",
    category: "社交",
    tags: ["尴尬", "场所"],
    intensity: 4
  },
  {
    content: "你有什么奇怪的食物组合是你特别喜欢的？",
    category: "个人",
    tags: ["偏好", "习惯"],
    intensity: 1
  },
  {
    content: "你最大的恐惧是什么？为什么会害怕？",
    category: "心理",
    tags: ["恐惧", "原因"],
    intensity: 4
  },
  {
    content: "你曾经因为什么事情被误解最深？",
    category: "社交",
    tags: ["误解", "经历"],
    intensity: 3
  },
  {
    content: "你最近一次感到特别开心是因为什么事？",
    category: "心理",
    tags: ["情绪", "经历"],
    intensity: 2
  },
  {
    content: "你曾经在社交媒体上做过什么让你后悔的事情？",
    category: "社交",
    tags: ["后悔", "场所"],
    intensity: 4
  },
  {
    content: "你最喜欢的电影是什么？为什么特别喜欢它？",
    category: "个人",
    tags: ["偏好", "兴趣"],
    intensity: 1
  },
  {
    content: "你曾经因为什么事情感到非常尴尬但后来发现其实没人注意到？",
    category: "社交",
    tags: ["尴尬", "经历"],
    intensity: 3
  },
  {
    content: "如果你可以改变过去的一件事，会是什么？",
    category: "生活",
    tags: ["后悔", "选择"],
    intensity: 4
  },
  {
    content: "你最近一次说谎是什么时候？说了什么谎？",
    category: "道德",
    tags: ["谎言", "经历"],
    intensity: 4
  },
  {
    content: "你有什么特别的童年记忆让你至今难忘？",
    category: "生活",
    tags: ["童年", "记忆"],
    intensity: 3
  },
  {
    content: "你曾经做过什么事情让你的朋友感到惊讶？",
    category: "社交",
    tags: ["惊喜", "经历"],
    intensity: 3
  },
  {
    content: "你最近一次感到特别尴尬是什么时候？发生了什么？",
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
    tags: ["偏好", "习惯"],
    intensity: 1
  },
  {
    content: "你曾经因为什么事情感到特别嫉妒？",
    category: "心理",
    tags: ["嫉妒", "情绪"],
    intensity: 4
  },
  {
    content: "你做过的最勇敢的事情是什么？",
    category: "个人",
    tags: ["勇气", "经历"],
    intensity: 3
  },
  {
    content: "如果你可以立刻掌握一项新技能，会选择什么？",
    category: "个人",
    tags: ["技能", "选择"],
    intensity: 2
  },
  {
    content: "你生活中最大的遗憾是什么？",
    category: "生活",
    tags: ["遗憾", "经历"],
    intensity: 5
  },
  {
    content: "你曾经做过什么事情后来发现完全是场误会？",
    category: "生活",
    tags: ["误解", "经历"],
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
    tags: ["性格", "自信"],
    intensity: 2
  },
  {
    content: "你曾经在什么场合笑得最不受控制？",
    category: "社交",
    tags: ["情绪", "场所"],
    intensity: 3
  },
  {
    content: "你曾经做过什么事情让你的家人感到惊讶？",
    category: "关系",
    tags: ["惊喜", "经历"],
    intensity: 3
  },
  {
    content: "你最近一次感到特别感动是因为什么？",
    category: "心理",
    tags: ["情绪", "经历"],
    intensity: 3
  },
  {
    content: "你曾经有过什么特别难忘的旅行经历？",
    category: "生活",
    tags: ["旅行", "经历"],
    intensity: 2
  },
  {
    content: "你最近一次做了什么让自己感到自豪的事情？",
    category: "个人",
    tags: ["骄傲", "经历"],
    intensity: 2
  },
  {
    content: "你曾经因为什么事情感到特别尴尬但后来变成了笑话？",
    category: "社交",
    tags: ["尴尬", "经历"],
    intensity: 3
  },
  {
    content: "你最喜欢的儿时游戏是什么？",
    category: "生活",
    tags: ["童年", "偏好"],
    intensity: 1
  },
  {
    content: "你曾经有过什么误会导致的有趣经历？",
    category: "生活",
    tags: ["误解", "经历"],
    intensity: 2
  },
  {
    content: "你最想去但还没去过的地方是哪里？为什么想去？",
    category: "生活",
    tags: ["旅行", "选择"],
    intensity: 1
  },
  {
    content: "你曾经收到过什么让你特别感动的礼物？",
    category: "社交",
    tags: ["礼物", "情绪"],
    intensity: 2
  },
  {
    content: "你有什么小时候特别喜欢但现在觉得很尴尬的爱好？",
    category: "个人",
    tags: ["爱好", "尴尬"],
    intensity: 2
  },
  {
    content: "如果你可以和过去的自己说一句话，会说什么？",
    category: "生活",
    tags: ["选择", "经历"],
    intensity: 3
  },
  {
    content: "你曾经做过什么事情完全超出了自己的舒适区？",
    category: "个人",
    tags: ["冒险", "经历"],
    intensity: 3
  },
  {
    content: "你最后一次因为什么事情感到特别惊喜？",
    category: "心理",
    tags: ["惊喜", "经历"],
    intensity: 2
  }
];

// 职场/事业相关的问题题库
export const CareerQuestions: Question[] = [];

// 价值观/人生选择题库
export const ValueChoiceQuestions: Question[] = [];

// 技术宅/极客文化题库
export const GeekCultureQuestions: Question[] = [];

// 财富观/金钱态度题库
export const MoneyAttitudeQuestions: Question[] = [];

// 创意假设/思维实验题库
export const HypotheticalQuestions: Question[] = [
  {
    content: "如果你能够选择永远停留在一个年龄，你会选择几岁？为什么？",
    tags: ["生活", "时间"],
    intensity: 1
  },
  {
    content: "如果你可以立刻精通一项技能（但不能用于赚钱），你会选择什么？",
    tags: ["能力", "兴趣"],
    intensity: 1
  },
  {
    content: "如果你必须在海洋、沙漠、丛林或极地生活一年，你会选择哪里？",
    tags: ["生存", "选择"],
    intensity: 2
  },
  {
    content: "如果你可以与历史上任何人共进晚餐，你会选择谁？会问什么问题？",
    tags: ["历史", "交流"],
    intensity: 1
  },
  {
    content: "如果你拥有读心术，但每次使用都会失去一天寿命，你会如何使用这个能力？",
    tags: ["能力", "代价"],
    intensity: 3
  },
  {
    content: "如果你可以穿越到过去改变一个历史事件，你会选择什么？会带来什么后果？",
    tags: ["时间", "历史"],
    intensity: 2
  },
  {
    content: "如果你必须放弃一种感官（视觉、听觉、触觉、嗅觉、味觉），你会放弃哪一种？",
    tags: ["感官", "选择"],
    intensity: 2
  },
  {
    content: "如果你发现自己是一个科幻小说中的人工智能，你的第一反应是什么？",
    tags: ["身份", "科技"],
    intensity: 2
  },
  {
    content: "如果你可以将自己的意识上传到云端永生，但失去实体生活，你会这么做吗？",
    tags: ["生命", "科技"],
    intensity: 3
  },
  {
    content: "如果你知道世界将在一个月后毁灭，而只有你知道这个信息，你会怎么做？",
    tags: ["末日", "责任"],
    intensity: 3
  },
  {
    content: "如果你可以删除一段痛苦的记忆，但这会改变你的人格，你会这样做吗？",
    tags: ["记忆", "身份"],
    intensity: 3
  },
  {
    content: "如果你可以选择变成任何一种动物生活一周，你会选择什么动物？为什么？",
    tags: ["动物", "体验"],
    intensity: 1
  },
  {
    content: "如果你可以看到所有人头上漂浮着的一个数字，这个数字代表什么对你来说最有价值？",
    tags: ["信息", "价值观"],
    intensity: 2
  },
  {
    content: "如果你必须在完全孤独和永远无法独处之间选择一种生活方式，你会选择哪个？",
    tags: ["社交", "生活方式"],
    intensity: 2
  },
  {
    content: "如果你可以创造一个新的社会规则，并让所有人遵守，你会创造什么规则？",
    tags: ["社会", "规则"],
    intensity: 2
  },
  {
    content: "如果你可以在梦中度过一个完全真实的虚拟人生，但醒来后会忘记一半的现实生活记忆，你会这样做吗？",
    tags: ["现实", "记忆"],
    intensity: 3
  },
  {
    content: "如果你可以让世界上所有人在一天内忘记一个概念，你会选择让大家忘记什么？",
    tags: ["概念", "社会"],
    intensity: 2
  },
  {
    content: "如果你可以选择在任何虚构世界中生活，但再也不能回到现实，你会选择哪个世界？",
    tags: ["虚构", "选择"],
    intensity: 2
  },
  {
    content: "如果你可以让任何一本书的内容成为现实，你会选择哪本书？考虑到了可能的后果吗？",
    tags: ["文学", "现实"],
    intensity: 2
  },
  {
    content: "如果你可以选择拥有超能力，但每次使用都会随机使世界上一个人遭遇不幸，你会接受这种能力吗？",
    tags: ["能力", "道德"],
    intensity: 3
  },
  {
    content: "如果你可以选择知道自己确切的死亡日期，你会想知道吗？这会如何改变你的生活？",
    tags: ["生死", "知识"],
    intensity: 3
  },
  {
    content: "如果你可以选择进入一个完美的模拟世界，还是留在有缺陷的现实世界，你会怎么选？",
    tags: ["现实", "完美"],
    intensity: 2
  },
  {
    content: "如果你可以获得任何问题的真相，但每次都会失去一个重要的记忆，你会如何使用这种能力？",
    tags: ["真相", "记忆"],
    intensity: 3
  },
  {
    content: "如果你可以选择让世界上所有人在某一方面变得完全相同（如外表、智力或财富），你会选择哪一方面？为什么？",
    tags: ["平等", "多样性"],
    intensity: 2
  },
  {
    content: "如果你可以选择重新开始人生，但必须放弃现有的所有记忆，你会这样做吗？",
    tags: ["重生", "记忆"],
    intensity: 3
  },
  {
    content: "如果你可以选择拥有完美的工作/事业成就或完美的家庭生活，但不能两者兼得，你会怎么选？",
    tags: ["事业", "家庭"],
    intensity: 2
  },
  {
    content: "如果你必须选择永远生活在过去的某个时代，而不能回到现代，你会选择哪个时代？",
    tags: ["时间", "历史"],
    intensity: 2
  },
  {
    content: "如果你可以选择让全人类失去一种情感，你会选择消除哪种情感？为什么？",
    tags: ["情感", "人性"],
    intensity: 3
  },
  {
    content: "如果你可以和任何一种动物无障碍沟通一天，你会选择哪种动物？会问什么问题？",
    tags: ["动物", "沟通"],
    intensity: 1
  },
  {
    content: "如果你可以选择让世界上所有人都遵循一种宗教或哲学，你会选择哪一种？或者会创造一种新的？",
    tags: ["信仰", "哲学"],
    intensity: 3
  },
  {
    content: "如果你可以选择成为任何虚构角色，但必须承担他们所有的痛苦和责任，你会选择谁？",
    tags: ["角色", "责任"],
    intensity: 2
  },
  {
    content: "如果你可以选择让世界上一种科技永远消失，你会选择什么？为什么？",
    tags: ["科技", "社会"],
    intensity: 2
  },
  {
    content: "如果你可以看到平行宇宙中的自己，但不能干预他们的生活，你最想看到什么样的可能性？",
    tags: ["平行宇宙", "可能性"],
    intensity: 2
  },
  {
    content: "如果你可以选择让全世界的人在24小时内忘记一件事，你会让大家忘记什么？",
    tags: ["记忆", "社会"],
    intensity: 2
  },
  {
    content: "如果你可以选择让一个想法植入全人类的潜意识，你会选择什么想法？",
    tags: ["思想", "影响"],
    intensity: 3
  },
  {
    content: "如果你必须永远生活在一个电影或游戏的世界中，你会选择哪一个？",
    tags: ["虚拟", "选择"],
    intensity: 1
  },
  {
    content: "如果你可以选择让自己的一个决定从未发生过，你会选择改变哪个决定？",
    tags: ["决定", "后悔"],
    intensity: 2
  },
  {
    content: "如果你可以永久交换两种能力（如视觉和听觉，或智力和体力），你会交换什么？",
    tags: ["能力", "交换"],
    intensity: 2
  },
  {
    content: "如果你可以选择在睡眠中学习任何东西，但每次这样做都会减少你的寿命一周，你会如何使用这种能力？",
    tags: ["学习", "代价"],
    intensity: 2
  },
  {
    content: "如果你可以选择让世界上一种职业消失，你会选择哪一种？社会将如何适应？",
    tags: ["职业", "社会"],
    intensity: 2
  },
  {
    content: "如果你可以选择成为历史上任何一个匿名人物（非名人），你会选择谁？为什么？",
    tags: ["历史", "身份"],
    intensity: 2
  },
  {
    content: "如果你可以选择拥有完美的记忆或完全选择性地遗忘能力，你会选择哪一个？",
    tags: ["记忆", "能力"],
    intensity: 2
  },
  {
    content: "如果你可以选择让一种语言成为全球通用语，你会选择哪种语言？或者创造一种新语言？",
    tags: ["语言", "沟通"],
    intensity: 1
  },
  {
    content: "如果你可以选择让世界上所有人在某一天同时做一件事，你会让大家做什么？",
    tags: ["集体", "行动"],
    intensity: 2
  },
  {
    content: "如果你必须选择永远生活在白天或黑夜，你会选择哪一个？为什么？",
    tags: ["时间", "生活方式"],
    intensity: 1
  },
  {
    content: "如果你可以选择让自己的一种情感变得更强烈或更微弱，你会选择改变哪种情感？",
    tags: ["情感", "自我"],
    intensity: 2
  },
  {
    content: "如果你可以选择让全世界的人在一个特定问题上达成一致，你会选择什么问题？",
    tags: ["共识", "问题"],
    intensity: 2
  },
  {
    content: "如果你可以选择在任何一个历史事件现场作为观察者，你会选择见证什么？",
    tags: ["历史", "见证"],
    intensity: 1
  },
  {
    content: "如果你可以选择与任何一种已灭绝的生物共处一天，你会选择什么生物？",
    tags: ["生物", "灭绝"],
    intensity: 1
  },
  {
    content: "如果你可以在梦中创造并控制一个持续的世界，但每次进入都会让现实生活变得更加平淡，你会这样做吗？",
    tags: ["梦境", "现实"],
    intensity: 3
  }
].map(q => ({
  ...q,
  category: "假设与思维"
}));

// 童年/成长经历题库
export const ChildhoodMemoryQuestions: Question[] = [];

// 未来规划/梦想题库
export const FutureGoalsQuestions: Question[] = [];