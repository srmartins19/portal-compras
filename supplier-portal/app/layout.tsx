import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'BidFlow Supplier Portal', template: '%s | Supplier Portal' },
  description: 'Submit bids and manage procurement requests',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
