import StaticPage from '@/components/common/StaticPage';

export default function TermsPage() {
  return (
    <StaticPage title="Terms of service" subtitle="The terms that govern your use of NESTORA.">
      <h3 className="text-xl font-bold text-navy">Your use of NESTORA</h3>
      <p>
        By using NESTORA, you agree to provide accurate information, respect fellow guests and
        hosts, and use our platform for legitimate travel purposes only.
      </p>
      <h3 className="text-xl font-bold text-navy">Bookings & payments</h3>
      <p>
        When you book a stay, you agree to the property&apos;s cancellation policy and to pay all
        applicable fees. Hosts set their own pricing and house rules.
      </p>
      <h3 className="text-xl font-bold text-navy">Liability</h3>
      <p>
        NESTORA is not a party to the underlying stay between guest and host, but we are committed
        to resolving issues fairly through our support team.
      </p>
    </StaticPage>
  );
}