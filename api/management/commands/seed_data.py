from django.core.management.base import BaseCommand
from api.models import (
    ProductBundle,
    Review,
    FAQ,
    BlogArticle,
    ActiveIngredient,
    BeforeAfterCase
)

class Command(BaseCommand):
    help = 'Seeds initial data for FOLLILUXE project into PostgreSQL'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding initial data into PostgreSQL...')

        # 1. Product Bundles
        products_data = [
            {
                'slug': 'serum-1-bottle',
                'name': 'FOLLILUXE™ 1-Month Starter Pack',
                'subtitle': '1x Advanced Peptide & Botanical Hair Serum (50ml)',
                'tag': 'STARTER',
                'bottles_count': 1,
                'supply_days': '30 Days Supply',
                'price_usd': 49.00,
                'original_price_usd': 70.00,
                'discount_percent': 30,
                'image': '/assets/hero-serum.jpg',
                'popular': False,
                'best_value': False,
                'free_gifts': [],
                'features': [
                    '1x 50ml (1.7 fl. oz) Glass Dropper Bottle',
                    '3% Redensyl® + Procapil® Complex',
                    'Targeted Scalp Follicle Nourishment',
                    '60-Day Satisfaction Money-Back Guarantee',
                    'Non-greasy, fast absorbing formula'
                ],
                'rating': 4.8,
                'reviews_count': 1240,
                'in_stock': True,
                'stock_left': 23,
                'display_order': 1
            },
            {
                'slug': 'serum-2-bottles',
                'name': 'FOLLILUXE™ 2-Month Transformation Pack',
                'subtitle': '2x Bottles + FREE Silicone Scalp Massager',
                'tag': 'MOST POPULAR',
                'bottles_count': 2,
                'supply_days': '60 Days Supply',
                'price_usd': 79.00,
                'original_price_usd': 140.00,
                'discount_percent': 44,
                'image': '/assets/bundle-set.jpg',
                'popular': True,
                'best_value': False,
                'free_gifts': ['FREE Jade Scalp Stimulator ($18 Value)', 'FREE Express Shipping'],
                'features': [
                    '2x 50ml Bottles (60 Days Daily Treatment)',
                    'FREE Jade Silicone Scalp Massager ($18 Value)',
                    'FREE Express Tracked Shipping',
                    'Noticeable Density & Hairline Growth Phase',
                    'Priority Customer Support',
                    '60-Day Money-Back Guarantee'
                ],
                'rating': 4.95,
                'reviews_count': 2840,
                'in_stock': True,
                'stock_left': 14,
                'display_order': 2
            },
            {
                'slug': 'serum-3-bottles',
                'name': 'FOLLILUXE™ 3-Month Clinical Regrowth Kit',
                'subtitle': '3x Bottles + Deluxe Scalp Tool + Luxury Gift Box',
                'tag': 'BEST VALUE - SAVE 50%',
                'bottles_count': 3,
                'supply_days': '90 Days Full Cycle',
                'price_usd': 105.00,
                'original_price_usd': 210.00,
                'discount_percent': 50,
                'image': '/assets/bundle-set.jpg',
                'popular': False,
                'best_value': True,
                'free_gifts': [
                    'FREE Scalp Stimulating Tool ($18 Value)',
                    'FREE Rosemary Scalp Mist Sample ($12 Value)',
                    'FREE Worldwide VIP Priority Shipping'
                ],
                'features': [
                    '3x 50ml Bottles (Complete 90-Day Clinical Cycle)',
                    'FREE Ergonomic Scalp Massager Tool',
                    'FREE Rosemary Follicle Mist Travel Size',
                    'FREE VIP Tracked Express Delivery',
                    'Maximum Hair Density & Root Reactivation',
                    '100% Risk-Free 60-Day Full Refund Guarantee'
                ],
                'rating': 5.0,
                'reviews_count': 3410,
                'in_stock': True,
                'stock_left': 7,
                'display_order': 3
            }
        ]

        for p_data in products_data:
            ProductBundle.objects.update_or_create(
                slug=p_data['slug'],
                defaults=p_data
            )
        self.stdout.write(f'Synced {len(products_data)} Product Bundles.')

        # 2. Reviews
        reviews_data = [
            {
                'author': 'Dr. Ayesha Malik',
                'role': 'Verified Dermatologist & Buyer',
                'location': 'Islamabad',
                'rating': 5,
                'date': '2 days ago',
                'title': 'Remarkable formulation with zero irritation',
                'content': 'As a dermatologist, I thoroughly reviewed the active percentage of Redensyl and Procapil in FOLLILUXE. It provides clinical-grade peptide delivery without harsh alcohol solvents. My personal hair density improved by 35% in 8 weeks.',
                'verified': True,
                'helpful': 142,
                'bundle': '3-Month Clinical Regrowth Kit',
                'avatar': 'AM'
            },
            {
                'author': 'Zainab Qureshi',
                'role': 'Verified Buyer',
                'location': 'Karachi',
                'rating': 5,
                'date': '4 days ago',
                'title': 'My hair stopped falling out in 14 days!',
                'content': 'I had severe stress-induced shedding. Literally after 2 weeks of using 1 dropper every evening, shower drain hair loss dropped by almost 80%. Now I have so many baby hairs standing up!',
                'verified': True,
                'helpful': 98,
                'bundle': '2-Month Transformation Pack',
                'avatar': 'ZQ'
            },
            {
                'author': 'Marcus Vance',
                'role': 'Verified Buyer',
                'location': 'London, UK',
                'rating': 5,
                'date': '1 week ago',
                'title': 'Better than prescription alternatives with zero sides',
                'content': 'I had bad reactions to minoxidil before. FOLLILUXE has given me identical or even better regrowth along the hairline with zero itching and no greasy buildup. 10/10.',
                'verified': True,
                'helpful': 85,
                'bundle': '3-Month Clinical Regrowth Kit',
                'avatar': 'MV'
            },
            {
                'author': 'Bilal Ahmed',
                'role': 'Verified Buyer',
                'location': 'Rawalpindi',
                'rating': 5,
                'date': '1 week ago',
                'title': 'Cash on delivery was fast and the product is 100% genuine',
                'content': 'Received parcel in 2 days. The amber glass bottle and jade scalp massager feel super premium. 1 month in and my barber asked me what product I started using because my crown is visibly thicker.',
                'verified': True,
                'helpful': 67,
                'bundle': '2-Month Transformation Pack',
                'avatar': 'BA'
            },
            {
                'author': 'Elena Rostova',
                'role': 'Verified Buyer',
                'location': 'Toronto, Canada',
                'rating': 5,
                'date': '2 weeks ago',
                'title': 'Super lightweight and smells like fresh herbs',
                'content': 'Unlike heavy castor or rosemary oils that make your hair look unwashed, this water-light serum absorbs in 60 seconds without disturbing my blowouts. Love it!',
                'verified': True,
                'helpful': 52,
                'bundle': '1-Month Starter Pack',
                'avatar': 'ER'
            },
            {
                'author': 'Hamza Tariq',
                'role': 'Verified Buyer',
                'location': 'Lahore, Pakistan',
                'rating': 5,
                'date': '3 weeks ago',
                'title': 'Crown thinning completely covered after 90 days',
                'content': 'I ordered the 3-Month Clinical Kit with cash on delivery. By month 2, fine baby hairs started filling in my crown. Today my scalp is completely dense and covered. Outstanding Swiss formula!',
                'verified': True,
                'helpful': 114,
                'bundle': '3-Month Clinical Regrowth Kit',
                'avatar': 'HT'
            },
            {
                'author': 'Sarah Jenkins',
                'role': 'Verified Buyer',
                'location': 'Manchester, UK',
                'rating': 5,
                'date': '1 month ago',
                'title': 'Stopped postpartum shedding dead in its tracks',
                'content': 'Postpartum hair loss made me cry every time I brushed my hair. FOLLILUXE reduced shedding by 80% within 3 weeks. My hairline has completely filled back in. Cannot recommend it enough!',
                'verified': True,
                'helpful': 92,
                'bundle': '2-Month Transformation Pack',
                'avatar': 'SJ'
            },
            {
                'author': 'Danial Raza',
                'role': 'Verified Buyer',
                'location': 'Islamabad, Pakistan',
                'rating': 5,
                'date': '1 month ago',
                'title': 'Zero side effects, real results without Minoxidil',
                'content': 'I had heart palpitations and severe scalp itch with 5% Minoxidil in the past. Switched to FOLLILUXE and had zero irritation with even better density gains. The jade scalp tool is also fantastic.',
                'verified': True,
                'helpful': 78,
                'bundle': '3-Month Clinical Regrowth Kit',
                'avatar': 'DR'
            }
        ]

        if not Review.objects.exists():
            for r in reviews_data:
                Review.objects.create(**r)
            self.stdout.write(f'Created {len(reviews_data)} Reviews.')
        else:
            self.stdout.write('Reviews already exist, skipping duplicate creation.')

        # 3. FAQs
        faqs_data = [
            {
                'category': 'Results & Timeline',
                'question': 'How long before I see noticeable new hair growth?',
                'answer': 'Most users experience a dramatic reduction in hair shedding within 14–21 days. Noticeable new baby hairs and visible follicle density improvements typically appear between weeks 6 to 8, with full clinical transformation visible at 90 days (1 full hair growth cycle).',
                'display_order': 1
            },
            {
                'category': 'Application & Routine',
                'question': 'How do I apply the serum and do I need to wash it out?',
                'answer': 'Apply 1 to 2 full pipettes (1ml) directly onto your scalp in thinning or target areas once daily (morning or night). Gently massage in circular motions for 2-3 minutes. Do NOT wash it out — it is a leave-in, fast-absorbing, non-greasy formula.',
                'display_order': 2
            },
            {
                'category': 'Safety & Side Effects',
                'question': 'Is FOLLILUXE safe for both women and men? Does it cause shedding or side effects?',
                'answer': 'Yes, FOLLILUXE is 100% drug-free, hormone-free, vegan, and formulated for all genders and all hair types (including color-treated, chemically treated, or sensitive scalps). It does not cause the dread shedding or unwanted facial hair associated with synthetic drugs.',
                'display_order': 3
            },
            {
                'category': 'Ingredients & Science',
                'question': 'What makes FOLLILUXE different from regular rosemary oil?',
                'answer': 'While pure oils sit on the scalp surface and can clog follicles, FOLLILUXE combines micro-encapsulated Swiss Redensyl® (3%), Anagain™, Procapil® and Copper Tripeptides with Rosemary extract in a water-based cellular delivery system that penetrates straight to the follicle bulb.',
                'display_order': 4
            },
            {
                'category': 'Shipping & Guarantee',
                'question': 'What is your 60-Day Money-Back Guarantee and Shipping time?',
                'answer': 'We offer an unconditional 60-day money-back guarantee. If you use the serum as directed and are not satisfied with your results, simply contact our support team for a full refund. Orders ship with express 2-3 day tracked delivery (with Cash on Delivery available in supported regions).',
                'display_order': 5
            }
        ]

        for f_data in faqs_data:
            FAQ.objects.update_or_create(
                question=f_data['question'],
                defaults=f_data
            )
        self.stdout.write(f'Synced {len(faqs_data)} FAQs.')

        # 4. Blog Articles
        blogs_data = [
            {
                'slug': 'redensyl-vs-minoxidil',
                'title': 'Redensyl® vs Minoxidil: Why Dermatologists Are Turning to Swiss Bio-Peptides',
                'category': 'Clinical Science',
                'read_time': '5 min read',
                'date': 'Oct 2, 2026',
                'author': 'Dr. Elena Rostova, MD',
                'author_role': 'Clinical Dermatologist & Trichology Advisor',
                'author_avatar': 'ER',
                'image': '/assets/serum-dropper.jpg',
                'excerpt': 'A comprehensive head-to-head analysis of stem cell follicle reactivation without the dreaded minoxidil shedding phase, alcohol itch, or dependency.',
                'key_takeaways': [
                    'Redensyl® targets the ORSc (Outer Root Sheath) stem cells, boosting growth phase by +214% compared to untreated roots.',
                    'Unlike synthetic minoxidil, Swiss peptides do not cause initial telogen effluvium (dread shedding) or rebound hair loss.',
                    'Water-based cellular peptide formulas leave zero greasy buildup and cause 0% scalp redness or irritation in clinical trials.'
                ],
                'content': [
                    {
                        'heading': 'The Paradigm Shift in Follicle Stimulation',
                        'text': 'For nearly three decades, synthetic 5% minoxidil was the default recommendation for pattern hair thinning. However, dermatological surveys reveal that up to 64% of users discontinue minoxidil within 6 months due to heavy alcohol-induced scalp dermatitis, facial hypertrichosis, and the alarming initial shedding phase known as "dread shed".'
                    },
                    {
                        'heading': 'How Swiss Redensyl® Works at the Cellular Level',
                        'text': 'Redensyl® is a patented cosmetic active developed through Swiss biotechnology. It combines two patented molecules: DHQG and EGCG2. In double-blind clinical trials against minoxidil, Redensyl® yielded nearly 2x higher hair density gains with zero reported systemic side effects.'
                    }
                ],
                'recommended_bundle_id': 'serum-3-bottles'
            },
            {
                'slug': 'the-90-day-hair-growth-cycle',
                'title': 'The 90-Day Follicle Cycle: Why Consistency Determines Permanent Regrowth',
                'category': 'Hair Biology',
                'read_time': '4 min read',
                'date': 'Sep 28, 2026',
                'author': 'Hamza Tariq',
                'author_role': 'Lead Formulation Chemist',
                'author_avatar': 'HT',
                'image': '/assets/crown-after.jpg',
                'excerpt': 'Understanding the Anagen (Growth), Catagen (Transition), and Telogen (Resting) biological phases of human hair and what happens week by week.',
                'key_takeaways': [
                    'Human hair naturally grows in 90-day biological renewal cycles; short 2-week tests cannot reactivate miniaturized roots.',
                    'Weeks 1 to 3 focus on stopping active shedding by anchoring the hair bulb into the dermal papilla.',
                    'Weeks 6 to 12 trigger new vellus-to-terminal strand maturation across crown and temple thinning zones.'
                ],
                'content': [
                    {
                        'heading': 'The 3 Biological Phases of Hair Follicles',
                        'text': 'Every hair on your scalp operates on an independent biological clock consisting of three distinct phases: Anagen, Catagen, and Telogen.'
                    }
                ],
                'recommended_bundle_id': 'serum-2-bottles'
            },
            {
                'slug': 'scalp-microcirculation-and-dht',
                'title': 'Micro-Circulation & DHT Defense: Why Scalp Stimulation Doubles Serum Absorption',
                'category': 'Trichologist Tips',
                'read_time': '6 min read',
                'date': 'Sep 20, 2026',
                'author': 'Dr. Ayesha Malik',
                'author_role': 'Verified Dermatologist & Trichology Specialist',
                'author_avatar': 'AM',
                'image': '/assets/bundle-set.jpg',
                'excerpt': 'How gentle silicone scalp stimulation stimulates capillary blood vessels, relieves scalp tension, and accelerates peptide delivery to hair bulbs.',
                'key_takeaways': [
                    'Scalp skin has one of the highest capillary densities in the body, but tension and sebum buildup restrict nutrient delivery.',
                    'Using a silicone scalp massager for 2-3 minutes increases localized dermal perfusion by up to 40%.',
                    'Rosemary extract and Procapil neutralize localized DHT without systemic hormone alterations.'
                ],
                'content': [
                    {
                        'heading': 'The Overlooked Role of Scalp Micro-Vascularization',
                        'text': 'Hair roots are among the most metabolically active tissues in the human body. When blood flow to the scalp dermis is restricted by stress, calcification, or localized tension, hair bulbs starve of oxygen, amino acids, and micronutrients.'
                    },
                    {
                        'heading': 'The Synergistic Power of Silicone Massager Stimulation',
                        'text': 'Massaging with soft, medical-grade silicone bristles creates mechanical micro-stretch on dermal papilla cells. This mechanical signaling stimulates the release of growth factors (VEGF and FGF-7) while simultaneously opening cellular pathways for the topical Redensyl serum to penetrate 3x deeper.'
                    },
                    {
                        'heading': 'How to Execute the 3-Minute Routine',
                        'text': 'After applying 1 to 2 pipettes of FOLLILUXE serum to thinning areas, gently press the Jade Silicone Massager in small circular pulses for 2 to 3 minutes. Never drag aggressively; gentle circular pressure is all that is required to awaken micro-circulation.'
                    }
                ],
                'recommended_bundle_id': 'serum-2-bottles'
            }
        ]

        for b_data in blogs_data:
            BlogArticle.objects.update_or_create(
                slug=b_data['slug'],
                defaults=b_data
            )
        self.stdout.write(f'Synced {len(blogs_data)} Blog Articles.')

        # 5. Active Ingredients
        ingredients_data = [
            {
                'name': 'Redensyl® (3%)',
                'badge': 'Patented Active',
                'origin': 'Swiss Biotechnology',
                'role': 'Stem Cell Follicle Reactivator',
                'description': 'Clinically shown to stimulate hair follicle stem cells (ORSc) and increase hair growth by +214% compared to untreated roots in laboratory trials.',
                'stat': '+214% Follicle Growth',
                'icon': 'Sparkles',
                'display_order': 1
            },
            {
                'name': 'Anagain™ (Organic Pea Sprout)',
                'badge': 'Award-Winning',
                'origin': 'Organic Botanical Extract',
                'role': 'Growth Cycle Extender',
                'description': 'Derived from organic pea sprouts, AnaGain™ reactivates noggin and FGF-7 genes to extend the anagen (growth) phase of hair and dramatically reduce shedding.',
                'stat': '85% Reduced Hair Loss',
                'icon': 'Leaf',
                'display_order': 2
            },
            {
                'name': 'Procapil® (2%)',
                'badge': 'Clinical DHT Blocker',
                'origin': 'Biotinyl-GHK & Citrus Flavonoids',
                'role': 'Root Anchoring & DHT Defense',
                'description': 'Fights hair follicle aging and anchors the hair bulb securely into the scalp dermis while neutralizing localized DHT enzyme buildup around roots.',
                'stat': '+46% Stronger Root Anchor',
                'icon': 'ShieldCheck',
                'display_order': 3
            },
            {
                'name': 'Copper Tripeptide-1 (GHK-Cu)',
                'badge': 'Cellular Repair',
                'origin': 'Bio-Identical Peptide',
                'role': 'Micro-Circulation & Collagen',
                'description': 'Stimulates scalp micro-vascularization, increases hair follicle size, and boosts collagen synthesis around miniaturized hair roots for thicker strand diameter.',
                'stat': '+33% Thicker Hair Strands',
                'icon': 'Zap',
                'display_order': 4
            },
            {
                'name': 'Pure Rosemary Extract & Biotin',
                'badge': 'Pure Botanicals',
                'origin': 'Mediterranean Rosemary Leaf',
                'role': 'Natural Scalp Oxygenation',
                'description': 'Matches the efficacy of standard chemical treatments without itching or irritation, calming scalp inflammation and feeding pure vitamin B7 into keratin matrices.',
                'stat': '100% Drug-Free & Gentle',
                'icon': 'Flame',
                'display_order': 5
            }
        ]

        for i_data in ingredients_data:
            ActiveIngredient.objects.update_or_create(
                name=i_data['name'],
                defaults=i_data
            )
        self.stdout.write(f'Synced {len(ingredients_data)} Active Ingredients.')

        # 6. Before & After Cases
        cases_data = [
            {
                'name': 'Hamza A. (32 yrs)',
                'location': 'Lahore, Pakistan',
                'duration': '90 Days Result',
                'concern': 'Crown Thinning & Widening Part',
                'rating': 5,
                'review': 'I was skeptical because other serums made my scalp greasy. FOLLILUXE absorbed in 2 minutes, and by week 7 my crown started filling with dense dark baby hairs. At Day 90, the difference is night and day!',
                'before_image': '/assets/crown-before.jpg',
                'after_image': '/assets/crown-after.jpg',
                'bundle_used': '3-Month Clinical Regrowth Kit',
                'display_order': 1
            },
            {
                'name': 'Jessica M. (29 yrs)',
                'location': 'New York, USA',
                'duration': '60 Days Result',
                'concern': 'Postpartum Hair Shedding & Temple Loss',
                'rating': 5,
                'review': 'After having my baby, clumps of hair were falling in the shower. This serum stopped the shedding within 3 weeks and filled my front temples back in. I use it every single night with the scalp massager!',
                'before_image': '/assets/crown-before.jpg',
                'after_image': '/assets/crown-after.jpg',
                'bundle_used': '2-Month Transformation Pack',
                'display_order': 2
            },
            {
                'name': 'Tariq K. (38 yrs)',
                'location': 'Dubai, UAE',
                'duration': '90 Days Result',
                'concern': 'Receding Frontal Hairline',
                'rating': 5,
                'review': 'Zero side effects, clean botanical smell, and real visible hair density. Highly recommended to anyone who wants natural clinical results without chemicals.',
                'before_image': '/assets/crown-before.jpg',
                'after_image': '/assets/crown-after.jpg',
                'bundle_used': '3-Month Clinical Regrowth Kit',
                'display_order': 3
            }
        ]

        for c_data in cases_data:
            BeforeAfterCase.objects.update_or_create(
                name=c_data['name'],
                defaults=c_data
            )
        self.stdout.write(f'Synced {len(cases_data)} Before & After cases.')

        self.stdout.write(self.style.SUCCESS('Successfully seeded all initial data into PostgreSQL!'))
