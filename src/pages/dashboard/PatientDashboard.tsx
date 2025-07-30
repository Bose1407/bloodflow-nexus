import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  Calendar, 
  Heart, 
  Users, 
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  Plus,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();

  const overviewStats = [
    {
      title: 'Blood Group',
      value: user?.bloodGroup || 'Not Set',
      icon: Droplets,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Donations',
      value: '8',
      icon: Heart,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Lives Saved',
      value: '24',
      icon: Users,
      color: 'text-info',
      bgColor: 'bg-info/10'
    },
    {
      title: 'Next Eligible',
      value: '32 days',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const recentRequests = [
    {
      id: 1,
      hospital: 'City General Hospital',
      bloodType: 'O+',
      quantity: '2 units',
      status: 'approved',
      date: '2024-01-15',
      urgent: false
    },
    {
      id: 2,
      hospital: 'Emergency Medical Center',
      bloodType: 'O+',
      quantity: '1 unit',
      status: 'pending',
      date: '2024-01-12',
      urgent: true
    }
  ];

  const upcomingDrives = [
    {
      id: 1,
      title: 'Community Blood Drive',
      organizer: 'Red Cross Society',
      date: '2024-02-01',
      time: '09:00 AM - 5:00 PM',
      location: 'Community Center',
      registered: true
    },
    {
      id: 2,
      title: 'University Blood Donation',
      organizer: 'City University',
      date: '2024-02-05',
      time: '10:00 AM - 4:00 PM',
      location: 'University Campus',
      registered: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const donationEligibility = 85; // Example percentage

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medical transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks you can perform quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical" className="w-full justify-start gap-3">
              <Droplets className="w-4 h-4" />
              Request Blood
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Calendar className="w-4 h-4" />
              Find Donation Drives
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Heart className="w-4 h-4" />
              Schedule Donation
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Activity className="w-4 h-4" />
              Health Check
            </Button>
          </CardContent>
        </Card>

        {/* Donation Eligibility */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Donation Eligibility
            </CardTitle>
            <CardDescription>
              Your current eligibility status for blood donation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Health Score</span>
                <span className="text-sm text-muted-foreground">{donationEligibility}%</span>
              </div>
              <Progress value={donationEligibility} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Weight: Above 50kg</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Age: 18-65 years</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-warning" />
                <span>Last donation: 2 months ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Health: Good condition</span>
              </div>
            </div>

            <div className="bg-success/10 p-4 rounded-lg mt-4">
              <p className="text-sm text-success font-medium">
                ✓ You're eligible to donate blood in 32 days!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We'll send you a reminder when you're eligible again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Recent Blood Requests
            </CardTitle>
            <CardDescription>
              Your recent blood donation requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.hospital}</p>
                      {request.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.bloodType} • {request.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested on {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              ))}
              
              {recentRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No blood requests yet</p>
                  <Button variant="outline" className="mt-2">
                    Make Your First Request
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Drives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Donation Drives
            </CardTitle>
            <CardDescription>
              Blood drives happening near you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDrives.map((drive) => (
                <div key={drive.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{drive.title}</h4>
                      <p className="text-sm text-muted-foreground">{drive.organizer}</p>
                    </div>
                    {drive.registered ? (
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Registered
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(drive.date).toLocaleDateString()} • {drive.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{drive.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}