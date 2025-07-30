import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Loader2, Heart, User, Mail, Lock, Phone, MapPin, Droplets, Building, Calendar } from 'lucide-react';
import medicalHero from '@/assets/medical-hero.jpg';

export default function RegisterPage() {
  const { register, loading, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    address: '',
    // Patient specific
    bloodGroup: '',
    dateOfBirth: '',
    emergencyContact: '',
    medicalHistory: '',
    // Hospital specific
    hospitalName: '',
    licenseNumber: '',
    hospitalType: '',
    capacity: '',
    specializations: '',
    // Terms
    agreedToTerms: false,
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const hospitalTypes = ['Government', 'Private', 'Non-Profit', 'Specialty'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.name || !formData.email || !formData.password || !formData.role)) {
      alert('Please fill in all required fields');
      return;
    }
    setCurrentStep(2);
  };

  const prevStep = () => setCurrentStep(1);

  const progressPercentage = (currentStep / 2) * 100;

  const renderStepOne = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Enter your full name"
              className="pl-10"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="pl-10"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="pl-10"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Account Type *</Label>
        <Select onValueChange={(value) => handleInputChange('role', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Patient / Donor</SelectItem>
            <SelectItem value="hospital">Hospital / Blood Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="Enter your phone number"
              className="pl-10"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="address"
              placeholder="Enter your address"
              className="pl-10"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepTwo = () => {
    if (formData.role === 'patient') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Donor Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group *</Label>
              <Select onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="pl-10"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              placeholder="Emergency contact number"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
            <Input
              id="medicalHistory"
              placeholder="Any relevant medical conditions"
              value={formData.medicalHistory}
              onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
            />
          </div>
        </div>
      );
    }

    if (formData.role === 'hospital') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Hospital Information
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name *</Label>
            <Input
              id="hospitalName"
              placeholder="Enter hospital name"
              value={formData.hospitalName}
              onChange={(e) => handleInputChange('hospitalName', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                placeholder="Hospital license number"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospitalType">Hospital Type</Label>
              <Select onValueChange={(value) => handleInputChange('hospitalType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital type" />
                </SelectTrigger>
                <SelectContent>
                  {hospitalTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Bed Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Number of beds"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specializations">Specializations</Label>
              <Input
                id="specializations"
                placeholder="e.g., Cardiology, Trauma"
                value={formData.specializations}
                onChange={(e) => handleInputChange('specializations', e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${medicalHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-12 h-12" />
              <h1 className="text-4xl font-bold">Join BloodFlow Nexus</h1>
            </div>
            <p className="text-xl mb-4">Be Part of the Life-Saving Community</p>
            <p className="text-lg opacity-90">
              Whether you're a donor, hospital, or medical professional, join our platform to help save lives.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-lg">
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">BloodFlow Nexus</h1>
            </div>
          </div>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Step {currentStep} of 2 - {currentStep === 1 ? 'Basic Information' : 'Role-specific Details'}
              </CardDescription>
              <div className="mt-4">
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={currentStep === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                {currentStep === 1 ? renderStepOne() : renderStepTwo()}

                {currentStep === 2 && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreedToTerms', !!checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                )}

                <div className="flex gap-3">
                  {currentStep === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    type="submit"
                    variant="medical"
                    size="lg"
                    className={currentStep === 1 ? "w-full" : "flex-1"}
                    disabled={isSubmitting || loading}
                  >
                    {currentStep === 1 ? (
                      'Continue'
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}