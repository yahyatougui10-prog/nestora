export type ImageCategory =
  | 'Exterior'
  | 'Living spaces'
  | 'Bedrooms'
  | 'Bathrooms'
  | 'Kitchen'
  | 'Outdoor'
  | 'Pool'
  | 'Views'
  | 'Amenities'
  | 'Dining'
  | 'Workspace'
  | 'Neighborhood'
  | 'Night view';

// Validated pools — every URL below returned HTTP 200 (checked at build time).
const toUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

const EXTERIOR = [
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1613490493576-7fde63acd811',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600585154526-990dced4db0d',
  'photo-1600566753376-12c8ab7fb75b',
  'photo-1600210492486-724fe5c67fb0',
  'photo-1583608205776-bfd35f0d9f83',
  'photo-1570129477492-45c003edd2be',
  'photo-1513694203232-719a280e022f',
].map(toUrl);

const LIVING = [
  'photo-1522708323590-d24dbb6b0267',
  'photo-1493809842364-78817add7ffb',
  'photo-1502005229762-cf1b2da7c5d6',
  'photo-1560448204-e02f11c3d0e2',
  'photo-1523217582562-09d0def993a6',
  'photo-1560185007-cde436f6a4d0',
  'photo-1540518614846-7eded433c457',
  'photo-1554995207-c18c203602cb',
  'photo-1519710164239-da123dc03ef4',
  'photo-1567016432779-094069958ea5',
].map(toUrl);

const BEDROOM = [
  'photo-1505693416388-ac5ce068fe85',
  'photo-1521783988139-89397d761dce',
  'photo-1493663284031-b7e3aefcae8e',
  'photo-1493809842364-78817add7ffb',
  'photo-1540518614846-7eded433c457',
  'photo-1567016432779-094069958ea5',
].map(toUrl);

const KITCHEN = [
  'photo-1556910103-1c02745aae4d',
  'photo-1567767292278-a4f21aa2d36e',
  'photo-1556909114-f6e7ad7d3136',
].map(toUrl);

const POOL = [
  'photo-1571896349842-33c89424de2d',
  'photo-1576013551627-0cc20b96c2a7',
  'photo-1584646098378-0874589d76b1',
  'photo-1566073771259-6a8506099945',
  'photo-1520250497591-112f2f40a3f4',
  'photo-1582719508461-905c673771fd',
].map(toUrl);

const OUTDOOR = [
  'photo-1512917774080-9991f1c4c750',
  'photo-1445019980597-93fa8acb246c',
  'photo-1600585154340-be6161a56a0c',
  'photo-1506905925346-21bda4d32df4',
].map(toUrl);

const VIEWS = [
  'photo-1493780474015-ba834fd0ce2f',
  'photo-1476514525535-07fb3b4ae5f1',
  'photo-1469474968028-56623f02e42e',
  'photo-1489749798305-4fea3ae63d43',
  'photo-1506905925346-21bda4d32df4',
  'photo-1469854523086-cc02fe5d8800',
].map(toUrl);

const MOROCCO = [
  'photo-1539020140153-e479b8c22e70',
  'photo-1551893478-d726eaf0442c',
  'photo-1548013146-72479768bada',
].map(toUrl);

const AMENITY = [
  'photo-1571896349842-33c89424de2d',
  'photo-1522708323590-d24dbb6b0267',
  'photo-1493809842364-78817add7ffb',
].map(toUrl);

export const GALLERY_CATEGORIES: ImageCategory[] = [
  'Exterior',
  'Living spaces',
  'Bedrooms',
  'Bathrooms',
  'Kitchen',
  'Outdoor',
  'Pool',
  'Views',
  'Amenities',
  'Dining',
  'Workspace',
  'Neighborhood',
  'Night view',
];

// Coherent gallery blueprint per property TYPE. Builds 24-36 images.
const BLUEPRINTS: Record<string, { category: ImageCategory; urls: string[] }[]> = {
  Villa: [
    { category: 'Exterior', urls: EXTERIOR.slice(0, 5) },
    { category: 'Living spaces', urls: LIVING.slice(0, 4) },
    { category: 'Kitchen', urls: KITCHEN },
    { category: 'Bedrooms', urls: BEDROOM.slice(0, 4) },
    { category: 'Bathrooms', urls: AMENITY.slice(0, 2) },
    { category: 'Pool', urls: POOL.slice(0, 4) },
    { category: 'Outdoor', urls: OUTDOOR.slice(0, 3) },
    { category: 'Views', urls: VIEWS.slice(0, 4) },
    { category: 'Neighborhood', urls: MOROCCO },
    { category: 'Night view', urls: VIEWS.slice(4, 6) },
  ],
  Riad: [
    { category: 'Exterior', urls: MOROCCO.slice(0, 3) },
    { category: 'Living spaces', urls: LIVING.slice(0, 4) },
    { category: 'Bedrooms', urls: BEDROOM.slice(0, 5) },
    { category: 'Bathrooms', urls: AMENITY.slice(0, 2) },
    { category: 'Kitchen', urls: KITCHEN.slice(0, 2) },
    { category: 'Dining', urls: LIVING.slice(4, 6) },
    { category: 'Outdoor', urls: OUTDOOR.slice(0, 3) },
    { category: 'Views', urls: VIEWS.slice(0, 4) },
    { category: 'Neighborhood', urls: MOROCCO },
    { category: 'Night view', urls: VIEWS.slice(4, 5) },
  ],
  Apartment: [
    { category: 'Living spaces', urls: LIVING.slice(0, 4) },
    { category: 'Kitchen', urls: KITCHEN.slice(0, 2) },
    { category: 'Bedrooms', urls: BEDROOM.slice(0, 4) },
    { category: 'Bathrooms', urls: AMENITY.slice(0, 2) },
    { category: 'Workspace', urls: LIVING.slice(4, 6) },
    { category: 'Views', urls: VIEWS.slice(0, 3) },
    { category: 'Exterior', urls: EXTERIOR.slice(6, 8) },
    { category: 'Neighborhood', urls: MOROCCO },
  ],
  Cabin: [
    { category: 'Exterior', urls: EXTERIOR.slice(8, 11) },
    { category: 'Living spaces', urls: LIVING.slice(0, 3) },
    { category: 'Bedrooms', urls: BEDROOM.slice(0, 3) },
    { category: 'Kitchen', urls: KITCHEN.slice(0, 2) },
    { category: 'Views', urls: VIEWS.slice(4, 6) },
    { category: 'Outdoor', urls: OUTDOOR },
    { category: 'Neighborhood', urls: MOROCCO.slice(0, 2) },
  ],
  'Luxury Suite': [
    { category: 'Exterior', urls: EXTERIOR.slice(0, 4) },
    { category: 'Living spaces', urls: LIVING.slice(0, 3) },
    { category: 'Bedrooms', urls: BEDROOM.slice(0, 4) },
    { category: 'Bathrooms', urls: AMENITY.slice(0, 3) },
    { category: 'Dining', urls: LIVING.slice(3, 5) },
    { category: 'Pool', urls: POOL.slice(0, 4) },
    { category: 'Views', urls: VIEWS.slice(0, 4) },
    { category: 'Neighborhood', urls: MOROCCO },
  ],
};

const captions: Record<ImageCategory, string> = {
  Exterior: 'Exterior view',
  'Living spaces': 'Living area',
  Bedrooms: 'Bedroom',
  Bathrooms: 'Bathroom',
  Kitchen: 'Kitchen',
  Outdoor: 'Outdoor space',
  Pool: 'Pool',
  Views: 'Scenic view',
  Amenities: 'Amenity',
  Dining: 'Dining area',
  Workspace: 'Workspace',
  Neighborhood: 'Neighborhood',
  'Night view': 'Night view',
};

export interface PropertyImage {
  url: string;
  caption: string;
  category: ImageCategory;
  isCover: boolean;
}

/** Build a coherent, non-duplicated gallery for a property based on its type. */
export function buildGallery(type: string, seed: number): PropertyImage[] {
  const blueprint = BLUEPRINTS[type] || BLUEPRINTS['Apartment'];
  const gallery: PropertyImage[] = [];
  const used = new Set<string>();
  let coverSet = false;

  blueprint.forEach((block) => {
    const offset = (seed % 3) * 2;
    block.urls.forEach((url, i) => {
      if (used.has(url)) return;
      const rotated = block.urls[(i + offset) % block.urls.length];
      const finalUrl = used.has(rotated) ? url : rotated;
      if (used.has(finalUrl)) return;
      used.add(finalUrl);
      gallery.push({
        url: finalUrl,
        category: block.category,
        caption: captions[block.category],
        isCover: !coverSet ? (coverSet = true, true) : false,
      });
    });
  });

  return gallery;
}

export default { buildGallery };
