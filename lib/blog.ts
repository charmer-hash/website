export type BlogSection = {
  title: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  eyebrow: string;
  featured?: boolean;
  tags: string[];
  accent: string;
  hero: {
    kicker: string;
    summary: string;
  };
  sections: BlogSection[];
  takeaways: string[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "from-prompt-to-product",
    title: "从 Prompt 到 Product",
    excerpt: "一次能跑通的 demo，不等于一个能长期工作的 AI 产品。真正困难的是把能力封装成稳定体验。",
    description:
      "拆解 AI 产品从 prompt 演示走向稳定交付时，界面、工作流、验证机制和反馈闭环该如何一起设计。",
    publishedAt: "2026-03-18",
    readingTime: "8 min read",
    category: "Product Systems",
    eyebrow: "Essay 01",
    featured: true,
    tags: ["AI Product", "Workflow", "Design Systems"],
    accent: "from-sky-400/30 via-cyan-300/10 to-transparent",
    hero: {
      kicker: "把能力组织成体验，而不是把模型直接暴露给用户。",
      summary:
        "当用户说“这个 AI 很聪明”时，往往不是因为模型本身，而是因为系统帮他省掉了试错、判断和反复沟通的成本。",
    },
    sections: [
      {
        title: "1. Demo 最擅长制造错觉",
        paragraphs: [
          "AI demo 最容易在受控输入里显得惊艳，因为你知道该给什么 prompt，也知道它会在哪一步失误。用户却不会沿着你的最优路径操作，他们会跳步、误解、反复修改，甚至直接把半成品当成结果。",
          "所以产品化的第一步不是追求更花哨的输出，而是识别哪些环节必须被系统托住。输入需要被整理，意图需要被澄清，工具调用需要被限制，结果需要被验证。真正的产品价值就藏在这些约束里。",
        ],
      },
      {
        title: "2. 界面不是装饰层，而是控制面板",
        paragraphs: [
          "很多 AI 产品把界面做成一个大输入框，默认所有复杂性都交给 prompt。这会让系统看起来很灵活，但也把负担直接丢给了用户。对于普通人来说，越开放越容易迷失。",
          "更好的方式是把 prompt 隐藏到工作流后面。用结构化输入、步骤反馈、状态解释和可逆操作，把模型能力翻译成可理解的流程。界面在这里承担的是编排和解释，而不是单纯展示输出。",
        ],
      },
      {
        title: "3. 产品需要一条可追责的结果链路",
        paragraphs: [
          "AI 的结果往往不是一次性正确，而是在多轮迭代里逐渐收敛。于是产品必须保留一条人能回看的链路：输入是什么，系统做了哪些判断，调用了哪些工具，最后为什么给出这个答案。",
          "当用户能看到这条链路时，信任才会增长。因为他们理解系统的边界，也知道哪里能介入修正。没有这条链路，再强的模型都像黑箱魔术，第一次惊艳，第二次就开始焦虑。",
        ],
      },
    ],
    takeaways: [
      "先设计稳定流程，再谈模型炫技。",
      "AI UI 的任务是降低表达成本和纠错成本。",
      "把结果变成可回溯的系统，而不是一次性答案。",
    ],
  },
  {
    slug: "agent-boundary-management",
    title: "Agent 的边界管理",
    excerpt: "自动化能力越强，越要认真定义什么该交给系统，什么必须回到人手里。",
    description:
      "讨论 Agent 什么时候应该接管，什么时候应该停下并把决策权交还给用户，避免“看起来全自动，实际上不可控”。",
    publishedAt: "2026-03-24",
    readingTime: "6 min read",
    category: "Agents",
    eyebrow: "Essay 02",
    tags: ["Agents", "Human-in-the-loop", "Reliability"],
    accent: "from-emerald-400/30 via-teal-300/10 to-transparent",
    hero: {
      kicker: "全自动不是目标，可控才是目标。",
      summary:
        "Agent 的价值不是把所有事情都包办，而是在正确的位置接管重复劳动，在高风险节点及时停下等待人类判断。",
    },
    sections: [
      {
        title: "1. 先定义不可自动化的区间",
        paragraphs: [
          "很多团队会先问“Agent 还能做什么”，但更重要的问题是“Agent 不该碰什么”。涉及品牌表达、法律风险、财务决策、隐私数据或对外发布时，系统应该主动让位，而不是偷偷推进到最后一步。",
          "边界不是对能力的否定，而是把自动化放在正确的风险区间里。只有明确这些禁区，团队才不会在看似顺滑的流程里积累隐患。",
        ],
      },
      {
        title: "2. 停顿点比连续执行更重要",
        paragraphs: [
          "一个好的 Agent 流程里，一定存在明确的暂停节点。比如生成初稿后等待确认、执行外部操作前要求复核、跨系统写入时展示摘要和影响范围。这些停顿点让用户保有方向感，也让系统显得可靠。",
          "如果系统一路自动跑到底，用户通常只会在出错时第一次认真看它。那时已经太晚，因为错误已经扩散到后续动作里了。",
        ],
      },
      {
        title: "3. 边界应该被表达出来",
        paragraphs: [
          "边界管理不能只存在于工程逻辑里，还要被界面表达出来。用户需要知道系统现在掌握了什么、准备做什么、为什么此刻需要确认。",
          "只有当风险、权限和上下文被清晰展示时，人机协作才不是一句口号，而是一种真正能长期工作的产品机制。",
        ],
      },
    ],
    takeaways: [
      "先划定禁区，再扩大自动化范围。",
      "为关键节点设计显式暂停和复核。",
      "把系统边界翻译给用户，而不是只写在代码里。",
    ],
  },
  {
    slug: "personal-site-in-the-ai-era",
    title: "AI 时代的个人网站",
    excerpt: "官网不再只是简历和作品墙，它也可以是你组织观点、系统和判断力的地方。",
    description:
      "为什么在 AI 时代仍然值得做个人网站，以及个人站应该如何从静态名片升级为持续输出思考的内容接口。",
    publishedAt: "2026-03-27",
    readingTime: "7 min read",
    category: "Writing",
    eyebrow: "Essay 03",
    tags: ["Personal Brand", "Writing", "Interface"],
    accent: "from-violet-400/30 via-fuchsia-300/10 to-transparent",
    hero: {
      kicker: "当生成内容越来越便宜，个人判断会变得更贵。",
      summary:
        "网站真正稀缺的不是页面数量，而是你如何持续表达方法、审美和对技术边界的理解。这些内容才会构成长期识别度。",
    },
    sections: [
      {
        title: "1. 个人站的角色正在变化",
        paragraphs: [
          "过去个人站像一张在线名片，告诉别人你是谁、做过什么。现在这些信息几乎在任何平台都能找到，所以单纯重复履历已经没有太大意义。",
          "新的价值在于，它能成为你自己的语境。你决定什么被强调，什么被隐藏，如何把零散项目连接成一个可理解的方法论。",
        ],
      },
      {
        title: "2. 博客是第二层交互",
        paragraphs: [
          "作品页展示结果，博客展示判断过程。两者结合起来，别人才能看见你不仅会做，而且知道为什么这样做。尤其在 AI 场景里，过程往往比最终画面更能体现专业度。",
          "一篇好的文章像是对外开放的思维接口。它能让读者沿着你的问题意识进入系统内部，而不是只停留在表面截图。",
        ],
      },
      {
        title: "3. 用结构而不是堆砌来建立识别度",
        paragraphs: [
          "真正有辨识度的个人站，不依赖大量花哨模块，而依赖清晰的结构：你关注什么、你如何工作、你输出什么、别人如何继续和你建立连接。",
          "结构清楚之后，设计语言才有意义。否则再精致的动画，也只是把信息混乱包装得更漂亮一些。",
        ],
      },
    ],
    takeaways: [
      "个人站应该表达语境，而不只是罗列经历。",
      "博客让你的方法和判断变得可见。",
      "先定结构，再追求视觉上的惊艳。",
    ],
  },
];

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost() {
  return getAllPosts().find((post) => post.featured) ?? getAllPosts()[0];
}

export function getRelatedPosts(slug: string, limit = 2) {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
