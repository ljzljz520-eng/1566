import type { President } from '@/types/president'

export const presidents: President[] = [
  {
    id: 1,
    name: '乔治·华盛顿',
    nameEn: 'George Washington',
    party: 'independent',
    termStart: 1789,
    termEnd: 1797,
    birthDate: '1732-02-22',
    deathDate: '1799-12-14',
    birthplace: '弗吉尼亚州威斯特摩兰县',
    education: '家庭教育',
    achievements: [
      '领导美国独立战争取得胜利',
      '担任美国第一任总统',
      '确立总统任期不超过两届的传统'
    ],
    biography: '乔治·华盛顿是美国的开国元勋之一，被称为"美国国父"。他在独立战争中担任大陆军总司令，成功领导美国人民摆脱英国殖民统治。',
    historicalBackground: '美国独立战争结束后，新生的美国需要建立一个稳定的政府。华盛顿的领导为美国的民主制度奠定了基础。',
    keyEvents: [
      { year: 1775, title: '担任大陆军总司令', description: '被任命为大陆军总司令，开始领导美国独立战争' },
      { year: 1781, title: '约克镇大捷', description: '在约克镇战役中击败英军，独立战争取得决定性胜利' },
      { year: 1789, title: '就任第一任总统', description: '全票当选美国第一任总统' }
    ],
    portrait: 'https://picsum.photos/seed/president1/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 2,
    name: '约翰·亚当斯',
    nameEn: 'John Adams',
    party: 'federalist',
    termStart: 1797,
    termEnd: 1801,
    birthDate: '1735-10-30',
    deathDate: '1826-07-04',
    birthplace: '马萨诸塞州布伦特里',
    education: '哈佛大学',
    achievements: [
      '《独立宣言》签署人之一',
      '美国第一任副总统',
      '建立美国海军'
    ],
    biography: '约翰·亚当斯是美国开国元勋之一，《独立宣言》的主要起草者之一。他是联邦党的重要人物。',
    historicalBackground: '亚当斯执政期间，美国面临与法国的紧张关系，他成功避免了战争，维护了国家利益。',
    keyEvents: [
      { year: 1776, title: '签署独立宣言', description: '作为大陆会议代表签署《独立宣言》' },
      { year: 1797, title: '就任第二任总统', description: '击败杰斐逊当选总统' }
    ],
    portrait: 'https://picsum.photos/seed/president2/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 3,
    name: '托马斯·杰斐逊',
    nameEn: 'Thomas Jefferson',
    party: 'democraticRepublican',
    termStart: 1801,
    termEnd: 1809,
    birthDate: '1743-04-13',
    deathDate: '1826-07-04',
    birthplace: '弗吉尼亚州夏洛茨维尔',
    education: '威廉与玛丽学院',
    achievements: [
      '《独立宣言》主要起草人',
      '路易斯安那购地案',
      '建立弗吉尼亚大学'
    ],
    biography: '托马斯·杰斐逊是美国第三任总统，民主共和党的创始人。他是美国启蒙思想的代表人物。',
    historicalBackground: '杰斐逊通过路易斯安那购地案使美国领土扩大了一倍，为美国的西部扩张奠定了基础。',
    keyEvents: [
      { year: 1776, title: '起草独立宣言', description: '撰写《独立宣言》的主要内容' },
      { year: 1803, title: '路易斯安那购地', description: '从法国购买路易斯安那地区' }
    ],
    portrait: 'https://picsum.photos/seed/president3/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 16,
    name: '亚伯拉罕·林肯',
    nameEn: 'Abraham Lincoln',
    party: 'republican',
    termStart: 1861,
    termEnd: 1865,
    birthDate: '1809-02-12',
    deathDate: '1865-04-15',
    birthplace: '肯塔基州霍金维尔',
    education: '自学成才',
    achievements: [
      '领导北方取得南北战争胜利',
      '废除奴隶制',
      '颁布《解放黑人奴隶宣言》'
    ],
    biography: '亚伯拉罕·林肯是美国第16任总统，被广泛认为是美国历史上最伟大的总统之一。他在任期间成功维护了国家统一，废除了奴隶制。',
    historicalBackground: '林肯执政期间，美国面临严重的分裂危机，南方各州因奴隶制问题脱离联邦。林肯领导北方赢得了南北战争。',
    keyEvents: [
      { year: 1861, title: '南北战争爆发', description: '南方各州脱离联邦，内战爆发' },
      { year: 1863, title: '解放黑人奴隶宣言', description: '颁布《解放黑人奴隶宣言》' },
      { year: 1865, title: '内战结束遇刺', description: '南北战争结束后遇刺身亡' }
    ],
    portrait: 'https://picsum.photos/seed/president16/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 32,
    name: '富兰克林·D·罗斯福',
    nameEn: 'Franklin D. Roosevelt',
    party: 'democratic',
    termStart: 1933,
    termEnd: 1945,
    birthDate: '1882-01-30',
    deathDate: '1945-04-12',
    birthplace: '纽约州海德公园',
    education: '哈佛大学、哥伦比亚大学法学院',
    achievements: [
      '实施新政应对大萧条',
      '领导美国参加第二次世界大战',
      '建立社会保障体系'
    ],
    biography: '富兰克林·D·罗斯福是美国第32任总统，也是唯一一位连任四届的总统。他领导美国度过了大萧条和第二次世界大战。',
    historicalBackground: '罗斯福上任时，美国正经历历史上最严重的经济危机。他的新政政策深刻改变了美国的社会和经济结构。',
    keyEvents: [
      { year: 1933, title: '百日新政', description: '上任后100天内推出一系列改革措施' },
      { year: 1941, title: '珍珠港事件', description: '日本偷袭珍珠港，美国加入二战' },
      { year: 1945, title: '雅尔塔会议', description: '与丘吉尔、斯大林举行雅尔塔会议' }
    ],
    portrait: 'https://picsum.photos/seed/president32/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 35,
    name: '约翰·F·肯尼迪',
    nameEn: 'John F. Kennedy',
    party: 'democratic',
    termStart: 1961,
    termEnd: 1963,
    birthDate: '1917-05-29',
    deathDate: '1963-11-22',
    birthplace: '马萨诸塞州布鲁克莱恩',
    education: '哈佛大学',
    achievements: [
      '推动太空计划',
      '古巴导弹危机处理',
      '推动民权立法'
    ],
    biography: '约翰·F·肯尼迪是美国第35任总统，也是美国历史上最年轻的当选总统。他在任期间遇刺身亡，成为美国历史上的一大谜团。',
    historicalBackground: '肯尼迪执政期间正值冷战高峰期，他成功处理了古巴导弹危机，避免了核战争。',
    keyEvents: [
      { year: 1961, title: '猪湾事件', description: '支持古巴流亡者入侵古巴失败' },
      { year: 1962, title: '古巴导弹危机', description: '成功处理古巴导弹危机' },
      { year: 1963, title: '遇刺身亡', description: '在达拉斯遇刺身亡' }
    ],
    portrait: 'https://picsum.photos/seed/president35/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 40,
    name: '罗纳德·里根',
    nameEn: 'Ronald Reagan',
    party: 'republican',
    termStart: 1981,
    termEnd: 1989,
    birthDate: '1911-02-06',
    deathDate: '2004-06-05',
    birthplace: '伊利诺伊州坦皮科',
    education: '尤里卡学院',
    achievements: [
      '里根经济学',
      '结束冷战',
      '重振美国经济'
    ],
    biography: '罗纳德·里根是美国第40任总统，曾是好莱坞演员。他的保守主义政策深刻影响了美国政治。',
    historicalBackground: '里根执政期间，美国经济从滞胀中复苏，苏联开始解体，冷战走向结束。',
    keyEvents: [
      { year: 1981, title: '遇刺受伤', description: '上任不久遇刺受伤' },
      { year: 1987, title: '戈尔巴乔夫峰会', description: '与苏联领导人戈尔巴乔夫举行峰会' },
      { year: 1989, title: '柏林墙倒塌', description: '冷战标志性事件' }
    ],
    portrait: 'https://picsum.photos/seed/president40/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 44,
    name: '贝拉克·奥巴马',
    nameEn: 'Barack Obama',
    party: 'democratic',
    termStart: 2009,
    termEnd: 2017,
    birthDate: '1961-08-04',
    deathDate: '',
    birthplace: '夏威夷州火奴鲁鲁',
    education: '哥伦比亚大学、哈佛大学法学院',
    achievements: [
      '奥巴马医改',
      '击毙本·拉登',
      '推动清洁能源发展'
    ],
    biography: '贝拉克·奥巴马是美国第44任总统，也是美国历史上第一位非洲裔总统。',
    historicalBackground: '奥巴马在全球金融危机期间上任，实施了一系列经济刺激政策。',
    keyEvents: [
      { year: 2009, title: '经济刺激计划', description: '推出7870亿美元经济刺激计划' },
      { year: 2010, title: '医改法案通过', description: '奥巴马医改法案获得通过' },
      { year: 2011, title: '击毙本·拉登', description: '美军击毙基地组织领导人本·拉登' }
    ],
    portrait: 'https://picsum.photos/seed/president44/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 45,
    name: '唐纳德·特朗普',
    nameEn: 'Donald Trump',
    party: 'republican',
    termStart: 2017,
    termEnd: 2021,
    birthDate: '1946-06-14',
    deathDate: '',
    birthplace: '纽约州纽约市',
    education: '宾夕法尼亚大学沃顿商学院',
    achievements: [
      '减税政策',
      '贸易保护主义政策',
      '推动制造业回流'
    ],
    biography: '唐纳德·特朗普是美国第45任总统，曾是商人和电视名人。他以非传统的政治风格著称。',
    historicalBackground: '特朗普执政期间推行"美国优先"政策，在国际贸易、移民等领域采取了一系列有争议的措施。',
    keyEvents: [
      { year: 2017, title: '减税法案通过', description: '大规模减税法案获得通过' },
      { year: 2019, title: '第一次弹劾', description: '成为第三位被弹劾的总统' },
      { year: 2021, title: '国会山骚乱', description: '支持者冲击国会山' }
    ],
    portrait: 'https://picsum.photos/seed/president45/400/500',
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 46,
    name: '约瑟夫·拜登',
    nameEn: 'Joe Biden',
    party: 'democratic',
    termStart: 2021,
    termEnd: 2025,
    birthDate: '1942-11-20',
    deathDate: '',
    birthplace: '宾夕法尼亚州斯克兰顿',
    education: '特拉华大学、雪城大学法学院',
    achievements: [
      '新冠疫情应对',
      '基础设施法案',
      '气候政策'
    ],
    biography: '约瑟夫·拜登是美国第46任总统，曾担任奥巴马政府的副总统。他是美国历史上年龄最大的总统。',
    historicalBackground: '拜登在新冠疫情期间上任，面临疫情恢复、经济复苏等多重挑战。',
    keyEvents: [
      { year: 2021, title: '疫情救助计划', description: '推出1.9万亿美元疫情救助计划' },
      { year: 2021, title: '基础设施法案', description: '基础设施投资法案获得通过' },
      { year: 2022, title: '通胀削减法案', description: '通过通胀削减法案' }
    ],
    portrait: 'https://picsum.photos/seed/president46/400/500',
    images: [],
    videos: [],
    relations: []
  }
]

export default presidents
