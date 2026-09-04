import StaticPage from '@/components/common/StaticPage';

export default function AboutPage() {
  return (
    <StaticPage title="About NESTORA" subtitle="Discover places worth remembering.">
      <p>
        NESTORA is a curated accommodation marketplace that connects thoughtful travelers with
        extraordinary places to stay. From the blue streets of Chefchaouen to the golden dunes of
        the Sahara, we help you find spaces that feel like more than just a room.
      </p>
      <p>
        Our mission is simple: to make travel feel personal. Every property on NESTORA is chosen
        for character, warmth, and the story it tells. We partner with local hosts who pour care
        into every detail — so your stay feels authentic, welcoming, and unforgettable.
      </p>
      <h3 className="text-xl font-bold text-navy">Our values</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Trust</strong> — verified hosts, transparent pricing, and 24/7 support.</li>
        <li><strong>Warmth</strong> — hospitality that makes you feel at home, anywhere.</li>
        <li><strong>Discovery</strong> — places you won&apos;t find anywhere else.</li>
      </ul>
      <p>
        Whether you&apos;re planning a weekend escape or a month-long journey, NESTORA is here to
        help you belong wherever you go.
      </p>
    </StaticPage>
  );
}