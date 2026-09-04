import StaticPage from '@/components/common/StaticPage';

export default function SafetyPage() {
  return (
    <StaticPage title="Safety" subtitle="Your safety is our top priority.">
      <h3 className="text-xl font-bold text-navy">Verified stays</h3>
      <p>
        Every listing on NESTORA is reviewed to meet our quality and safety standards. Verified
        properties are clearly marked so you can book with confidence.
      </p>
      <h3 className="text-xl font-bold text-navy">Secure payments</h3>
      <p>
        All payments are processed securely and held safely until your stay begins. We never share
        your payment details with hosts.
      </p>
      <h3 className="text-xl font-bold text-navy">In-case-of-emergency</h3>
      <p>
        Our 24/7 support line can help you with urgent issues during your stay. Local emergency
        numbers are also shared with every guest at check-in.
      </p>
    </StaticPage>
  );
}