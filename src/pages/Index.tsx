import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Droplets, 
  Users, 
  Calendar, 
  Shield,
  Activity,
  ArrowRight,
  CheckCircle,
  Star,
  Building
} from 'lucide-react';
import medicalHero from '@/assets/medical-hero.jpg';

const Index = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Real-time Inventory',
      description: 'Track blood levels across all hospitals in real-time with automated alerts for low stock.'
    },
    {
      icon: Users,
      title: 'Donor Management',
      description: 'Comprehensive donor database with eligibility tracking and communication tools.'
    },
    {
      icon: Calendar,
      title: 'Donation Drives',
      description: 'Organize and manage blood donation events with registration and logistics support.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant platform with enterprise-grade security and data protection.'
    },
    {
      icon: Activity,
      title: 'Analytics Dashboard',
      description: 'Powerful insights and reporting tools to optimize blood management operations.'
    },
    {
      icon: Building,
      title: 'Multi-Hospital Network',
      description: 'Connect multiple hospitals and blood banks in a unified management system.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      hospital: 'City General Hospital',
      content: 'BloodFlow Nexus has revolutionized our blood management. We\'ve reduced waste by 40% and improved emergency response times.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Blood Bank Manager',
      hospital: 'Metro Medical Center',
      content: 'The real-time inventory tracking and automated alerts have made our operations so much more efficient.',
      rating: 5
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Lives Saved' },
    { value: '500+', label: 'Hospitals Connected' },
    { value: '100,000+', label: 'Donors Registered' },
    { value: '99.9%', label: 'System Uptime' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">BloodFlow Nexus</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="medical">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${medicalHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Saving Lives Through
              <span className="block text-primary-glow">Smart Blood Management</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Connect donors, hospitals, and patients in a seamless ecosystem that ensures blood is always available when lives depend on it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" variant="default" className="bg-white text-primary hover:bg-white/90">
                  Start Saving Lives
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Blood Management Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage blood donations, inventory, and distribution 
              in one comprehensive platform designed for healthcare professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-medical transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what medical professionals are saying about BloodFlow Nexus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-medical transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.hospital}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Blood Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of healthcare professionals who trust BloodFlow Nexus 
              to manage their blood donation and distribution operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" variant="default" className="bg-white text-primary hover:bg-white/90">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">BloodFlow Nexus</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting lives through technology and compassion
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Contact Support</a>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
              <p>&copy; 2024 BloodFlow Nexus. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
