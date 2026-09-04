import StaticPage from '@/components/common/StaticPage';

export default function ContactPage() {
  return (
    <StaticPage title="Contact us" subtitle="We're here to help, 24/7.">
      <p>
        Have a question about a booking, need help with your account, or want to become a host?
        Our team is always happy to help.
      </p>
      <h3 className="text-xl font-bold text-navy">Ways to reach us</h3>
      <ul className="space-y-3">
        <li><strong>Email:</strong> support@nestora.com</li>
        <li><strong>Phone:</strong> +212 5 22 00 00 00</li>
        <li><strong>Head office:</strong> Marrakech, Morocco</li>
      </ul>
      <p>
        For urgent travel assistance, our support team is available around the clock. You can also
        reach any host directly from your messages page.
      </p>
    </StaticPage>
  );
}