import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driveAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Users, Plus, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function DrivesPage() {
  const { hasRole, user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [driveForm, setDriveForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    requirements: '',
  });

  const { data: drives, isLoading } = useQuery({
    queryKey: ['drives'],
    queryFn: () => driveAPI.getDrives(),
    select: (response) => response.data,
  });

  const createDriveMutation = useMutation({
    mutationFn: (data: any) => driveAPI.createDrive(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Donation drive created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['drives'] });
      setIsCreateDriveOpen(false);
      setDriveForm({
        title: '',
        description: '',
        location: '',
        date: '',
        startTime: '',
        endTime: '',
        capacity: '',
        requirements: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create drive",
        variant: "destructive",
      });
    },
  });

  const registerForDriveMutation = useMutation({
    mutationFn: (id: string) => driveAPI.registerForDrive(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Registered for donation drive successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['drives'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to register for drive",
        variant: "destructive",
      });
    },
  });

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    createDriveMutation.mutate({
      ...driveForm,
      capacity: parseInt(driveForm.capacity),
      dateTime: `${driveForm.date}T${driveForm.startTime}`,
      endDateTime: `${driveForm.date}T${driveForm.endTime}`,
    });
  };

  const getStatusBadge = (drive: any) => {
    const now = new Date();
    const driveDate = new Date(drive.dateTime);
    const endDate = new Date(drive.endDateTime);
    
    if (now < driveDate) {
      return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" />Upcoming</Badge>;
    } else if (now >= driveDate && now <= endDate) {
      return <Badge variant="default" className="gap-1"><Users className="w-3 h-3" />Active</Badge>;
    } else {
      return <Badge variant="outline" className="gap-1"><CheckCircle className="w-3 h-3" />Completed</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Donation Drives</h1>
          </div>
          {(hasRole('hospital') || hasRole('admin')) && (
            <Dialog open={isCreateDriveOpen} onOpenChange={setIsCreateDriveOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Drive
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Donation Drive</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateDrive} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Drive Title</Label>
                    <Input
                      id="title"
                      value={driveForm.title}
                      onChange={(e) => setDriveForm({...driveForm, title: e.target.value})}
                      placeholder="e.g., Community Blood Drive"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={driveForm.description}
                      onChange={(e) => setDriveForm({...driveForm, description: e.target.value})}
                      placeholder="Describe the purpose and details of the drive..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={driveForm.location}
                      onChange={(e) => setDriveForm({...driveForm, location: e.target.value})}
                      placeholder="Full address of the drive location"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={driveForm.date}
                        onChange={(e) => setDriveForm({...driveForm, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={driveForm.startTime}
                        onChange={(e) => setDriveForm({...driveForm, startTime: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={driveForm.endTime}
                        onChange={(e) => setDriveForm({...driveForm, endTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Expected Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={driveForm.capacity}
                      onChange={(e) => setDriveForm({...driveForm, capacity: e.target.value})}
                      placeholder="Expected number of donors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={driveForm.requirements}
                      onChange={(e) => setDriveForm({...driveForm, requirements: e.target.value})}
                      placeholder="Any special requirements or instructions for donors..."
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createDriveMutation.isPending}>
                    {createDriveMutation.isPending ? 'Creating...' : 'Create Drive'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Drives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading drives...</p>
            </div>
          ) : (
            drives?.drives?.map((drive: any) => (
              <Card key={drive.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{drive.title}</CardTitle>
                    {getStatusBadge(drive)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {drive.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {new Date(drive.dateTime).toLocaleDateString()} at{' '}
                        {new Date(drive.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="line-clamp-1">{drive.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{drive.registeredCount || 0} / {drive.capacity} registered</span>
                    </div>
                  </div>

                  {drive.requirements && (
                    <div className="text-sm">
                      <p className="font-medium text-muted-foreground mb-1">Requirements:</p>
                      <p className="text-sm line-clamp-2">{drive.requirements}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {hasRole('patient') && new Date(drive.dateTime) > new Date() && (
                      <Button 
                        variant="medical" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => registerForDriveMutation.mutate(drive.id)}
                        disabled={registerForDriveMutation.isPending || drive.isRegistered}
                      >
                        {drive.isRegistered ? 'Registered' : 'Register'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {drives?.drives?.length === 0 && !isLoading && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Donation Drives</h3>
              <p className="text-muted-foreground">
                There are no donation drives scheduled at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}