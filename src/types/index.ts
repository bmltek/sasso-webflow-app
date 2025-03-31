export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  isScrolled: boolean;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  image?: string;
}