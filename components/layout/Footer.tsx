import React from 'react';

const FooterLogo: React.FC = () => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold">IPL</span>
    </div>
    <span className="text-xl font-bold text-white">IPL Dashboard</span>
  </div>
);

const FooterDescription: React.FC = () => (
  <p className="text-gray-400 mb-4">
    Your ultimate destination for IPL 2025 live updates, scores, and comprehensive cricket analytics.
  </p>
);

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
    <a href="https://twitter.com/IPL" target="_blank" rel="noopener noreferrer" 
       className="text-gray-400 hover:text-blue-400 transition-colors">
      Twitter
    </a>
    <a href="https://www.facebook.com/IPL/" target="_blank" rel="noopener noreferrer" 
       className="text-gray-400 hover:text-blue-400 transition-colors">
      Facebook
    </a>
  </div>
);

interface FooterSectionProps {
  title: string;
  links: Array<{ text: string; href: string; external?: boolean }>;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
  <div>
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a 
            href={link.href} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Copyright: React.FC = () => (
  <div className="border-t border-gray-700 mt-8 pt-8 text-center">
    <p className="text-gray-400">
      © 2025 IPL Dashboard. All rights reserved. This is a fan-made dashboard for educational purposes.
    </p>
  </div>
);

const Footer: React.FC = () => {
  const quickLinks = [
    { text: 'Live Matches', href: '#' },
    { text: 'Points Table', href: '#points' },
    { text: 'Match Schedule', href: '#matches' },
    { text: 'Analytics', href: '#history' }
  ];

  const teamLinks = [
    { text: 'Mumbai Indians', href: '#' },
    { text: 'Chennai Super Kings', href: '#' },
    { text: 'Royal Challengers', href: '#' },
    { text: 'Kolkata Knight Riders', href: '#' }
  ];

  const resourceLinks = [
    { text: 'Official IPL', href: 'https://www.iplt20.com/', external: true },
    { text: 'BCCI.TV', href: 'https://www.bcci.tv/', external: true },
    { text: 'WPL', href: 'https://www.wplt20.com/', external: true },
    { text: 'Contact Us', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <FooterLogo />
            <FooterDescription />
            <SocialLinks />
          </div>

          <FooterSection title="Quick Links" links={quickLinks} />
          <FooterSection title="Teams" links={teamLinks} />
          <FooterSection title="Resources" links={resourceLinks} />
        </div>

        <Copyright />
      </div>
    </footer>
  );
};

export default Footer; 