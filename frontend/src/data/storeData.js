export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  PKR: { symbol: 'Rs. ', rate: 278, label: 'PKR (₨)' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
};

export const PRODUCTS = [
  {
    id: 'serum-1-bottle',
    name: 'FOLLILUXE™ 1-Month Starter Pack',
    subtitle: '1x Advanced Peptide & Botanical Hair Serum (50ml)',
    tag: 'STARTER',
    bottlesCount: 1,
    supplyDays: '30 Days Supply',
    priceUSD: 2.88,
    originalPriceUSD: 4.32,
    discountPercent: 33,
    image: '/assets/hero-serum.jpg',
    popular: false,
    bestValue: false,
    freeGifts: [],
    features: [
      '1x 50ml (1.7 fl. oz) Glass Dropper Bottle',
      '3% Redensyl® + Procapil® Complex',
      'Targeted Scalp Follicle Nourishment',
      '60-Day Satisfaction Money-Back Guarantee',
      'Non-greasy, fast absorbing formula'
    ],
    rating: 4.8,
    reviewsCount: 1240,
    inStock: true,
    stockLeft: 23,
  },
  {
    id: 'serum-2-bottles',
    name: 'FOLLILUXE™ 2-Month Transformation Pack',
    subtitle: '2x Bottles + FREE Silicone Scalp Massager',
    tag: 'MOST POPULAR',
    bottlesCount: 2,
    supplyDays: '60 Days Supply',
    priceUSD: 3.60,
    originalPriceUSD: 6.47,
    discountPercent: 44,
    image: '/assets/bundle-set.jpg',
    popular: true,
    bestValue: false,
    freeGifts: ['FREE Jade Scalp Stimulator ($18 Value)', 'FREE Express Shipping'],
    features: [
      '2x 50ml Bottles (60 Days Daily Treatment)',
      'FREE Jade Silicone Scalp Massager ($18 Value)',
      'FREE Express Tracked Shipping',
      'Noticeable Density & Hairline Growth Phase',
      'Priority Customer Support',
      '60-Day Money-Back Guarantee'
    ],
    rating: 4.95,
    reviewsCount: 2840,
    inStock: true,
    stockLeft: 14,
  },
  {
    id: 'serum-3-bottles',
    name: 'FOLLILUXE™ 3-Month Clinical Regrowth Kit',
    subtitle: '3x Bottles + Deluxe Scalp Tool + Luxury Gift Box',
    tag: 'BEST VALUE - SAVE 50%',
    bottlesCount: 3,
    supplyDays: '90 Days Full Cycle',
    priceUSD: 4.68,
    originalPriceUSD: 7.91,
    discountPercent: 41,
    image: '/assets/bundle-set.jpg',
    popular: false,
    bestValue: true,
    freeGifts: [
      'FREE Scalp Stimulating Tool ($18 Value)',
      'FREE Rosemary Scalp Mist Sample ($12 Value)',
      'FREE Worldwide VIP Priority Shipping'
    ],
    features: [
      '3x 50ml Bottles (Complete 90-Day Clinical Cycle)',
      'FREE Ergonomic Scalp Massager Tool',
      'FREE Rosemary Follicle Mist Travel Size',
      'FREE VIP Tracked Express Delivery',
      'Maximum Hair Density & Root Reactivation',
      '100% Risk-Free 60-Day Full Refund Guarantee'
    ],
    rating: 5.0,
    reviewsCount: 3410,
    inStock: true,
    stockLeft: 7,
  }
];

export const INGREDIENTS = [
  {
    name: 'Redensyl® (3%)',
    badge: 'Patented Active',
    origin: 'Swiss Biotechnology',
    role: 'Stem Cell Follicle Reactivator',
    description: 'Clinically shown to stimulate hair follicle stem cells (ORSc) and increase hair growth by +214% compared to untreated roots in laboratory trials.',
    stat: '+214% Follicle Growth',
    icon: 'Sparkles'
  },
  {
    name: 'Anagain™ (Organic Pea Sprout)',
    badge: 'Award-Winning',
    origin: 'Organic Botanical Extract',
    role: 'Growth Cycle Extender',
    description: 'Derived from organic pea sprouts, AnaGain™ reactivates noggin and FGF-7 genes to extend the anagen (growth) phase of hair and dramatically reduce shedding.',
    stat: '85% Reduced Hair Loss',
    icon: 'Leaf'
  },
  {
    name: 'Procapil® (2%)',
    badge: 'Clinical DHT Blocker',
    origin: 'Biotinyl-GHK & Citrus Flavonoids',
    role: 'Root Anchoring & DHT Defense',
    description: 'Fights hair follicle aging and anchors the hair bulb securely into the scalp dermis while neutralizing localized DHT enzyme buildup around roots.',
    stat: '+46% Stronger Root Anchor',
    icon: 'ShieldCheck'
  },
  {
    name: 'Copper Tripeptide-1 (GHK-Cu)',
    badge: 'Cellular Repair',
    origin: 'Bio-Identical Peptide',
    role: 'Micro-Circulation & Collagen',
    description: 'Stimulates scalp micro-vascularization, increases hair follicle size, and boosts collagen synthesis around miniaturized hair roots for thicker strand diameter.',
    stat: '+33% Thicker Hair Strands',
    icon: 'Zap'
  },
  {
    name: 'Pure Rosemary Extract & Biotin',
    badge: 'Pure Botanicals',
    origin: 'Mediterranean Rosemary Leaf',
    role: 'Natural Scalp Oxygenation',
    description: 'Matches the efficacy of standard chemical treatments without itching or irritation, calming scalp inflammation and feeding pure vitamin B7 into keratin matrices.',
    stat: '100% Drug-Free & Gentle',
    icon: 'Flame'
  }
];

export const BEFORE_AFTER_CASES = [
  {
    id: 1,
    name: 'Hamza A. (32 yrs)',
    location: 'Lahore, Pakistan',
    duration: '90 Days Result',
    concern: 'Crown Thinning & Widening Part',
    rating: 5,
    verified: true,
    review: 'I was skeptical because other serums made my scalp greasy. FOLLILUXE absorbed in 2 minutes, and by week 7 my crown started filling with dense dark baby hairs. At Day 90, the difference is night and day!',
    beforeImage: '/assets/crown-before.jpg',
    afterImage: '/assets/crown-after.jpg',
    bundleUsed: '3-Month Clinical Regrowth Kit'
  },
  {
    id: 2,
    name: 'Jessica M. (29 yrs)',
    location: 'New York, USA',
    duration: '60 Days Result',
    concern: 'Postpartum Hair Shedding & Temple Loss',
    rating: 5,
    verified: true,
    review: 'After having my baby, clumps of hair were falling in the shower. This serum stopped the shedding within 3 weeks and filled my front temples back in. I use it every single night with the scalp massager!',
    beforeImage: '/assets/crown-before.jpg',
    afterImage: '/assets/crown-after.jpg',
    bundleUsed: '2-Month Transformation Pack'
  },
  {
    id: 3,
    name: 'Tariq K. (38 yrs)',
    location: 'Dubai, UAE',
    duration: '90 Days Result',
    concern: 'Receding Frontal Hairline',
    rating: 5,
    verified: true,
    review: 'Zero side effects, clean botanical smell, and real visible hair density. Highly recommended to anyone who wants natural clinical results without chemicals.',
    beforeImage: '/assets/crown-before.jpg',
    afterImage: '/assets/crown-after.jpg',
    bundleUsed: '3-Month Clinical Regrowth Kit'
  }
];


export const REVIEWS = [
  {
    id: 1,
    author: 'Dr. Ayesha Malik',
    role: 'Verified Dermatologist & Buyer',
    location: 'Islamabad',
    rating: 5,
    date: '2 days ago',
    title: 'Remarkable formulation with zero irritation',
    content: 'As a dermatologist, I thoroughly reviewed the active percentage of Redensyl and Procapil in FOLLILUXE. It provides clinical-grade peptide delivery without harsh alcohol solvents. My personal hair density improved by 35% in 8 weeks.',
    verified: true,
    helpful: 142,
    bundle: '3-Month Clinical Regrowth Kit',
    avatar: 'AM'
  },
  {
    id: 2,
    author: 'Zainab Qureshi',
    role: 'Verified Buyer',
    location: 'Karachi',
    rating: 5,
    date: '4 days ago',
    title: 'My hair stopped falling out in 14 days!',
    content: 'I had severe stress-induced shedding. Literally after 2 weeks of using 1 dropper every evening, shower drain hair loss dropped by almost 80%. Now I have so many baby hairs standing up!',
    verified: true,
    helpful: 98,
    bundle: '2-Month Transformation Pack',
    avatar: 'ZQ'
  },
  {
    id: 3,
    author: 'Marcus Vance',
    role: 'Verified Buyer',
    location: 'London, UK',
    rating: 5,
    date: '1 week ago',
    title: 'Better than prescription alternatives with zero sides',
    content: 'I had bad reactions to minoxidil before. FOLLILUXE has given me identical or even better regrowth along the hairline with zero itching and no greasy buildup. 10/10.',
    verified: true,
    helpful: 85,
    bundle: '3-Month Clinical Regrowth Kit',
    avatar: 'MV'
  },
  {
    id: 4,
    author: 'Bilal Ahmed',
    role: 'Verified Buyer',
    location: 'Rawalpindi',
    rating: 5,
    date: '1 week ago',
    title: 'Cash on delivery was fast and the product is 100% genuine',
    content: 'Received parcel in 2 days. The amber glass bottle and jade scalp massager feel super premium. 1 month in and my barber asked me what product I started using because my crown is visibly thicker.',
    verified: true,
    helpful: 67,
    bundle: '2-Month Transformation Pack',
    avatar: 'BA'
  },
  {
    id: 5,
    author: 'Elena Rostova',
    role: 'Verified Buyer',
    location: 'Toronto, Canada',
    rating: 5,
    date: '2 weeks ago',
    title: 'Super lightweight and smells like fresh herbs',
    content: 'Unlike heavy castor or rosemary oils that make your hair look unwashed, this water-light serum absorbs in 60 seconds without disturbing my blowouts. Love it!',
    verified: true,
    helpful: 52,
    bundle: '1-Month Starter Pack',
    avatar: 'ER'
  },
  {
    id: 6,
    author: 'Hamza Tariq',
    role: 'Verified Buyer',
    location: 'Lahore, Pakistan',
    rating: 5,
    date: '3 weeks ago',
    title: 'Crown thinning completely covered after 90 days',
    content: 'I ordered the 3-Month Clinical Kit with cash on delivery. By month 2, fine baby hairs started filling in my crown. Today my scalp is completely dense and covered. Outstanding Swiss formula!',
    verified: true,
    helpful: 114,
    bundle: '3-Month Clinical Regrowth Kit',
    avatar: 'HT'
  },
  {
    id: 7,
    author: 'Sarah Jenkins',
    role: 'Verified Buyer',
    location: 'Manchester, UK',
    rating: 5,
    date: '1 month ago',
    title: 'Stopped postpartum shedding dead in its tracks',
    content: 'Postpartum hair loss made me cry every time I brushed my hair. FOLLILUXE reduced shedding by 80% within 3 weeks. My hairline has completely filled back in. Cannot recommend it enough!',
    verified: true,
    helpful: 92,
    bundle: '2-Month Transformation Pack',
    avatar: 'SJ'
  },
  {
    id: 8,
    author: 'Danial Raza',
    role: 'Verified Buyer',
    location: 'Islamabad, Pakistan',
    rating: 5,
    date: '1 month ago',
    title: 'Zero side effects, real results without Minoxidil',
    content: 'I had heart palpitations and severe scalp itch with 5% Minoxidil in the past. Switched to FOLLILUXE and had zero irritation with even better density gains. The jade scalp tool is also fantastic.',
    verified: true,
    helpful: 78,
    bundle: '3-Month Clinical Regrowth Kit',
    avatar: 'DR'
  }
];

export const FAQS = [
  {
    category: 'Results & Timeline',
    q: 'How long before I see noticeable new hair growth?',
    a: 'Most users experience a dramatic reduction in hair shedding within 14–21 days. Noticeable new baby hairs and visible follicle density improvements typically appear between weeks 6 to 8, with full clinical transformation visible at 90 days (1 full hair growth cycle).'
  },
  {
    category: 'Application & Routine',
    q: 'How do I apply the serum and do I need to wash it out?',
    a: 'Apply 1 to 2 full pipettes (1ml) directly onto your scalp in thinning or target areas once daily (morning or night). Gently massage in circular motions for 2-3 minutes. Do NOT wash it out — it is a leave-in, fast-absorbing, non-greasy formula.'
  },
  {
    category: 'Safety & Side Effects',
    q: 'Is FOLLILUXE safe for both women and men? Does it cause shedding or side effects?',
    a: 'Yes, FOLLILUXE is 100% drug-free, hormone-free, vegan, and formulated for all genders and all hair types (including color-treated, chemically treated, or sensitive scalps). It does not cause the dread shedding or unwanted facial hair associated with synthetic drugs.'
  },
  {
    category: 'Ingredients & Science',
    q: 'What makes FOLLILUXE different from regular rosemary oil?',
    a: 'While pure oils sit on the scalp surface and can clog follicles, FOLLILUXE combines micro-encapsulated Swiss Redensyl® (3%), Anagain™, Procapil® and Copper Tripeptides with Rosemary extract in a water-based cellular delivery system that penetrates straight to the follicle bulb.'
  },
  {
    category: 'Shipping & Guarantee',
    q: 'What is your 60-Day Money-Back Guarantee and Shipping time?',
    a: 'We offer an unconditional 60-day money-back guarantee. If you use the serum as directed and are not satisfied with your results, simply contact our support team for a full refund. Orders ship with express 2-3 day tracked delivery (with Cash on Delivery available in supported regions).'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'What is your primary hair concern?',
    subtitle: 'Select the primary area you want to restore',
    options: [
      { text: 'Receding Hairline & Temples', score: 'hairline', icon: 'User' },
      { text: 'Thinning Crown & Visible Scalp', score: 'crown', icon: 'Sparkles' },
      { text: 'Excessive Daily Shedding / Hair Loss', score: 'shedding', icon: 'Flame' },
      { text: 'Overall Low Density & Thin Fine Strands', score: 'density', icon: 'Leaf' }
    ]
  },
  {
    id: 2,
    title: 'How long have you noticed this hair thinning?',
    subtitle: 'Helps us determine the reactivation stage of your follicles',
    options: [
      { text: 'Less than 6 months (Recent onset / Postpartum / Stress)', duration: 'mild' },
      { text: '6 to 12 months (Noticeable gradual thinning)', duration: 'moderate' },
      { text: '1 to 3 years (Established thinning pattern)', duration: 'advanced' },
      { text: '3+ years (Longstanding hair loss)', duration: 'chronic' }
    ]
  },
  {
    id: 3,
    title: 'How would you describe your scalp type?',
    subtitle: 'Helps customize your application routine',
    options: [
      { text: 'Normal / Balanced Scalp', type: 'normal' },
      { text: 'Oily Scalp (Needs washing daily/every other day)', type: 'oily' },
      { text: 'Dry, Flaky or Sensitive Scalp', type: 'dry' },
      { text: 'Itchy or Easily Irritated Scalp', type: 'sensitive' }
    ]
  },
  {
    id: 4,
    title: 'Have you tried other hair treatments before?',
    subtitle: 'Select all that apply',
    options: [
      { text: 'Natural Oils (Rosemary, Castor, Coconut)', experience: 'oils' },
      { text: 'Biotin Supplements / Multivitamins', experience: 'supplements' },
      { text: 'Chemical treatments (Minoxidil / Finasteride)', experience: 'medical' },
      { text: 'None yet, this will be my first targeted serum', experience: 'new' }
    ]
  }
];
