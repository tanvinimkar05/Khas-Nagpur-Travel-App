export const PLACES_DATA = [
  {
    id: "pench",
    name: "Pench National Park & Tiger Reserve",
    category: "Wildlife",
    coordinates: { lat: 21.6883, lng: 79.2319 },
    distanceFromCenter: 82, // km
    shortDescription: "The real-world setting of Rudyard Kipling's famous 'The Jungle Book'.",
    longDescription: "Spanning across the borders of Maharashtra and Madhya Pradesh, Pench National Park is a thriving wildlife sanctuary named after the pristine Pench River that flows through it. Known as the playground of Mowgli, Sher Khan, and Baloo, it features dry deciduous forests and a rich variety of fauna, including Bengal tigers, leopards, Indian bison (gaur), wild dogs, and over 285 species of birds.",
    bestSeason: "Winter to Summer (October to June)",
    bestMonths: "October, November, December, January, February, March, April, May",
    images: [
      "/images/pench_safari.jpg",
      "/images/pench_tiger.jpg",
      "/images/pench_river.jpg",
      "/images/pench_birds.jpg"
    ],
    attractions: [
      "Jeep Safari (Turia & Sillari gates)",
      "Pench River Boat Ride",
      "Mowgli Trail & Environmental Education Center",
      "Kohka Lake Sunset Point"
    ],
    famousFood: "Saoji Chicken, Roasted Mahua sweets, Varhadi Thecha, local river fish curry.",
    timing: "Safari Times: 6:00 AM - 11:00 AM & 3:00 PM - 6:00 PM (Closed on Wednesdays)",
    entryFee: "₹1,500 - ₹3,000 per Jeep (includes guide and permit)",
    packingChecklist: [
      "Earth-toned cotton clothing",
      "Binoculars and DSLR Camera",
      "Sunscreen, hat, and sunglasses",
      "Refillable water bottle",
      "Light jacket (for chilly morning safaris)"
    ],
    facts: [
      "Named after the Pench River that divides the reserve into Eastern and Western blocks.",
      "Inspiration for Rudyard Kipling's classic 'The Jungle Book'.",
      "Home to 'Collarwali', the legendary tigress who gave birth to a record 29 cubs during her lifetime."
    ]
  },
  {
    id: "ramtek",
    name: "Ramtek Temple & Hill",
    category: "Spiritual & Heritage",
    coordinates: { lat: 21.3977, lng: 79.3276 },
    distanceFromCenter: 48, // km
    shortDescription: "An ancient hilltop temple complex steeped in Hindu mythology and history.",
    longDescription: "Perched atop a hill, the Ramtek Temple is a 600-year-old fortress-like temple dedicated to Lord Rama. Mythology states that Lord Rama rested here during his exile. The hilltop offers sweeping views of the surrounding countryside and the scenic Khindsi Lake. Ramtek also houses the Kalidasa Memorial, celebrating the legendary Sanskrit poet who wrote his epic 'Meghaduta' at this very spot.",
    bestSeason: "Monsoon & Winter (July to February)",
    bestMonths: "July, August, September, October, November, December, January, February",
    images: [
      "/images/ramtek_temple.jpg",
      "/images/ramtek_hills.jpg",
      "/images/ramtek_lake.jpg",
      "/images/ramtek_sunset.jpg"
    ],
    attractions: [
      "Garh Temple (main Rama shrine inside fort)",
      "Kalidasa Memorial & Amphitheatre",
      "Khindsi Lake (boating & water sports)",
      "Ambala Tank (sacred stepwell with temples)"
    ],
    famousFood: "Ramtek Samosa (served with hot Kadhi), Nagpur Orange Barfi, fresh coconut water.",
    timing: "6:00 AM - 8:00 PM",
    entryFee: "Free (Boating at Khindsi is extra)",
    packingChecklist: [
      "Modest clothing for temple visits",
      "Comfortable walking shoes (stairs involved)",
      "Umbrella/Raincoat (if visiting in monsoon)",
      "Camera for panoramic hill shots",
      "Beware of monkeys! Keep bags zipped."
    ],
    facts: [
      "The temple is built inside a medieval hill fort, making it highly secure and architectural.",
      "Kalidasa wrote 'Meghaduta' here, using the local clouds as messengers to his lover.",
      "The main idol of Lord Rama is believed to be 'Swayambhu' (self-manifested)."
    ]
  },
  {
    id: "khekranala",
    name: "Khekranala Reservoir",
    category: "Nature & Adventure",
    coordinates: { lat: 21.4339, lng: 79.0531 },
    distanceFromCenter: 58, // km
    shortDescription: "A tranquil forest lake surrounded by the green Satpura ranges, perfect for trekking.",
    longDescription: "Tucked away in the Khapa range forest, Khekranala is a beautiful blue reservoir surrounded by dense foliage. It is a haven for trekkers, birdwatchers, and nature lovers seeking peace. The Maharashtra Tourism Development Corporation (MTDC) guest house situated on a hillock overlooking the reservoir offers stunning views, especially during the monsoons when waterfalls cascade down the hills.",
    bestSeason: "Monsoon (July to September)",
    bestMonths: "July, August, September, October",
    images: [
      "/images/khekranala_lake.jpg",
      "/images/khekranala_hills.jpg",
      "/images/khekranala_trek.jpg",
      "/images/khekranala_resort.jpg"
    ],
    attractions: [
      "Lakeside Camping & Picnics",
      "Forest Trekking & Nature Trails",
      "Wildlife Spotting (Deer, Langurs, Wild Boars)",
      "MTDC Lake View Restaurant"
    ],
    famousFood: "Saoji Patodi Rassa, Varhadi Baingan Bharta, hot tea with onion pakodas.",
    timing: "24 Hours (Best visited during daytime: 8:00 AM - 6:00 PM)",
    entryFee: "₹20 per person forest entry fee",
    packingChecklist: [
      "Sturdy trekking shoes with good grip",
      "Insect repellent",
      "Rainwear and dry bags",
      "Picnic mat and snacks",
      "Binoculars for bird watching"
    ],
    facts: [
      "The reservoir acts as a water source for local wildlife, drawing herbivores to its banks at dawn.",
      "The forest is rich in medicinal plants and teakwood trees.",
      "It offers one of the lowest light-pollution zones near Nagpur, perfect for amateur stargazing."
    ]
  },
  {
    id: "deekshabhoomi",
    name: "Deekshabhoomi Stupa",
    category: "Spiritual & Heritage",
    coordinates: { lat: 21.1278, lng: 79.0682 },
    distanceFromCenter: 3, // km (In-city)
    shortDescription: "The largest hollow Buddhist stupa in Asia, symbolizing peace and social reform.",
    longDescription: "Deekshabhoomi is a monumental Buddhist stupa located in the heart of Nagpur. It is a historical site of immense social and spiritual significance, as it was here on October 14, 1956, that Dr. B. R. Ambedkar, along with 600,000 followers, converted to Buddhism. The majestic white dome, inspired by the Sanchi Stupa, features a grand hall that can house thousands, surrounded by lush landscaped gardens.",
    bestSeason: "Winter (October to March)",
    bestMonths: "October, November, December, January, February, March",
    images: [
      "/images/deekshabhoomi_front.jpg",
      "/images/deekshabhoomi_dome.jpg",
      "/images/deekshabhoomi_garden.jpg",
      "/images/deekshabhoomi_night.jpg"
    ],
    attractions: [
      "The Grand Memorial Stupa Dome",
      "Dr. Ambedkar Memorial Museum & Library",
      "The Sacred Bodhi Tree (planted from Anuradhapura, Sri Lanka)",
      "Evening Light-up Show"
    ],
    famousFood: "Nagpur Tarri Poha (at nearby stalls), Santra Amrakhand, Saoji Dal Fry.",
    timing: "6:00 AM - 9:00 PM",
    entryFee: "Free",
    packingChecklist: [
      "Socks (footwear must be removed before entering the stupa)",
      "Camera (photography allowed outside, restricted inside)",
      "Modest, comfortable clothing"
    ],
    facts: [
      "It is the largest hollow stupa in Asia, with the dome spanning a height of 120 feet.",
      "The Bodhi tree inside the complex was grown from a sapling of the historical Bodhi tree in Sri Lanka.",
      "Attracts millions of pilgrims annually, particularly on Ashoka Vijaya Dashami (Dhamma Chakra Pravartan Din)."
    ]
  },
  {
    id: "futala",
    name: "Futala Lake & Waterfront",
    category: "Nature & Leisure",
    coordinates: { lat: 21.1528, lng: 79.0435 },
    distanceFromCenter: 4, // km (In-city)
    shortDescription: "Nagpur's favorite sunset spot, featuring a vibrant lakeside promenade.",
    longDescription: "Built by the Bhonsle kings of Nagpur, Futala Lake is a beautiful 60-acre water body situated in the western part of the city. Known for its colorful fountains, landscaped lawns, and sand-stone embankments, the lake becomes a hub of activity in the evenings. It is currently being upgraded with a state-of-the-art multimedia laser show and a floating musical fountain.",
    bestSeason: "Year-round (Best during sunset/evenings)",
    bestMonths: "January, February, March, April, May, June, July, August, September, October, November, December",
    images: [
      "/images/futala_sunset.jpg",
      "/images/futala_lake.jpg",
      "/images/futala_fountain.jpg",
      "/images/futala_food.jpg"
    ],
    attractions: [
      "Futala Lakeside Promenade walk",
      "Chowpatty Street Food stalls",
      "Boating (seasonal)",
      "Botanical Garden (nearby)"
    ],
    famousFood: "Saoji Patodi Rassa, Nagpur Samosa Chaat, Orange Kulfi, Gila Wada.",
    timing: "4:00 PM - 11:00 PM (Best for evenings)",
    entryFee: "Free",
    packingChecklist: [
      "Comfortable walking shoes",
      "Camera for sunset captures",
      "Cash for street food stalls"
    ],
    facts: [
      "The lake was built over 200 years ago by the Bhonsle dynasty rulers.",
      "Famous for its three-sided concrete pathway that gives the look of a marine drive.",
      "Soon to host one of the world's longest floating musical fountains."
    ]
  },
  {
    id: "umred",
    name: "Umred Karhandla Wildlife Sanctuary",
    category: "Wildlife",
    coordinates: { lat: 20.8492, lng: 79.4754 },
    distanceFromCenter: 58, // km
    shortDescription: "A rapidly growing wildlife sanctuary famous for tiger sightings.",
    longDescription: "Umred Karhandla Wildlife Sanctuary is a hidden wildlife gem located near Umred town. It is connected to the Tadoba Andhari Tiger Reserve, serving as a wildlife corridor. The sanctuary gained massive popularity due to frequent sightings of 'Jai', one of the largest tigers in India, who migrated here. The park is rich in leopards, jungle cats, sloth bears, wild dogs, and diverse bird species.",
    bestSeason: "Winter & Spring (November to May)",
    bestMonths: "November, December, January, February, March, April, May",
    images: [
      "/images/umred_gate.jpg",
      "/images/umred_leopard.jpg",
      "/images/umred_forest.jpg",
      "/images/umred_jeep.jpg"
    ],
    attractions: [
      "Karhandla Gate Safari",
      "Birdwatching at Pauni and Kuhi ranges",
      "Nature trails and local village interaction",
      "Wildlife photography"
    ],
    famousFood: "Umred Saoji Handi (extremely spicy meat curry), Jowar Bhakri, Varadi Poha.",
    timing: "Safari: 6:30 AM - 10:30 AM & 2:30 PM - 6:00 PM (Closed on Mondays)",
    entryFee: "₹1,000 - ₹2,500 per vehicle (excluding guide & camera charges)",
    packingChecklist: [
      "Olive/dull-colored clothing",
      "Camera with telephoto lens",
      "Hat, sunglasses, and water bottle",
      "Dust mask/bandana (safari tracks can get very dusty)"
    ],
    facts: [
      "Acts as a major breeding corridor connecting Pench, Tadoba, and Nagzira tiger reserves.",
      "Was once the exclusive home of 'Jai', a massive 250kg male tiger who captured national attention.",
      "Has a high density of tigers relative to its compact size."
    ]
  },
  {
    id: "zilpi",
    name: "Zilpi Lake",
    category: "Nature & Leisure",
    coordinates: { lat: 21.0772, lng: 78.9183 },
    distanceFromCenter: 26, // km
    shortDescription: "A serene, secluded lakeside retreat perfect for weekend picnics and sunsets.",
    longDescription: "Zilpi Lake is a pristine, hidden water body located on the outskirts of Nagpur, on the way to Hingna. Free from commercial tourist crowds, the lake is nestled in a green valley surrounded by mango orchards and low-lying hills. It is a favorite spot for local cyclists, bikers, and families seeking a quiet evening watching the sun dip below the calm, clean water.",
    bestSeason: "Monsoon & Winter (July to February)",
    bestMonths: "July, August, September, October, November, December, January, February",
    images: [
      "/images/zilpi_lake.jpg",
      "/images/zilpi_sunset.jpg",
      "/images/zilpi_cycles.jpg",
      "/images/zilpi_woods.jpg"
    ],
    attractions: [
      "Lakeside Camping (by private organizers)",
      "Sunset photography",
      "Cycling/Biking nature trail",
      "Rural landscape walking"
    ],
    famousFood: "Bhutta (roasted spicy corn on the cob), hot tea, local Dhaba food.",
    timing: "Best visited: 6:00 AM - 6:30 PM (Avoid late night visits as it is isolated)",
    entryFee: "Free",
    packingChecklist: [
      "Picnic mat and camping chairs",
      "Home-packed snacks and drinking water",
      "Trash bags (help keep this hidden gem clean!)",
      "Camera or phone for sunset selfies"
    ],
    facts: [
      "Completely natural and fed by rainwater catchment from the surrounding Hingna hills.",
      "Highly popular among local cycling groups as a weekend morning destination.",
      "There are no shops or commercial structures around the lake, preserving its raw natural beauty."
    ]
  },
  {
    id: "koradi",
    name: "Koradi Temple & Tourism Plaza",
    category: "Spiritual & Heritage",
    coordinates: { lat: 21.2335, lng: 79.0967 },
    distanceFromCenter: 13, // km
    shortDescription: "A major pilgrimage center featuring a grand temple and a laser light show.",
    longDescription: "Located just north of Nagpur, the Koradi Temple is dedicated to Goddess Mahalaxmi Jagdamba. It is one of the Shakti Peeths in the Vidarbha region. Recently, the temple complex has been transformed into a massive tourism hub, featuring a beautiful lakeside plaza, a Sanskrit cultural center, and a daily multimedia laser fountain show that explains the history of the temple and local culture.",
    bestSeason: "Winter (October to March, Navratri is peak)",
    bestMonths: "October, November, December, January, February",
    images: [
      "/images/koradi_temple.jpg",
      "/images/koradi_light.jpg",
      "/images/koradi_plaza.jpg",
      "/images/koradi_pond.jpg"
    ],
    attractions: [
      "Shree Mahalaxmi Jagdamba Shrine",
      "Grand Cultural Center & Exhibition Hall",
      "Lakeside Garden & Musical Laser Show",
      "Vibrant Navratri Mela (fair)"
    ],
    famousFood: "Desi Ghee Ladoo, Mahalaxmi Prasadam, Nagpur Tarri Poha, hot jalebi.",
    timing: "5:00 AM - 9:30 PM (Laser show runs in the evening)",
    entryFee: "Free (Plaza exhibition & Laser show have nominal tickets)",
    packingChecklist: [
      "Traditional clothing for temple entry",
      "Slip-on shoes (easy to remove at gates)",
      "Small cash for floral offerings (pooja thali)"
    ],
    facts: [
      "During Navratri, the temple attracts over 500,000 pilgrims over nine days.",
      "The deity's idol is said to change its expressions three times a day - looking like a child in the morning, a young woman in the afternoon, and an elderly matriarch in the evening.",
      "The new cultural center is styled like ancient Indian heritage architecture."
    ]
  },
  {
    id: "adasa",
    name: "Adasa Ganesh Temple",
    category: "Spiritual & Heritage",
    coordinates: { lat: 21.3283, lng: 78.9667 },
    distanceFromCenter: 38, // km
    shortDescription: "An ancient monolithic Ganesh temple located on a beautiful hillock.",
    longDescription: "Adasa is a quiet village near Kalmeshwar, home to an ancient temple dedicated to Lord Ganesha (Adasa Vignaharta). The temple houses a magnificent monolithic idol of Lord Ganesha, standing 12 feet tall and carved out of a single stone. Situated on a small hill, the temple offers a peaceful escape surrounded by farmlands, small streams, and clean air.",
    bestSeason: "Monsoon & Winter (August to February)",
    bestMonths: "August, September, October, November, December, January, February",
    images: [
      "/images/adasa_temple.jpg",
      "/images/adasa_ganesha.jpg",
      "/images/adasa_hill.jpg",
      "/images/adasa_scenery.jpg"
    ],
    attractions: [
      "Monolithic Lord Ganesha Shrine",
      "Hilltop Trek & Viewpoint",
      "Nearby Bhairav Temple",
      "Lush agricultural fields around the village"
    ],
    famousFood: "Shegaon Kachori, Nagpur Samosa with spicy chutney, local sweet pedas.",
    timing: "6:00 AM - 7:00 PM",
    entryFee: "Free",
    packingChecklist: [
      "Socks (temple stone floors can get hot in the afternoon)",
      "Sun hat and water bottle",
      "Modest clothing"
    ],
    facts: [
      "The temple is considered one of the 'Ashta Vinayaks' (eight ancient Ganesha temples) of the Vidarbha region.",
      "The standing Ganesha idol is over 4,000 years old, dating back to mythological eras according to local priests.",
      "The entire hill is made of a unique volcanic rock formation."
    ]
  },
  {
    id: "waki",
    name: "Waki Woods",
    category: "Nature & Adventure",
    coordinates: { lat: 21.3197, lng: 79.1678 },
    distanceFromCenter: 28, // km
    shortDescription: "A scenic natural forest and river campsite, ideal for day trips and boating.",
    longDescription: "Waki Woods is a gorgeous natural playground located on the banks of the Kanhan River. Offering green, sprawling woods, it is popular for picnics, archery, boating, horse riding, and birdwatching. It also houses the Waki Dargah (Sufi shrine of Hazrat Tajuddin Baba), which draws people of all faiths, creating a beautiful cultural blend of nature and spirituality.",
    bestSeason: "Monsoon & Winter (July to January)",
    bestMonths: "July, August, September, October, November, December, January",
    images: [
      "/images/waki_woods.jpg",
      "/images/waki_river.jpg",
      "/images/waki_camp.jpg",
      "/images/waki_dargah.jpg"
    ],
    attractions: [
      "Boating & Kayaking in the Kanhan River",
      "Hazrat Tajuddin Baba Sufi Dargah",
      "Lakeside/Riverside Camping",
      "Adventure activities (Trekking, archery, horse riding)"
    ],
    famousFood: "Saoji Mutton, Saoji Dal Tadka, Tandoori Roti at riverside Dhabas.",
    timing: "8:00 AM - 7:00 PM",
    entryFee: "Free (Activities and camping are charged separately)",
    packingChecklist: [
      "Change of clothes (in case you get wet in the river)",
      "Sturdy outdoor boots",
      "Mosquito repellent",
      "Camera for wildlife and river pictures"
    ],
    facts: [
      "Waki Woods is known for its beautiful bird diversity, especially during migratory seasons.",
      "Hazrat Tajuddin Baba spent significant spiritual time meditating under the trees of Waki.",
      "The local riverside Dhabas serve some of the most authentic and hot 'Dhaba style' Saoji food in the region."
    ]
  }
];

export const FOOD_DATA = [
  {
    id: "tarri_poha",
    name: "Nagpur Tarri Poha",
    description: "The ultimate Nagpur breakfast. Flattened rice cooked with turmeric, onions, and mustard seeds, then drenched in a spicy, piping hot chickpea gravy (tarri) and topped with chopped onions, fresh coriander, Sev, and a squeeze of lemon.",
    famousFor: "Spicy, savory, tangy flavor, perfect morning fuel.",
    bestSpots: ["Ramji-Shyamji Pohewala (Wardha Road)", "Keshav Poha (Deo Nagar)", "KP (Kasturchand Park) Poha Stalls"],
    image: "/images/food_tarri_poha.jpg"
  },
  {
    id: "saoji_curry",
    name: "Saoji Chicken / Mutton",
    description: "A legendary culinary style of the Halba Koshti community. It is a slow-cooked, fiery meat curry utilizing a secret blend of 32 native spices (Saoji Masala) and oil. It is notoriously spicy but packed with aromatic depth.",
    famousFor: "Extreme heat, unique dark rich color, and strong spice blend.",
    bestSpots: ["Jagdish Saoji Bhojnalaya (Gandhibagh)", "Pintu Saoji (Sadar)", "Mureba Saoji (Telephone Exchange Square)"],
    image: "/images/food_saoji_curry.jpg"
  },
  {
    id: "santra_barfi",
    name: "Nagpur Orange Barfi",
    description: "A sweet, melt-in-the-mouth fudge made from fresh, juicy pulp of Nagpur's world-famous oranges, thickened milk solids (khoya/mawa), and sugar. It represents the sweet heritage of the Orange City.",
    famousFor: "Zesty orange flavor combined with traditional Indian mawa sweetness.",
    bestSpots: ["Haldiram's (Multiple outlets)", "Heera Sweets (Dharampeth)", "Shreeji Sweets (Sitabuldi)"],
    image: "/images/food_santra_barfi.jpg"
  },
  {
    id: "patodi_rassa",
    name: "Patodi Rassa",
    description: "Gram flour (besan) is cooked, rolled, cut into diamond-shaped cakes (patodi), and served floating in a fiery, thin, onion-coconut gravy (rassa). A vegetarian Saoji masterpiece.",
    famousFor: "Spicy, vegetarian alternative to Saoji meats, served with Jowar Bhakri.",
    bestSpots: ["Manish Saoji (Pratap Nagar)", "Saoji Dhabas on Outer Ring Road"],
    image: "/images/food_patodi_rassa.jpg"
  },
  {
    id: "gila_wada",
    name: "Gila Wada (Dahi Wada)",
    description: "A unique Nagpur street snack. Fresh, hot urad dal vadas are fried crispy and immediately soaked in a sweet-spicy yogurt base, then drizzled with red chili powder, roasted cumin, and black salt.",
    famousFor: "Contrast of hot, fresh-fried vadas with cool, refreshing spiced yogurt.",
    bestSpots: ["Futala Chowpatty Stalls", "Sitabuldi Market food lane"],
    image: "/images/food_gila_wada.jpg"
  }
];

export const NAGPUR_START_POINTS = [
  { id: "railway", name: "Nagpur Railway Station", lat: 21.1524, lng: 79.0888 },
  { id: "airport", name: "Dr. Babasaheb Ambedkar International Airport", lat: 21.0922, lng: 79.0472 },
  { id: "sitabuldi", name: "Sitabuldi Metro Interchange", lat: 21.1458, lng: 79.0831 },
  { id: "sadar", name: "Sadar Bazar Center", lat: 21.1611, lng: 79.0805 }
];
