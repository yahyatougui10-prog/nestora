import StaticPage from '@/components/common/StaticPage';

export default function SupportPage() {
  return (
    <StaticPage title="Help center" subtitle="Answers to common questions.">
      <h3 className="text-xl font-bold text-navy">How do I make a booking?</h3>
      <p>
        Browse or search for a stay, choose your dates and guests, and follow the booking steps.
        You&apos;ll receive confirmation right away.
      </p>
      <h3 className="text-xl font-bold text-navy">Can I cancel a trip?</h3>
      <p>
        Yes. Go to your Trips page, select the booking, and choose to cancel. Refunds depend on the
        property&apos;s cancellation policy.
      </p>
      <h3 className="text-xl font-bold text-navy">How do I contact a host?</h3>
      <p>
        Open any property and use the &quot;Contact host&quot; button, or find the host in your
        Messages page to chat directly.
      </p>
      <p>
        For anything else, reach our support team 24/7 — we&apos;re happy to help.
      </p>
    </StaticPage>
  );
}