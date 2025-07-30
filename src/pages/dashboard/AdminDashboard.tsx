import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  Shield,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

export default function AdminDashboard() {
  const systemStats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+127',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Active Hospitals',
      value: '142',
      change: '+8',
      trend: 'up',
      icon: Building,
      color: 'text-info'
    },
    {
      title: 'Total Donations',
      value: '15,692',
      change: '+342',
      trend: 'up',
      icon: Activity,
      color: 'text-success'
    },
    {
      title: 'Critical Alerts',
      value: '12',
      change: '-3',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-warning'
    }
  ];

  const pendingVerifications = [
    {
      id: 1,
      name: 'Metro General Hospital',
      type: 'Hospital',
      location: 'New York, NY',
      submittedAt: '2024-01-18',
      documents: 4,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Community Health Center',
      type: 'Clinic',
      location: 'Los Angeles, CA',
      submittedAt: '2024-01-17',
      documents: 3,
      status: 'under_review'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Blood Shortage Alert',
      message: 'O- blood type critically low across 3 hospitals',
      timestamp: '2024-01-20T10:30:00',
      urgent: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Server Performance',
      message: 'API response time increased by 15%',
      timestamp: '2024-01-20T09:15:00',
      urgent: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight 2-4 AM',
      timestamp: '2024-01-20T08:45:00',
      urgent: false
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-destructive bg-destructive/10';
      case 'warning': return 'border-warning bg-warning/10';
      case 'info': return 'border-info bg-info/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const TrendIcon = getTrendIcon(stat.trend);
          return (
            <Card key={index} className="hover:shadow-medical transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className={`flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span className="text-sm">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Critical System Alerts */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            System Alerts
          </CardTitle>
          <CardDescription>
            Critical system notifications requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{alert.title}</p>
                      {alert.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Pending Verifications
                </CardTitle>
                <CardDescription>
                  Hospitals and clinics awaiting verification
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                {pendingVerifications.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((verification) => (
                <div key={verification.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">{verification.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {verification.type} • {verification.location}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Submitted: {new Date(verification.submittedAt).toLocaleDateString()}</span>
                        <span>{verification.documents} documents</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {verification.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="success" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Performance
            </CardTitle>
            <CardDescription>
              Real-time system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Response Time</span>
                  <span className="text-success">142ms</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database Performance</span>
                  <span className="text-success">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Uptime</span>
                  <span className="text-success">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Connections</span>
                  <span className="text-warning">1,247</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-success">99.9%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-info">1.2k</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">42ms</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <PieChart className="w-4 h-4" />
              User Demographics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <LineChart className="w-4 h-4" />
              Donation Trends
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <BarChart3 className="w-4 h-4" />
              Hospital Performance
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Activity className="w-4 h-4" />
              System Usage
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>
              Latest administrative actions and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="font-medium">Hospital verified successfully</p>
                  <p className="text-sm text-muted-foreground">
                    City Medical Center completed verification process
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-info/10 rounded-lg">
                <Users className="w-5 h-5 text-info" />
                <div className="flex-1">
                  <p className="font-medium">New user registrations</p>
                  <p className="text-sm text-muted-foreground">
                    15 new users registered in the last hour
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium">System maintenance reminder</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance window starts in 2 hours
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">30 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}