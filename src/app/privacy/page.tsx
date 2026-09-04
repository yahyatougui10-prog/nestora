import StaticPage from '@/components/common/StaticPage';

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy policy" subtitle="How we protect and handle your information.">
      <h3 className="text-xl font-bold text-navy">Information we collect</h3>
      <p>
        We collect the information you provide directly — such as your name, email address, phone
        number and preferences — along with information about how you use NESTORA.
      </p>
      <h3 className="text-xl font-bold text-navy">How we use it</h3>
      <p>
        Your information helps us provide our services, personalise your experience, process
        bookings, and keep your account secure. We never sell your personal data.
      </p>
      <h3 className="text-xl font-bold text-navy">Your choices</h3>
      <p>
        You can update your information, change your notification preferences, or delete your
        account at any time from your settings. Questions about privacy can be sent to
        privacy@nestora.com.
      </p>
    </StaticPage>
  );
}