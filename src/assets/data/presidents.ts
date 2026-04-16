import type { President } from '@/types/president'

export const presidents: President[] = [
  {
    id: 1,
    name: '乔治·华盛顿',
    nameEn: 'George Washington',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/330px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
    party: '无党派',
    partyEn: 'Independent',
    termStart: 1789,
    termEnd: 1797,
    term: '第1任',
    termEn: '1st President',
    birthDate: '1732-02-22',
    deathDate: '1799-12-14',
    birthPlace: '弗吉尼亚州威斯特摩兰县',
    birthPlaceEn: 'Westmoreland County, Virginia',
    vicePresident: '约翰·亚当斯',
    vicePresidentEn: 'John Adams',
    achievements: [
      '领导美国独立战争取得胜利',
      '主持制定美国宪法',
      '担任美国第一任总统',
      '确立了总统任期不超过两届的传统'
    ],
    achievementsEn: [
      'Led the American victory in the Revolutionary War',
      'Presided over the drafting of the U.S. Constitution',
      'Served as the first President of the United States',
      'Established the tradition of a two-term presidency'
    ],
    biography: '乔治·华盛顿是美国政治家、军事家、革命家，首任总统，美国开国元勋之一。他在美国独立战争中任大陆军总司令，带领美国人民摆脱了英国的殖民统治，赢得了国家独立。1787年主持了制宪会议，制定了现在的美国宪法。1789年，他经过全体选举团无异议的支持而成为美国第一任总统。他在两届的任期中设立了许多持续到今天的政策和传统。在两届任期结束后，他自愿放弃权力不再谋求续任。',
    biographyEn: 'George Washington was an American politician, military general, and revolutionary leader who served as the first president of the United States from 1789 to 1797. He commanded the Continental Army during the American Revolutionary War, securing American independence from Great Britain. He presided over the Constitutional Convention of 1787 that created the U.S. Constitution. Washington was unanimously elected president by the Electoral College in the first two national elections. He established many precedents for the presidency, including the two-term tradition.',
    keyEvents: [
      { year: 1775, event: '被任命为大陆军总司令', eventEn: 'Appointed Commander-in-Chief of the Continental Army' },
      { year: 1776, event: '发表《独立宣言》', eventEn: 'Declaration of Independence adopted' },
      { year: 1781, event: '约克镇战役胜利', eventEn: 'Victory at the Battle of Yorktown' },
      { year: 1789, event: '就任第一任美国总统', eventEn: 'Inaugurated as first U.S. President' },
      { year: 1797, event: '卸任总统，回归田园生活', eventEn: 'Retired from presidency, returned to Mount Vernon' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/800px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg'
    ],
    videos: [],
    relations: [
      { id: 2, name: '约翰·亚当斯', nameEn: 'John Adams', relation: '副总统', relationEn: 'Vice President' },
      { id: 3, name: '托马斯·杰斐逊', nameEn: 'Thomas Jefferson', relation: '国务卿', relationEn: 'Secretary of State' }
    ]
  },
  {
    id: 2,
    name: '约翰·亚当斯',
    nameEn: 'John Adams',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/John_Adams%2C_by_Gilbert_Stuart%2C_c1800_2.jpg/330px-John_Adams%2C_by_Gilbert_Stuart%2C_c1800_2.jpg',
    party: '联邦党',
    partyEn: 'Federalist',
    termStart: 1797,
    termEnd: 1801,
    term: '第2任',
    termEn: '2nd President',
    birthDate: '1735-10-30',
    deathDate: '1826-07-04',
    birthPlace: '马萨诸塞州布伦特里',
    birthPlaceEn: 'Braintree, Massachusetts',
    vicePresident: '托马斯·杰斐逊',
    vicePresidentEn: 'Thomas Jefferson',
    achievements: [
      '《独立宣言》起草人之一',
      '美国第一任副总统',
      '成功避免与法国开战',
      '任命约翰·马歇尔为首席大法官'
    ],
    achievementsEn: [
      'One of the drafters of the Declaration of Independence',
      'First Vice President of the United States',
      'Successfully avoided war with France',
      'Appointed John Marshall as Chief Justice'
    ],
    biography: '约翰·亚当斯是美国第一任副总统，其后接替乔治·华盛顿成为美国第二任总统。他是《独立宣言》的签署者之一，被美国人视为最重要的开国元勋之一。他在任期间的主要成就是成功避免了与法国的战争，保持了美国的中立地位。他的儿子约翰·昆西·亚当斯是美国第六任总统。',
    biographyEn: 'John Adams was an American statesman, attorney, diplomat, writer, and Founding Father who served as the second president of the United States from 1797 to 1801. He was the first vice president of the United States. Adams was a dedicated patriot and one of the signers of the Declaration of Independence. During his presidency, he successfully avoided war with France despite significant political pressure. His son, John Quincy Adams, later became the 6th U.S. President.',
    keyEvents: [
      { year: 1776, event: '签署《独立宣言》', eventEn: 'Signed the Declaration of Independence' },
      { year: 1789, event: '就任第一任副总统', eventEn: 'Inaugurated as first Vice President' },
      { year: 1797, event: '就任第二任美国总统', eventEn: 'Inaugurated as 2nd U.S. President' },
      { year: 1798, event: '签署《外侨和煽动叛乱法》', eventEn: 'Signed the Alien and Sedition Acts' },
      { year: 1801, event: '卸任总统', eventEn: 'Left office after losing re-election' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/John_Adams%2C_by_Gilbert_Stuart%2C_c1800_2.jpg/800px-John_Adams%2C_by_Gilbert_Stuart%2C_c1800_2.jpg'
    ],
    videos: [],
    relations: [
      { id: 1, name: '乔治·华盛顿', nameEn: 'George Washington', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 3, name: '托马斯·杰斐逊', nameEn: 'Thomas Jefferson', relation: '副总统', relationEn: 'Vice President' }
    ]
  },
  {
    id: 3,
    name: '托马斯·杰斐逊',
    nameEn: 'Thomas Jefferson',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg/330px-Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg',
    party: '民主共和党',
    partyEn: 'Democratic-Republican',
    termStart: 1801,
    termEnd: 1809,
    term: '第3任',
    termEn: '3rd President',
    birthDate: '1743-04-13',
    deathDate: '1826-07-04',
    birthPlace: '弗吉尼亚州夏德韦尔',
    birthPlaceEn: 'Shadwell, Virginia',
    vicePresident: '艾伦·伯尔 / 乔治·克林顿',
    vicePresidentEn: 'Aaron Burr / George Clinton',
    achievements: [
      '《独立宣言》主要起草人',
      '从法国手中购买路易斯安那领地',
      '创立弗吉尼亚大学',
      '推动美国向西扩张'
    ],
    achievementsEn: [
      'Principal author of the Declaration of Independence',
      'Purchased the Louisiana Territory from France',
      'Founded the University of Virginia',
      'Promoted westward expansion of the United States'
    ],
    biography: '托马斯·杰斐逊是美国第三任总统，同时也是《美国独立宣言》主要起草人，美国开国元勋之一。他在任期间的主要成就包括从法国手中购买了路易斯安那领地，使美国领土面积几乎扩大了一倍。他还推行了许多民主改革，主张宗教自由和教育普及。杰斐逊是美国历史上最具影响力的总统之一，他的思想对美国的发展产生了深远影响。',
    biographyEn: 'Thomas Jefferson was an American statesman, diplomat, lawyer, architect, philosopher, and Founding Father who served as the third president of the United States from 1801 to 1809. He was the primary author of the Declaration of Independence. During his presidency, Jefferson doubled the size of the United States through the Louisiana Purchase from France in 1803. He was a strong advocate for democracy, republicanism, and individual rights, which motivated American colonists to break from Great Britain and form a new nation.',
    keyEvents: [
      { year: 1776, event: '起草《独立宣言》', eventEn: 'Drafted the Declaration of Independence' },
      { year: 1801, event: '就任第三任美国总统', eventEn: 'Inaugurated as 3rd U.S. President' },
      { year: 1803, event: '路易斯安那购地', eventEn: 'Louisiana Purchase completed' },
      { year: 1804, event: '派遣刘易斯和克拉克探险队', eventEn: 'Launched Lewis and Clark Expedition' },
      { year: 1809, event: '卸任总统', eventEn: 'Retired from presidency' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg/800px-Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg'
    ],
    videos: [],
    relations: [
      { id: 2, name: '约翰·亚当斯', nameEn: 'John Adams', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 4, name: '詹姆斯·麦迪逊', nameEn: 'James Madison', relation: '国务卿', relationEn: 'Secretary of State' }
    ]
  },
  {
    id: 16,
    name: '亚伯拉罕·林肯',
    nameEn: 'Abraham Lincoln',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/330px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    party: '共和党',
    partyEn: 'Republican',
    termStart: 1861,
    termEnd: 1865,
    term: '第16任',
    termEn: '16th President',
    birthDate: '1809-02-12',
    deathDate: '1865-04-15',
    birthPlace: '肯塔基州霍金维尔',
    birthPlaceEn: 'Hodgenville, Kentucky',
    vicePresident: '汉尼巴尔·哈姆林 / 安德鲁·约翰逊',
    vicePresidentEn: 'Hannibal Hamlin / Andrew Johnson',
    achievements: [
      '领导北方取得南北战争胜利',
      '废除奴隶制',
      '签署《宅地法》',
      '维护美国联邦统一'
    ],
    achievementsEn: [
      'Led the Union to victory in the Civil War',
      'Abolished slavery in the United States',
      'Signed the Homestead Act',
      'Preserved the Union during the secession crisis'
    ],
    biography: '亚伯拉罕·林肯是美国第16任总统，任期从1861年3月直至1865年4月遇刺身亡。林肯领导了美国南北战争，废除了奴隶制，维护了国家的统一，为美国的发展奠定了坚实的基础。他颁布的《解放黑人奴隶宣言》标志着美国废除奴隶制的正式开始，对美国历史产生了深远影响。林肯被广泛认为是美国历史上最伟大的总统之一。',
    biographyEn: 'Abraham Lincoln was an American lawyer, politician, and statesman who served as the 16th president of the United States from 1861 until his assassination in 1865. Lincoln led the Union through the American Civil War to defend the nation as a constitutional union and succeeded in abolishing slavery, bolstering the federal government, and modernizing the U.S. economy. His Emancipation Proclamation in 1863 paved the way for the abolition of slavery, and his Gettysburg Address became one of the most famous speeches in American history.',
    keyEvents: [
      { year: 1860, event: '当选美国总统', eventEn: 'Elected as U.S. President' },
      { year: 1861, event: '南北战争爆发', eventEn: 'Civil War begins' },
      { year: 1863, event: '颁布《解放黑人奴隶宣言》', eventEn: 'Issued Emancipation Proclamation' },
      { year: 1863, event: '发表葛底斯堡演说', eventEn: 'Delivered Gettysburg Address' },
      { year: 1865, event: '南北战争结束，林肯遇刺', eventEn: 'Civil War ends, Lincoln assassinated' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/800px-Abraham_Lincoln_O-77_matte_collodion_print.jpg'
    ],
    videos: [],
    relations: [
      { id: 15, name: '詹姆斯·布坎南', nameEn: 'James Buchanan', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 17, name: '安德鲁·约翰逊', nameEn: 'Andrew Johnson', relation: '副总统', relationEn: 'Vice President' }
    ]
  },
  {
    id: 32,
    name: '富兰克林·D·罗斯福',
    nameEn: 'Franklin D. Roosevelt',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/330px-FDR_1944_Color_Portrait.jpg',
    party: '民主党',
    partyEn: 'Democratic',
    termStart: 1933,
    termEnd: 1945,
    term: '第32任',
    termEn: '32nd President',
    birthDate: '1882-01-30',
    deathDate: '1945-04-12',
    birthPlace: '纽约州海德公园',
    birthPlaceEn: 'Hyde Park, New York',
    vicePresident: '约翰·南斯·加纳 / 亨利·A·华莱士 / 哈里·S·杜鲁门',
    vicePresidentEn: 'John Nance Garner / Henry A. Wallace / Harry S. Truman',
    achievements: [
      '推行罗斯福新政，克服大萧条',
      '领导美国赢得第二次世界大战',
      '建立社会保障体系',
      '推动联合国成立'
    ],
    achievementsEn: [
      'Implemented the New Deal to combat the Great Depression',
      'Led the United States to victory in World War II',
      'Established the U.S. Social Security system',
      'Helped found the United Nations'
    ],
    biography: '富兰克林·D·罗斯福是美国第32任总统，也是美国历史上唯一连任超过两届的总统，总共任职四届。他在1930年代经济大萧条期间推行新政以提供失业救济与复苏经济，并成立众多机构来改革经济和银行体系，从经济危机的深渊中挽救了美国。第二次世界大战爆发后，他力主对轴心国宣战，并领导美国取得了二战的胜利。他对美国和世界历史产生了极为深远的影响。',
    biographyEn: 'Franklin Delano Roosevelt, often referred to as FDR, was an American politician and attorney who served as the 32nd president of the United States from 1933 until his death in 1945. He is the only U.S. president to have served more than two terms. During the Great Depression, he implemented the New Deal to provide relief, recovery, and reform to the U.S. economy. After the attack on Pearl Harbor in 1941, he led the United States through World War II, working closely with Allied leaders to defeat the Axis powers. His presidency saw the establishment of many social welfare programs and the growth of federal power.',
    keyEvents: [
      { year: 1933, event: '就任总统，推行新政', eventEn: 'Inaugurated as President, launches New Deal' },
      { year: 1935, event: '签署《社会保障法》', eventEn: 'Signed the Social Security Act' },
      { year: 1941, event: '珍珠港事件后对日本宣战', eventEn: 'Declared war on Japan after Pearl Harbor attack' },
      { year: 1944, event: '参与创建联合国', eventEn: 'Helped establish the United Nations' },
      { year: 1945, event: '在任内去世', eventEn: 'Died in office near the end of WWII' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/800px-FDR_1944_Color_Portrait.jpg'
    ],
    videos: [],
    relations: [
      { id: 31, name: '赫伯特·胡佛', nameEn: 'Herbert Hoover', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 33, name: '哈里·S·杜鲁门', nameEn: 'Harry S. Truman', relation: '副总统', relationEn: 'Vice President' }
    ]
  },
  {
    id: 44,
    name: '贝拉克·奥巴马',
    nameEn: 'Barack Obama',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
    party: '民主党',
    partyEn: 'Democratic',
    termStart: 2009,
    termEnd: 2017,
    term: '第44任',
    termEn: '44th President',
    birthDate: '1961-08-04',
    deathDate: '',
    birthPlace: '夏威夷州火奴鲁鲁',
    birthPlaceEn: 'Honolulu, Hawaii',
    vicePresident: '乔·拜登',
    vicePresidentEn: 'Joe Biden',
    achievements: [
      '美国历史上首位非洲裔总统',
      '推出奥巴马医改法案',
      '推动同性婚姻合法化',
      '签署《巴黎协定》应对气候变化'
    ],
    achievementsEn: [
      'First African-American President of the United States',
      'Implemented the Affordable Care Act (Obamacare)',
      'Supported the legalization of same-sex marriage',
      'Signed the Paris Agreement on climate change'
    ],
    biography: '贝拉克·侯赛因·奥巴马是美国第44任总统，也是美国历史上首位非洲裔总统。他在任期间推行了医疗改革，使数千万没有医保的美国人获得了医疗保险。他还推动了清洁能源政策，签署了《巴黎气候协定》。在社会政策方面，他支持同性婚姻合法化，推动了美国社会的进步。奥巴马在任期间深受美国民众欢迎，他的执政理念对美国社会产生了重要影响。',
    biographyEn: 'Barack Hussein Obama II is an American politician who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, he was the first African-American president of the United States. During his presidency, he signed the Affordable Care Act (commonly called Obamacare), which expanded health insurance coverage to millions of Americans. He also implemented policies to combat climate change, including the Clean Power Plan, and supported the legalization of same-sex marriage nationwide.',
    keyEvents: [
      { year: 2008, event: '当选美国总统', eventEn: 'Elected as U.S. President' },
      { year: 2010, event: '签署平价医疗法案', eventEn: 'Signed the Affordable Care Act' },
      { year: 2011, event: '美军击毙本·拉登', eventEn: 'Ordered operation that killed Osama bin Laden' },
      { year: 2015, event: '推动同性婚姻在全美合法化', eventEn: 'Same-sex marriage legalized nationwide' },
      { year: 2017, event: '卸任总统', eventEn: 'Ended two terms as president' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/800px-President_Barack_Obama.jpg'
    ],
    videos: [],
    relations: [
      { id: 43, name: '乔治·W·布什', nameEn: 'George W. Bush', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 46, name: '乔·拜登', nameEn: 'Joe Biden', relation: '副总统', relationEn: 'Vice President' }
    ]
  },
  {
    id: 45,
    name: '唐纳德·特朗普',
    nameEn: 'Donald Trump',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/330px-Donald_Trump_official_portrait.jpg',
    party: '共和党',
    partyEn: 'Republican',
    termStart: 2017,
    termEnd: 2021,
    term: '第45任',
    termEn: '45th President',
    birthDate: '1946-06-14',
    deathDate: '',
    birthPlace: '纽约州纽约市',
    birthPlaceEn: 'New York City, New York',
    vicePresident: '迈克·彭斯',
    vicePresidentEn: 'Mike Pence',
    achievements: [
      '推行减税政策',
      '推动美国优先政策',
      '促进经济增长',
      '推动中东和平协议'
    ],
    achievementsEn: [
      'Implemented major tax reform and cuts',
      'Promoted "America First" policies',
      'Presided over strong economic growth pre-pandemic',
      'Brokered Abraham Accords in the Middle East'
    ],
    biography: '唐纳德·特朗普是美国第45任总统，此前他是知名的企业家和电视名人。他在任期间推行了减税政策，改革了税收体系，促进了美国经济增长。他奉行"美国优先"的政策，在贸易、移民等问题上采取了强硬立场。他是美国历史上最具争议的总统之一，在社交媒体上非常活跃，经常直接与公众沟通。2021年卸任后，他仍然在美国政坛保持着重要影响力。',
    biographyEn: 'Donald John Trump is an American politician, media personality, and businessman who served as the 45th president of the United States from 2017 to 2021. Before entering politics, he was a real estate developer and reality television personality. During his presidency, he implemented major tax cuts, deregulated many industries, and pursued an "America First" foreign policy agenda. His presidency was marked by significant polarization and controversy, including his first impeachment in 2019 and his role in the January 6, 2021 United States Capitol attack.',
    keyEvents: [
      { year: 2016, event: '当选美国总统', eventEn: 'Elected as U.S. President' },
      { year: 2017, event: '签署减税和就业法案', eventEn: 'Signed the Tax Cuts and Jobs Act' },
      { year: 2020, event: '新冠肺炎疫情爆发', eventEn: 'COVID-19 pandemic began' },
      { year: 2020, event: '在大选中败给拜登', eventEn: 'Lost re-election to Joe Biden' },
      { year: 2021, event: '卸任总统', eventEn: 'Left office' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/800px-Donald_Trump_official_portrait.jpg'
    ],
    videos: [],
    relations: [
      { id: 44, name: '贝拉克·奥巴马', nameEn: 'Barack Obama', relation: '前任总统', relationEn: 'Preceding President' },
      { id: 46, name: '乔·拜登', nameEn: 'Joe Biden', relation: '继任总统', relationEn: 'Successor President' }
    ]
  },
  {
    id: 46,
    name: '乔·拜登',
    nameEn: 'Joe Biden',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/330px-Joe_Biden_presidential_portrait.jpg',
    party: '民主党',
    partyEn: 'Democratic',
    termStart: 2021,
    termEnd: 2025,
    term: '第46任',
    termEn: '46th President',
    birthDate: '1942-11-20',
    deathDate: '',
    birthPlace: '宾夕法尼亚州斯克兰顿',
    birthPlaceEn: 'Scranton, Pennsylvania',
    vicePresident: '卡玛拉·哈里斯',
    vicePresidentEn: 'Kamala Harris',
    achievements: [
      '推动新冠疫苗接种计划',
      '签署基础设施投资法案',
      '推动清洁能源政策',
      '应对气候变化'
    ],
    achievementsEn: [
      'Implemented national COVID-19 vaccination program',
      'Signed the Infrastructure Investment and Jobs Act',
      'Promoted clean energy policies',
      'Advanced climate change initiatives'
    ],
    biography: '乔·拜登是美国第46任总统，此前他曾担任奥巴马政府的副总统，并且有长达36年的联邦参议员经历。他在2020年总统大选中击败特朗普，成为美国历史上年龄最大的当选总统。上任后，他积极推动新冠疫苗接种，签署了大规模基础设施法案，计划投资超过1万亿美元改善美国的基础设施。他还积极推动清洁能源和应对气候变化的政策，重新加入了《巴黎气候协定》。拜登目前正在寻求2024年总统连任。',
    biographyEn: 'Joseph Robinette Biden Jr. is an American politician who is the 46th and current president of the United States. A member of the Democratic Party, he previously served as the 47th vice president from 2009 to 2017 under President Barack Obama, and represented Delaware in the United States Senate from 1973 to 2009. At 78 years old when he took office, he is the oldest person to serve as U.S. president. His presidency has focused on addressing the COVID-19 pandemic, economic recovery, infrastructure investment, climate change, and expanding access to healthcare.',
    keyEvents: [
      { year: 2020, event: '当选美国总统', eventEn: 'Elected as U.S. President' },
      { year: 2021, event: '就任总统，推动疫苗接种', eventEn: 'Inaugurated as President, launched vaccine rollout' },
      { year: 2021, event: '签署1.2万亿美元基础设施法案', eventEn: 'Signed $1.2 trillion infrastructure bill' },
      { year: 2022, event: '签署通胀削减法案', eventEn: 'Signed the Inflation Reduction Act' },
      { year: 2024, event: '宣布寻求连任', eventEn: 'Announced candidacy for re-election' }
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/800px-Joe_Biden_presidential_portrait.jpg'
    ],
    videos: [],
    relations: [
      { id: 44, name: '贝拉克·奥巴马', nameEn: 'Barack Obama', relation: '前上司', relationEn: 'Former President he served under' },
      { id: 45, name: '唐纳德·特朗普', nameEn: 'Donald Trump', relation: '前任总统', relationEn: 'Preceding President' }
    ]
  }
]
