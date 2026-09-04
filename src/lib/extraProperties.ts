import { Property, Host } from './types';
import { buildGallery } from './images';

interface Seed {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  type: Property['type'];
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  category: string;
  hostId: string;
  description: string;
  guestFav?: boolean;
  verified?: boolean;
  instantBook?: boolean;
}

// Local host registry (mirrors data.ts's hosts; kept here to avoid a circular import).
const HOSTS: Record<string, Host> = {
  'host-1': { id: 'host-1', name: 'Yasmine El-Fassi', avatar: 'https://i.pravatar.cc/150?u=yasmine', isSuperhost: true, hostingSince: '2019', rating: 4.98, reviews: 256, languages: ['Arabic', 'French', 'English'], responseRate: 98, responseTime: 'within an hour', properties: [] },
  'host-2': { id: 'host-2', name: 'Ahmed Benali', avatar: 'https://i.pravatar.cc/150?u=ahmed', isSuperhost: true, hostingSince: '2020', rating: 4.95, reviews: 189, languages: ['Arabic', 'French', 'English'], responseRate: 95, responseTime: 'within 2 hours', properties: [] },
  'host-3': { id: 'host-3', name: 'Fatima Zahraoui', avatar: 'https://i.pravatar.cc/150?u=fatima', isSuperhost: false, hostingSince: '2022', rating: 4.89, reviews: 78, languages: ['Arabic', 'French'], responseRate: 92, responseTime: 'within a few hours', properties: [] },
  'host-4': { id: 'host-4', name: 'Karim Attar', avatar: 'https://i.pravatar.cc/150?u=karim', isSuperhost: true, hostingSince: '2018', rating: 4.97, reviews: 312, languages: ['Arabic', 'English', 'French'], responseRate: 100, responseTime: 'within 30 minutes', properties: [] },
  'host-5': { id: 'host-5', name: 'Omar Benjelloun', avatar: 'https://i.pravatar.cc/150?u=omar', isSuperhost: false, hostingSince: '2021', rating: 4.85, reviews: 134, languages: ['Arabic', 'French'], responseRate: 88, responseTime: 'within a day', properties: [] },
  'host-6': { id: 'host-6', name: 'Nadia El Mansouri', avatar: 'https://i.pravatar.cc/150?u=nadia', isSuperhost: true, hostingSince: '2020', rating: 4.93, reviews: 201, languages: ['Arabic', 'French', 'English'], responseRate: 96, responseTime: 'within an hour', properties: [] },
};

const DEFAULT_AMENITIES: Record<string, string[]> = {
  beach: ['Wi-Fi', 'Kitchen', 'Parking', 'Air conditioning', 'Ocean view', 'Washer', 'TV'],
  desert: ['Wi-Fi', 'Heating', 'Kitchen', 'Essentials', 'Coffee maker'],
  mountain: ['Wi-Fi', 'Heating', 'Kitchen', 'Parking', 'Workspace'],
  city: ['Wi-Fi', 'Kitchen', 'Air conditioning', 'TV', 'Washer', 'Hangers'],
};

const EXTRA_SEEDS: Seed[] = [
  { id: 'prop-8', name: 'Agdal Garden Villa', city: 'Marrakech', lat: 31.6295, lng: -7.9811, type: 'Villa', price: 240, rating: 4.87, reviews: 91, guests: 8, bedrooms: 4, beds: 5, baths: 3, category: 'Garden', hostId: 'host-1', description: 'A serene villa set in lush gardens on the edge of Marrakech, steps from the Majorelle Garden.', guestFav: true, verified: true, instantBook: true },
  { id: 'prop-9', name: 'Palmeraie Luxury Riad', city: 'Marrakech', lat: 31.66, lng: -7.96, type: 'Riad', price: 310, rating: 4.95, reviews: 143, guests: 6, bedrooms: 3, beds: 3, baths: 3, category: 'Luxury', hostId: 'host-4', description: 'A palatial riad in the Palmeraie with private pool, rooftop terrace and panoramic Atlas views.' },
  { id: 'prop-10', name: 'Medina Courtyard Suite', city: 'Marrakech', lat: 31.6254, lng: -7.989, type: 'Riad', price: 135, rating: 4.72, reviews: 54, guests: 4, bedrooms: 2, beds: 2, baths: 2, category: 'Historic', hostId: 'host-6', description: 'A charming courtyard riad hidden in the heart of the medina, minutes from Jemaa el-Fnaa.' },
  { id: 'prop-11', name: 'Blue Pearl House', city: 'Chefchaouen', lat: 35.1688, lng: -5.2636, type: 'House', price: 98, rating: 4.81, reviews: 67, guests: 4, bedrooms: 2, beds: 3, baths: 2, category: 'Scenic', hostId: 'host-2', description: 'A blue-washed house with mountain views in the iconic blue city of Chefchaouen.', instantBook: true },
  { id: 'prop-12', name: 'Rif Mountain Retreat', city: 'Chefchaouen', lat: 35.17, lng: -5.27, type: 'Cabin', price: 120, rating: 4.76, reviews: 43, guests: 4, bedrooms: 2, beds: 2, baths: 1, category: 'Mountain', hostId: 'host-3', description: 'A cozy mountain retreat overlooking the Rif peaks, perfect for hikers and nature lovers.' },
  { id: 'prop-13', name: 'Medina Wind House', city: 'Essaouira', lat: 31.5126, lng: -9.769, type: 'House', price: 110, rating: 4.69, reviews: 38, guests: 4, bedrooms: 2, beds: 2, baths: 1, category: 'Beachfront', hostId: 'host-5', description: 'A breezy medina house a short stroll from Essaouira’s windswept beach and port.' },
  { id: 'prop-14', name: 'Atlantic Terrace Riad', city: 'Essaouira', lat: 31.5085, lng: -9.7595, type: 'Riad', price: 160, rating: 4.88, reviews: 72, guests: 5, bedrooms: 3, beds: 3, baths: 2, category: 'Ocean view', hostId: 'host-1', description: 'A rooftop riad with sweeping Atlantic views, fishing boats and sunsets from every terrace.', guestFav: true, verified: true },
  { id: 'prop-15', name: 'Tangier Bay Apartment', city: 'Tangier', lat: 35.7716, lng: -5.802, type: 'Apartment', price: 105, rating: 4.64, reviews: 47, guests: 3, bedrooms: 2, beds: 2, baths: 1, category: 'Waterfront', hostId: 'host-2', description: 'A bright apartment overlooking the Bay of Tangier, close to the Kasbah and ferry port.' },
  { id: 'prop-16', name: 'Kasbah Hill Villa', city: 'Tangier', lat: 35.7875, lng: -5.8106, type: 'Villa', price: 225, rating: 4.9, reviews: 96, guests: 8, bedrooms: 4, beds: 4, baths: 3, category: 'Historic', hostId: 'host-4', description: 'A grand villa perched above the Kasbah with terraced gardens and Strait views.', instantBook: true },
  { id: 'prop-17', name: 'Atlas Foothills Lodge', city: 'Ourika', lat: 31.39, lng: -7.79, type: 'Luxury Camp', price: 275, rating: 4.93, reviews: 118, guests: 6, bedrooms: 3, beds: 3, baths: 3, category: 'Mountain', hostId: 'host-6', description: 'A luxury camp at the foot of the High Atlas with valley views, fireplaces and starry skies.', guestFav: true, verified: true },
  { id: 'prop-18', name: 'Erg Chebbi Desert Camp', city: 'Merzouga', lat: 31.0791, lng: -4.004, type: 'Luxury Camp', price: 190, rating: 4.85, reviews: 154, guests: 4, bedrooms: 2, beds: 2, baths: 1, category: 'Desert', hostId: 'host-2', description: 'Glamping in the erg dunes with traditional tents, camel treks and desert banquets.' },
  { id: 'prop-19', name: 'Cedars Alpine Chalet', city: 'Ifrane', lat: 33.5228, lng: -5.1104, type: 'Cabin', price: 140, rating: 4.78, reviews: 59, guests: 5, bedrooms: 3, beds: 4, baths: 2, category: 'Alpine', hostId: 'host-3', description: 'A Swiss-style chalet in the cedar forests of Ifrane, near the Azrou cedar forest.' },
  { id: 'prop-20', name: 'Agadir Beachfront Condo', city: 'Agadir', lat: 30.4278, lng: -9.5981, type: 'Apartment', price: 95, rating: 4.6, reviews: 41, guests: 4, bedrooms: 2, beds: 2, baths: 2, category: 'Beachfront', hostId: 'host-5', description: 'A modern beachfront condo with direct access to Agadir’s long sandy bay.' },
  { id: 'prop-21', name: 'Casablanca Corniche Apt', city: 'Casablanca', lat: 33.592, lng: -7.62, type: 'Apartment', price: 130, rating: 4.58, reviews: 66, guests: 5, bedrooms: 3, beds: 3, baths: 2, category: 'Waterfront', hostId: 'host-6', description: 'A stylish apartment along the Ain Diab corniche with ocean balconies and nightlife nearby.' },
  { id: 'prop-22', name: 'Anfa Executive Suite', city: 'Casablanca', lat: 33.5811, lng: -7.628, type: 'Luxury Suite', price: 210, rating: 4.74, reviews: 88, guests: 3, bedrooms: 2, beds: 2, baths: 2, category: 'Business', hostId: 'host-1', description: 'A refined executive suite in the upscale Anfa district with pool and gym access.' },
  { id: 'prop-23', name: 'Fes Medine Palace Riad', city: 'Fes', lat: 34.0611, lng: -4.9945, type: 'Riad', price: 150, rating: 4.82, reviews: 73, guests: 6, bedrooms: 3, beds: 3, baths: 3, category: 'Historic', hostId: 'host-4', description: 'A 17th-century riad with intricate zellige, tiled courtyard and rooftop over the old medina.', verified: true },
  { id: 'prop-24', name: 'Kasbah Desert Villa', city: 'Ouarzazate', lat: 30.9184, lng: -6.8934, type: 'Villa', price: 165, rating: 4.7, reviews: 52, guests: 7, bedrooms: 3, beds: 4, baths: 3, category: 'Desert', hostId: 'host-3', description: 'A fortified kasbah-style villa at the gateway to the Sahara, near the film studios.' },
  { id: 'prop-25', name: 'Rabat Oudayas Riad', city: 'Rabat', lat: 34.0243, lng: -6.8201, type: 'Riad', price: 115, rating: 4.66, reviews: 49, guests: 5, bedrooms: 3, beds: 3, baths: 2, category: 'Historic', hostId: 'host-5', description: 'A quiet riad in the blue-and-white Oudayas quarter overlooking the river mouth.' },
  { id: 'prop-26', name: 'Taghazout Surf House', city: 'Taghazout', lat: 30.5425, lng: -9.7092, type: 'Guesthouse', price: 80, rating: 4.55, reviews: 134, guests: 8, bedrooms: 4, beds: 6, baths: 3, category: 'Surf', hostId: 'host-2', description: 'A laid-back surf house minutes from the breaks at Anchor Point and Hash Point.', instantBook: true },
  { id: 'prop-27', name: 'Oualidia Lagoon Escape', city: 'Oualidia', lat: 32.7383, lng: -9.026, type: 'House', price: 145, rating: 4.79, reviews: 42, guests: 6, bedrooms: 3, beds: 3, baths: 2, category: 'Lagoon', hostId: 'host-1', description: 'A tranquil home on the protected lagoon of Oualidia, ideal for oyster lovers and birdwatchers.' },
  { id: 'prop-28', name: 'Tetouan Andalusian Home', city: 'Tetouan', lat: 35.573, lng: -5.3689, type: 'House', price: 90, rating: 4.61, reviews: 33, guests: 4, bedrooms: 2, beds: 3, baths: 1, category: 'Historic', hostId: 'host-3', description: 'An Andalusian-style home in the white city of Tetouan with tiled courtyards.' },
  { id: 'prop-29', name: 'Jebala Hills Cabin', city: 'Chefchaouen', lat: 35.14, lng: -5.29, type: 'Cabin', price: 105, rating: 4.58, reviews: 29, guests: 3, bedrooms: 2, beds: 2, baths: 1, category: 'Mountain', hostId: 'host-5', description: 'A rustic cabin in the Jebala hills with cascading terraces and hiking trails.' },
  { id: 'prop-30', name: 'Mirleft Cliff Villa', city: 'Mirleft', lat: 29.58, lng: -10.03, type: 'Villa', price: 175, rating: 4.83, reviews: 61, guests: 6, bedrooms: 3, beds: 3, baths: 3, category: 'Ocean view', hostId: 'host-4', description: 'A dramatic cliffside villa overlooking wild Atlantic surf and unspoiled beaches.', verified: true },
  { id: 'prop-31', name: 'Sidi Ifni Art Deco House', city: 'Sidi Ifni', lat: 29.38, lng: -10.17, type: 'House', price: 85, rating: 4.52, reviews: 27, guests: 4, bedrooms: 2, beds: 2, baths: 1, category: 'Art-deco', hostId: 'host-6', description: 'A restored art-deco house overlooking the Atlantic in a sleepy coastal town.' },
  { id: 'prop-32', name: 'Dunes Panorama Camp', city: 'Merzouga', lat: 31.13, lng: -3.98, type: 'Luxury Camp', price: 205, rating: 4.87, reviews: 79, guests: 5, bedrooms: 3, beds: 3, baths: 2, category: 'Desert', hostId: 'host-2', description: 'Premium desert tents with private terraces facing the great Erg Chebbi dunes.', guestFav: true },
];

function buildSeedProperty(seed: Seed, index: number): Property {
  const gallery = buildGallery(seed.type, index + 1);
  const cover = gallery.find((g) => g.isCover) || gallery[0];
  const image = cover.url;
  const images = gallery.map((g) => g.url);
  const host = HOSTS[seed.hostId] || HOSTS['host-1'];
  const defaultAm = DEFAULT_AMENITIES[seed.category.toLowerCase()] || DEFAULT_AMENITIES['city'];

  return {
    id: seed.id,
    name: seed.name,
    location: seed.city,
    city: seed.city,
    country: 'Morocco',
    lat: seed.lat,
    lng: seed.lng,
    type: seed.type,
    category: seed.category,
    rating: seed.rating,
    reviews: seed.reviews,
    guests: seed.guests,
    bedrooms: seed.bedrooms,
    beds: seed.beds,
    baths: seed.baths,
    price: seed.price,
    weeklyPrice: Math.round(seed.price * 6.1),
    monthlyPrice: Math.round(seed.price * 21),
    cleaningFee: Math.round(seed.price * 0.35),
    serviceFee: Math.round(seed.price * 0.14),
    image,
    images,
    gallery,
    coverImage: image,
    description: seed.description,
    amenities: defaultAm,
    host,
    isGuestFavorite: seed.guestFav ?? false,
    isVerified: seed.verified ?? false,
    isInstantBook: seed.instantBook ?? index % 2 === 0,
    cancellationPolicy: 'flexible',
    availableDates: [],
    createdAt: '2026-08-15',
  };
}

export const EXTRA_PROPERTIES: Property[] = EXTRA_SEEDS.map(buildSeedProperty);
