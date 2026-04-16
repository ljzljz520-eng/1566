import type { President } from '../types/president'

export const presidents: President[] = [
  {
    id: 1,
    order: 1,
    name: '乔治·华盛顿',
    nameEn: 'George Washington',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/220px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
    party: 'independent',
    termStart: 1789,
    termEnd: 1797,
    vicePresident: '约翰·亚当斯',
    vicePresidentEn: 'John Adams',
    birthDate: '1732-02-22',
    deathDate: '1799-12-14',
    birthPlace: '弗吉尼亚州威斯特摩兰县',
    birthPlaceEn: 'Westmoreland County, Virginia',
    education: '私人教育',
    educationEn: 'Private Education',
    achievements: [
      '领导美国独立战争取得胜利',
      '担任美国第一任总统',
      '确立总统任期不超过两届的惯例',
      '建立美国联邦政府机构'
    ],
    achievementsEn: [
      'Led the American Revolutionary War to victory',
      'Served as the first US President',
      'Established the two-term presidency tradition',
      'Founded US federal government institutions'
    ],
    biography: '乔治·华盛顿是美国杰出的资产阶级政治家、军事家、革命家，美国开国元勋、国父、首任总统。他在1775年至1783年美国独立战争中担任大陆军总司令，领导美国人民战胜了英国殖民统治，赢得了国家独立。1789年，他经过全体选举团无异议的支持而成为美国第一任总统。',
    biographyEn: 'George Washington was an outstanding American bourgeois politician, military strategist, and revolutionary. He was a founding father, the father of his country, and the first president of the United States.',
    historicalBackground: '在美国独立战争结束后，美国面临着建立一个稳定的联邦政府的挑战。华盛顿的领导为新生的美国奠定了坚实的基础。',
    historicalBackgroundEn: 'After the American Revolutionary War, the US faced the challenge of establishing a stable federal government. Washington\'s leadership laid a solid foundation for the new nation.',
    keyEvents: [
      { year: 1775, title: '担任大陆军总司令', titleEn: 'Appointed Commander-in-Chief', description: '被第二届大陆会议任命为大陆军总司令', descriptionEn: 'Appointed Commander-in-Chief by the Second Continental Congress' },
      { year: 1783, title: '独立战争胜利', titleEn: 'Revolutionary War Victory', description: '英国承认美国独立', descriptionEn: 'Britain recognized US independence' },
      { year: 1789, title: '就任总统', titleEn: 'Inaugurated as President', description: '成为美国第一任总统', descriptionEn: 'Became the first US President' }
    ],
    images: [
      { id: 'img1', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/440px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg', title: '华盛顿肖像', titleEn: 'Portrait of Washington', description: '吉尔伯特·斯图尔特绘制的经典肖像', descriptionEn: 'Classic portrait by Gilbert Stuart' }
    ],
    videos: [],
    relations: [
      { targetId: 2, type: 'political', description: '任命约翰·亚当斯为副总统', descriptionEn: 'Appointed John Adams as Vice President' }
    ]
  },
  {
    id: 2,
    order: 2,
    name: '约翰·亚当斯',
    nameEn: 'John Adams',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/John_Adams_A18236.jpg/220px-John_Adams_A18236.jpg',
    party: 'federalist',
    termStart: 1797,
    termEnd: 1801,
    vicePresident: '托马斯·杰斐逊',
    vicePresidentEn: 'Thomas Jefferson',
    birthDate: '1735-10-30',
    deathDate: '1826-07-04',
    birthPlace: '马萨诸塞州布伦特里',
    birthPlaceEn: 'Braintree, Massachusetts',
    education: '哈佛大学',
    educationEn: 'Harvard University',
    achievements: [
      '参与起草《独立宣言》',
      '担任美国第二任总统',
      '建立美国海军',
      '避免与法国开战'
    ],
    achievementsEn: [
      'Co-authored the Declaration of Independence',
      'Served as the second US President',
      'Established the US Navy',
      'Avoided war with France'
    ],
    biography: '约翰·亚当斯是美国第一任副总统，其后接替乔治·华盛顿成为美国第二任总统。他是《独立宣言》的签署者之一，被美国人视为最重要的开国元勋之一。',
    biographyEn: 'John Adams was the first Vice President of the United States and later succeeded George Washington as the second President.',
    historicalBackground: '亚当斯任期内，美国面临着与法国的外交危机和国内的政治分歧。',
    historicalBackgroundEn: 'During Adams\' presidency, the US faced diplomatic crises with France and domestic political divisions.',
    keyEvents: [
      { year: 1776, title: '签署独立宣言', titleEn: 'Signed Declaration of Independence', description: '作为开国元勋签署独立宣言', descriptionEn: 'Signed the Declaration as a founding father' },
      { year: 1797, title: '就任总统', titleEn: 'Inaugurated', description: '成为美国第二任总统', descriptionEn: 'Became the second US President' }
    ],
    images: [],
    videos: [],
    relations: [
      { targetId: 3, type: 'rival', description: '与托马斯·杰斐逊的政治竞争', descriptionEn: 'Political rivalry with Thomas Jefferson' }
    ]
  },
  {
    id: 3,
    order: 3,
    name: '托马斯·杰斐逊',
    nameEn: 'Thomas Jefferson',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg/220px-Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg',
    party: 'democraticRepublican',
    termStart: 1801,
    termEnd: 1809,
    vicePresident: '艾伦·伯尔 / 乔治·克林顿',
    vicePresidentEn: 'Aaron Burr / George Clinton',
    birthDate: '1743-04-13',
    deathDate: '1826-07-04',
    birthPlace: '弗吉尼亚州沙德韦尔',
    birthPlaceEn: 'Shadwell, Virginia',
    education: '威廉与玛丽学院',
    educationEn: 'College of William & Mary',
    achievements: [
      '起草《独立宣言》',
      '购买路易斯安那领地',
      '建立弗吉尼亚大学',
      '推动宗教自由'
    ],
    achievementsEn: [
      'Principal author of the Declaration of Independence',
      'Louisiana Purchase',
      'Founded the University of Virginia',
      'Promoted religious freedom'
    ],
    biography: '托马斯·杰斐逊是美国第三任总统，同时也是《美国独立宣言》主要起草人，美国开国元勋之一。他是民主共和党创始人，被普遍视为美国历史上最杰出的总统之一。',
    biographyEn: 'Thomas Jefferson was the third US President and the principal author of the Declaration of Independence.',
    historicalBackground: '杰斐逊的总统任期标志着民主共和党在美国政治中的崛起，他强调农业经济和州权。',
    historicalBackgroundEn: 'Jefferson\'s presidency marked the rise of the Democratic-Republican Party, emphasizing agrarian economy and states\' rights.',
    keyEvents: [
      { year: 1776, title: '起草独立宣言', titleEn: 'Drafted Declaration', description: '作为主要起草人完成独立宣言', descriptionEn: 'Principal author of the Declaration of Independence' },
      { year: 1803, title: '路易斯安那购地', titleEn: 'Louisiana Purchase', description: '从法国购买路易斯安那领地', descriptionEn: 'Purchased Louisiana Territory from France' }
    ],
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 16,
    order: 16,
    name: '亚伯拉罕·林肯',
    nameEn: 'Abraham Lincoln',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    party: 'republican',
    termStart: 1861,
    termEnd: 1865,
    vicePresident: '汉尼巴尔·哈姆林 / 安德鲁·约翰逊',
    vicePresidentEn: 'Hannibal Hamlin / Andrew Johnson',
    birthDate: '1809-02-12',
    deathDate: '1865-04-15',
    birthPlace: '肯塔基州霍金维尔',
    birthPlaceEn: 'Hodgenville, Kentucky',
    education: '自学成才',
    educationEn: 'Self-educated',
    achievements: [
      '领导北方赢得南北战争',
      '废除奴隶制',
      '签署《解放黑人奴隶宣言》',
      '维护国家统一'
    ],
    achievementsEn: [
      'Led the Union to victory in the Civil War',
      'Abolished slavery',
      'Signed the Emancipation Proclamation',
      'Preserved the Union'
    ],
    biography: '亚伯拉罕·林肯是美国第16任总统，也是首位共和党籍总统。在其总统任内，美国爆发了内战，史称南北战争。林肯击败了南方分离势力，废除了奴隶制度，维护了国家的统一。',
    biographyEn: 'Abraham Lincoln was the 16th US President and the first Republican President. He led the Union through the Civil War.',
    historicalBackground: '林肯任期内，美国面临着最严重的国家危机——南北战争，他的领导决定了这个国家的未来走向。',
    historicalBackgroundEn: 'Lincoln\'s presidency faced the nation\'s greatest crisis - the Civil War. His leadership shaped the country\'s future.',
    keyEvents: [
      { year: 1861, title: '内战爆发', titleEn: 'Civil War Began', description: '南方各州宣布脱离联邦', descriptionEn: 'Southern states seceded from the Union' },
      { year: 1863, title: '解放宣言', titleEn: 'Emancipation Proclamation', description: '签署《解放黑人奴隶宣言》', descriptionEn: 'Signed the Emancipation Proclamation' },
      { year: 1865, title: '内战结束', titleEn: 'Civil War Ended', description: '南方投降，内战结束', descriptionEn: 'South surrendered, Civil War ended' }
    ],
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 32,
    order: 32,
    name: '富兰克林·D·罗斯福',
    nameEn: 'Franklin D. Roosevelt',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/220px-FDR_1944_Color_Portrait.jpg',
    party: 'democratic',
    termStart: 1933,
    termEnd: 1945,
    vicePresident: '约翰·南斯·加纳 / 亨利·A·华莱士 / 哈里·S·杜鲁门',
    vicePresidentEn: 'John N. Garner / Henry A. Wallace / Harry S. Truman',
    birthDate: '1882-01-30',
    deathDate: '1945-04-12',
    birthPlace: '纽约州海德帕克',
    birthPlaceEn: 'Hyde Park, New York',
    education: '哈佛大学、哥伦比亚大学法学院',
    educationEn: 'Harvard University, Columbia Law School',
    achievements: [
      '实施新政应对大萧条',
      '领导美国度过二战',
      '建立社会保障体系',
      '推动建立联合国'
    ],
    achievementsEn: [
      'Implemented New Deal to fight the Great Depression',
      'Led US through WWII',
      'Established Social Security system',
      'Helped establish the United Nations'
    ],
    biography: '富兰克林·德拉诺·罗斯福是美国第32任总统，是美国历史上唯一连任超过两届的总统。在20世纪的经济大萧条和第二次世界大战中扮演了重要的角色。',
    biographyEn: 'Franklin D. Roosevelt was the 32nd US President and the only president to serve more than two terms.',
    historicalBackground: '罗斯福上台时，美国正经历历史上最严重的经济危机，他的新政改变了美国的社会和经济结构。',
    historicalBackgroundEn: 'Roosevelt took office during the worst economic crisis in US history. His New Deal transformed American society and economy.',
    keyEvents: [
      { year: 1933, title: '百日新政', titleEn: 'Hundred Days', description: '推出一系列新政措施', descriptionEn: 'Launched New Deal programs' },
      { year: 1941, title: '珍珠港事件', titleEn: 'Pearl Harbor', description: '日本偷袭珍珠港，美国参战', descriptionEn: 'Japan attacked Pearl Harbor, US entered WWII' }
    ],
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 35,
    order: 35,
    name: '约翰·F·肯尼迪',
    nameEn: 'John F. Kennedy',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/220px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg',
    party: 'democratic',
    termStart: 1961,
    termEnd: 1963,
    vicePresident: '林登·B·约翰逊',
    vicePresidentEn: 'Lyndon B. Johnson',
    birthDate: '1917-05-29',
    deathDate: '1963-11-22',
    birthPlace: '马萨诸塞州布鲁克莱恩',
    birthPlaceEn: 'Brookline, Massachusetts',
    education: '哈佛大学',
    educationEn: 'Harvard University',
    achievements: [
      '推动太空计划（阿波罗计划）',
      '处理古巴导弹危机',
      '推动民权立法',
      '建立和平队'
    ],
    achievementsEn: [
      'Pushed for space program (Apollo)',
      'Handled Cuban Missile Crisis',
      'Promoted civil rights legislation',
      'Established Peace Corps'
    ],
    biography: '约翰·菲茨杰拉德·肯尼迪是美国第35任总统。在他总统任内，发生了猪湾事件、古巴导弹危机、太空竞赛、越战的早期活动以及民权运动的兴起。',
    biographyEn: 'John F. Kennedy was the 35th US President. His presidency included the Bay of Pigs, Cuban Missile Crisis, and early Civil Rights Movement.',
    historicalBackground: '肯尼迪任期正值冷战高峰期，美苏之间的紧张关系达到顶峰。',
    historicalBackgroundEn: 'Kennedy\'s presidency came at the height of the Cold War, with peak US-Soviet tensions.',
    keyEvents: [
      { year: 1961, title: '猪湾事件', titleEn: 'Bay of Pigs', description: '古巴猪湾入侵失败', descriptionEn: 'Failed Bay of Pigs invasion' },
      { year: 1962, title: '古巴导弹危机', titleEn: 'Cuban Missile Crisis', description: '成功化解古巴导弹危机', descriptionEn: 'Successfully resolved Cuban Missile Crisis' }
    ],
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 40,
    order: 40,
    name: '罗纳德·里根',
    nameEn: 'Ronald Reagan',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/220px-Official_Portrait_of_President_Reagan_1981.jpg',
    party: 'republican',
    termStart: 1981,
    termEnd: 1989,
    vicePresident: '乔治·H·W·布什',
    vicePresidentEn: 'George H. W. Bush',
    birthDate: '1911-02-06',
    deathDate: '2004-06-05',
    birthPlace: '伊利诺伊州坦皮科',
    birthPlaceEn: 'Tampico, Illinois',
    education: '尤里卡学院',
    educationEn: 'Eureka College',
    achievements: [
      '推行里根经济学',
      '结束冷战',
      '加强美国军事力量',
      '推动减税改革'
    ],
    achievementsEn: [
      'Implemented Reaganomics',
      'Ended the Cold War',
      'Strengthened US military',
      'Pushed for tax cuts'
    ],
    biography: '罗纳德·威尔逊·里根是美国第40任总统。他的经济政策被称为里根经济学，主张通过减税、放宽政府管制来刺激经济增长。',
    biographyEn: 'Ronald Reagan was the 40th US President. His economic policies, known as Reaganomics, advocated tax cuts and deregulation.',
    historicalBackground: '里根任期是冷战的最后阶段，他的政策加速了苏联的解体。',
    historicalBackgroundEn: 'Reagan\'s presidency marked the final stage of the Cold War, his policies accelerated the Soviet Union\'s collapse.',
    keyEvents: [
      { year: 1981, title: '遇刺幸存', titleEn: 'Assassination Attempt', description: '遇刺受伤但幸存', descriptionEn: 'Survived assassination attempt' },
      { year: 1987, title: '柏林墙演说', titleEn: 'Tear Down This Wall', description: '在柏林墙前发表著名演说', descriptionEn: 'Famous speech at the Berlin Wall' }
    ],
    images: [],
    videos: [],
    relations: []
  },
  {
    id: 44,
    order: 44,
    name: '贝拉克·奥巴马',
    nameEn: 'Barack Obama',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg',
    party: 'democratic',
    termStart: 2009,
    termEnd: 2017,
    vicePresident: '乔·拜登',
    vicePresidentEn: 'Joe Biden',
    birthDate: '1961-08-04',
    deathDate: null,
    birthPlace: '夏威夷州檀香山',
    birthPlaceEn: 'Honolulu, Hawaii',
    education: '哥伦比亚大学、哈佛大学法学院',
    educationEn: 'Columbia University, Harvard Law School',
    achievements: [
      '美国历史上首位黑人总统',
      '推行奥巴马医改',
      '结束伊拉克战争',
      '推动清洁能源政策'
    ],
    achievementsEn: [
      'First African-American US President',
      'Implemented Obamacare',
      'Ended Iraq War',
      'Promoted clean energy policies'
    ],
    biography: '贝拉克·侯赛因·奥巴马是美国第44任总统，也是美国历史上首位非洲裔总统。他在2009年获得诺贝尔和平奖。',
    biographyEn: 'Barack Obama was the 44th US President and the first African-American President. He was awarded the Nobel Peace Prize in 2009.',
    historicalBackground: '奥巴马上台时，美国正经历金融危机和经济衰退，他的政策旨在恢复经济和推动社会改革。',
    historicalBackgroundEn: 'Obama took office during the financial crisis and recession. His policies aimed to restore the economy and push social reforms.',
    keyEvents: [
      { year: 2009, title: '经济刺激计划', titleEn: 'Stimulus Package', description: '签署7870亿美元经济刺激计划', descriptionEn: 'Signed $787 billion stimulus package' },
      { year: 2010, title: '医改法案', titleEn: 'Healthcare Reform', description: '签署《患者保护与平价医疗法案》', descriptionEn: 'Signed Affordable Care Act' }
    ],
    images: [],
    videos: [],
    relations: []
  }
]

export default presidents
