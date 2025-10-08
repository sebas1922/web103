interface Stage {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface Event {
  id: number;
  artist_name: string;
  start_time: string;
  genre: string;
  image_url: string;
  stage_id: number;
}

export const data: { stages: Stage[], events: Event[] } = {
  "stages": [
    {
      "id": 1,
      "name": "Pyramid Stage",
      "description": "The iconic main stage for the biggest headliners, known for its massive crowds and epic light shows.",
      "image_url": "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
    },
    {
      "id": 2,
      "name": "Odyssey Tent",
      "description": "An immersive experience for electronic and dance music, featuring 360-degree visuals.",
      "image_url": "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg"
    },
    {
      "id": 3,
      "name": "Wanderlust Woods",
      "description": "An intimate, acoustic stage set among the trees, perfect for stripped-back sets and singer-songwriters.",
      "image_url": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
    },
    {
      "id": 4,
      "name": "The Arena",
      "description": "A high-energy, enclosed stage for rock, punk, and alternative acts with a raw, powerful sound.",
      "image_url": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
    }
  ],
  "events": [
    {
      "id": 1,
      "artist_name": "Dua Lipa",
      "start_time": "2025-10-12 21:00:00",
      "genre": "Pop",
      "image_url": "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
      "stage_id": 1
    },
    {
      "id": 2,
      "artist_name": "Tame Impala",
      "start_time": "2025-10-12 19:30:00",
      "genre": "Psychedelic Rock",
      "image_url": "https://images.pexels.com/photos/374620/pexels-photo-374620.jpeg",
      "stage_id": 1
    },
    {
      "id": 9,
      "artist_name": "Kendrick Lamar",
      "start_time": "2025-10-13 21:30:00",
      "genre": "Hip-Hop",
      "image_url": "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg",
      "stage_id": 1
    },
    {
      "id": 13,
      "artist_name": "Taylor Swift",
      "start_time": "2025-10-14 21:00:00",
      "genre": "Pop",
      "image_url": "https://images.pexels.com/photos/2099426/pexels-photo-2099426.jpeg",
      "stage_id": 1
    },
    {
      "id": 14,
      "artist_name": "The Weeknd",
      "start_time": "2025-10-14 19:30:00",
      "genre": "R&B/Pop",
      "image_url": "https://images.pexels.com/photos/1674318/pexels-photo-1674318.jpeg",
      "stage_id": 1
    },
    {
      "id": 15,
      "artist_name": "Harry Styles",
      "start_time": "2025-10-15 20:00:00",
      "genre": "Pop Rock",
      "image_url": "https://images.pexels.com/photos/432021/pexels-photo-432021.jpeg",
      "stage_id": 1
    },
    {
        "id": 16,
        "artist_name": "Billie Eilish",
        "start_time": "2025-10-15 18:30:00",
        "genre": "Alternative Pop",
        "image_url": "https://images.pexels.com/photos/2531610/pexels-photo-2531610.jpeg",
        "stage_id": 1
    },
    {
        "id": 17,
        "artist_name": "Lizzo",
        "start_time": "2025-10-13 18:00:00",
        "genre": "Pop/Funk",
        "image_url": "https://images.pexels.com/photos/3756943/pexels-photo-3756943.jpeg",
        "stage_id": 1
    },
    {
      "id": 3,
      "artist_name": "Aphex Twin",
      "start_time": "2025-10-12 22:00:00",
      "genre": "IDM",
      "image_url": "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
      "stage_id": 2
    },
    {
      "id": 4,
      "artist_name": "Fred again..",
      "start_time": "2025-10-12 20:30:00",
      "genre": "Electronic",
      "image_url": "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      "stage_id": 2
    },
    {
      "id": 10,
      "artist_name": "Skrillex",
      "start_time": "2025-10-13 22:30:00",
      "genre": "Dubstep",
      "image_url": "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg",
      "stage_id": 2
    },
    {
      "id": 18,
      "artist_name": "ODESZA",
      "start_time": "2025-10-14 21:00:00",
      "genre": "Electronic",
      "image_url": "https://images.pexels.com/photos/2600287/pexels-photo-2600287.jpeg",
      "stage_id": 2
    },
    {
      "id": 19,
      "artist_name": "Disclosure",
      "start_time": "2025-10-14 19:30:00",
      "genre": "House",
      "image_url": "https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg",
      "stage_id": 2
    },
    {
      "id": 20,
      "artist_name": "Flume",
      "start_time": "2025-10-15 22:00:00",
      "genre": "Future Bass",
      "image_url": "https://images.pexels.com/photos/1120275/pexels-photo-1120275.jpeg",
      "stage_id": 2
    },
    {
        "id": 21,
        "artist_name": "Justice",
        "start_time": "2025-10-15 20:30:00",
        "genre": "French House",
        "image_url": "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg",
        "stage_id": 2
    },
    {
        "id": 22,
        "artist_name": "Caribou",
        "start_time": "2025-10-13 19:00:00",
        "genre": "Electronic",
        "image_url": "https://images.pexels.com/photos/2479313/pexels-photo-2479313.jpeg",
        "stage_id": 2
    },
    {
      "id": 5,
      "artist_name": "Bon Iver",
      "start_time": "2025-10-12 19:00:00",
      "genre": "Indie Folk",
      "image_url": "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg",
      "stage_id": 3
    },
    {
      "id": 6,
      "artist_name": "Phoebe Bridgers",
      "start_time": "2025-10-12 17:30:00",
      "genre": "Indie Rock",
      "image_url": "https://images.pexels.com/photos/3359734/pexels-photo-3359734.jpeg",
      "stage_id": 3
    },
    {
      "id": 11,
      "artist_name": "Fleet Foxes",
      "start_time": "2025-10-13 19:00:00",
      "genre": "Indie Folk",
      "image_url": "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
      "stage_id": 3
    },
    {
      "id": 23,
      "artist_name": "Hozier",
      "start_time": "2025-10-14 20:00:00",
      "genre": "Indie Rock/Soul",
      "image_url": "https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg",
      "stage_id": 3
    },
    {
      "id": 24,
      "artist_name": "Florence + The Machine",
      "start_time": "2025-10-14 18:30:00",
      "genre": "Indie Rock",
      "image_url": "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg",
      "stage_id": 3
    },
    {
      "id": 25,
      "artist_name": "The Lumineers",
      "start_time": "2025-10-15 19:30:00",
      "genre": "Folk Rock",
      "image_url": "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg",
      "stage_id": 3
    },
    {
        "id": 26,
        "artist_name": "Maggie Rogers",
        "start_time": "2025-10-15 18:00:00",
        "genre": "Indie Pop",
        "image_url": "https://images.pexels.com/photos/3784355/pexels-photo-3784355.jpeg",
        "stage_id": 3
    },
    {
        "id": 27,
        "artist_name": "Lorde",
        "start_time": "2025-10-13 20:30:00",
        "genre": "Art Pop",
        "image_url": "https://images.pexels.com/photos/305250/pexels-photo-305250.jpeg",
        "stage_id": 3
    },
    {
      "id": 7,
      "artist_name": "Arctic Monkeys",
      "start_time": "2025-10-12 20:00:00",
      "genre": "Alternative Rock",
      "image_url": "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg",
      "stage_id": 4
    },
    {
      "id": 8,
      "artist_name": "IDLES",
      "start_time": "2025-10-12 18:30:00",
      "genre": "Post-Punk",
      "image_url": "https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg",
      "stage_id": 4
    },
    {
      "id": 12,
      "artist_name": "The Strokes",
      "start_time": "2025-10-13 20:00:00",
      "genre": "Garage Rock",
      "image_url": "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg",
      "stage_id": 4
    },
    {
      "id": 28,
      "artist_name": "Foo Fighters",
      "start_time": "2025-10-14 21:00:00",
      "genre": "Alternative Rock",
      "image_url": "https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg",
      "stage_id": 4
    },
    {
      "id": 29,
      "artist_name": "Paramore",
      "start_time": "2025-10-14 19:30:00",
      "genre": "Pop Punk",
      "image_url": "https://images.pexels.com/photos/257917/pexels-photo-257917.jpeg",
      "stage_id": 4
    },
    {
      "id": 30,
      "artist_name": "The Killers",
      "start_time": "2025-10-15 21:00:00",
      "genre": "Alternative Rock",
      "image_url": "https://images.pexels.com/photos/1916817/pexels-photo-1916817.jpeg",
      "stage_id": 4
    },
    {
        "id": 31,
        "artist_name": "Turnstile",
        "start_time": "2025-10-15 19:30:00",
        "genre": "Hardcore Punk",
        "image_url": "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
        "stage_id": 4
    },
    {
        "id": 32,
        "artist_name": "Red Hot Chili Peppers",
        "start_time": "2025-10-13 21:00:00",
        "genre": "Funk Rock",
        "image_url": "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg",
        "stage_id": 4
    }
  ]
}