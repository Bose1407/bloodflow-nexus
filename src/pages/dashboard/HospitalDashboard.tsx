import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  Users, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export default function HospitalDashboard() {
  const inventoryData = [
    { bloodType: 'O+', current: 45, minimum: 20, status: 'good', color: 'bg-success' },
    { bloodType: 'O-', current: 12, minimum: 15, status: 'low', color: 'bg-warning' },
    { bloodType: 'A+', current: 32, minimum: 20, status: 'good', color: 'bg-success' },
    { bloodType: 'A-', current: 8, minimum: 10, status: 'critical', color: 'bg-destructive' },
    { bloodType: 'B+', current: 25, minimum: 20, status: 'good', color: 'bg-success' },
    { bloodType: 'B-', current: 5, minimum: 10, status: 'critical', color: 'bg-destructive' },
    { bloodType: 'AB+', current: 18, minimum: 15, status: 'good', color: 'bg-success' },
    { bloodType: 'AB-', current: 3, minimum: 8, status: 'critical', color: 'bg-destructive' },
  ];

  const pendingRequests = [
    {
      id: 1,
      patient: 'John Doe',
      bloodType: 'O-',
      quantity: '2 units',
      urgency: 'high',
      requestedAt: '2024-01-20T10:30:00',
      hospital: 'Emergency Unit'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      bloodType: 'A+',
      quantity: '1 unit',
      urgency: 'medium',
      requestedAt: '2024-01-20T09:15:00',
      hospital: 'Surgery Department'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      bloodType: 'B-',
      quantity: '3 units',
      urgency: 'high',
      requestedAt: '2024-01-20T08:45:00',
      hospital: 'ICU'
    }
  ];

  const quickStats = [
    {
      title: 'Total Inventory',
      value: '148 units',
      change: '+12',
      icon: Droplets,
      color: 'text-primary'
    },
    {
      title: 'Pending Requests',
      value: '12',
      change: '+3',
      icon: FileText,
      color: 'text-warning'
    },
    {
      title: 'Approved Today',
      value: '8',
      change: '+2',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Critical Levels',
      value: '3',
      change: '0',
      icon: AlertTriangle,
      color: 'text-destructive'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInventoryPercentage = (current: number, minimum: number) => {
    return Math.min((current / (minimum * 2)) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medical transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-sm text-success">({stat.change})</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Alerts */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Critical Inventory Alerts
          </CardTitle>
          <CardDescription>
            Blood types that require immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inventoryData.filter(item => item.status === 'critical').map((item) => (
              <div key={item.bloodType} className="flex items-center justify-between p-3 bg-background rounded-lg border border-destructive/20">
                <div>
                  <p className="font-medium">{item.bloodType}</p>
                  <p className="text-sm text-muted-foreground">{item.current} units left</p>
                </div>
                <Button size="sm" variant="destructive">
                  Order Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Inventory Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Blood Inventory Levels
                </CardTitle>
                <CardDescription>
                  Current stock levels for all blood types
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryData.map((item) => (
                <div key={item.bloodType} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.bloodType}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.current} units
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Min: {item.minimum}
                    </span>
                  </div>
                  <Progress 
                    value={getInventoryPercentage(item.current, item.minimum)} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Pending Requests Queue
                </CardTitle>
                <CardDescription>
                  Blood requests awaiting approval
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{request.patient}</p>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.hospital} • {request.bloodType} • {request.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(request.requestedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="success" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical" className="w-full justify-start gap-3">
              <Droplets className="w-4 h-4" />
              Add Blood Stock
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Users className="w-4 h-4" />
              Register Donor
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <TrendingUp className="w-4 h-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and updates in your blood bank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="font-medium">Blood request approved</p>
                  <p className="text-sm text-muted-foreground">
                    2 units of O+ blood approved for Emergency Unit
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-info/10 rounded-lg">
                <Droplets className="w-5 h-5 text-info" />
                <div className="flex-1">
                  <p className="font-medium">New blood stock added</p>
                  <p className="text-sm text-muted-foreground">
                    5 units of A+ blood added to inventory
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium">Low inventory alert</p>
                  <p className="text-sm text-muted-foreground">
                    B- blood type is running low (5 units remaining)
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}