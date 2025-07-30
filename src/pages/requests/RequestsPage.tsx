import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function RequestsPage() {
  const { hasRole, user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [requestForm, setRequestForm] = useState({
    bloodGroup: '',
    quantity: '',
    urgency: 'medium',
    reason: '',
    requiredDate: '',
    patientName: '',
    hospitalName: '',
  });

  const { data: requests, isLoading } = useQuery({
    queryKey: ['requests', statusFilter],
    queryFn: () => requestAPI.getRequests({ status: statusFilter }),
    select: (response) => response.data,
  });

  const createRequestMutation = useMutation({
    mutationFn: (data: any) => requestAPI.createRequest(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blood request created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      setIsCreateRequestOpen(false);
      setRequestForm({
        bloodGroup: '',
        quantity: '',
        urgency: 'medium',
        reason: '',
        requiredDate: '',
        patientName: '',
        hospitalName: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create request",
        variant: "destructive",
      });
    },
  });

  const approveRequestMutation = useMutation({
    mutationFn: (id: string) => requestAPI.approveRequest(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Request approved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to approve request",
        variant: "destructive",
      });
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => requestAPI.rejectRequest(id, reason),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Request rejected",
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reject request",
        variant: "destructive",
      });
    },
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'fulfilled': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'fulfilled': return 'default';
      default: return 'secondary';
    }
  };

  const getUrgencyVariant = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'secondary';
      case 'medium': return 'default';
      case 'high': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    createRequestMutation.mutate({
      ...requestForm,
      quantity: parseInt(requestForm.quantity),
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blood Requests</h1>
          </div>
          {(hasRole('hospital') || hasRole('patient')) && (
            <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Blood Request</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={requestForm.bloodGroup} onValueChange={(value) => setRequestForm({...requestForm, bloodGroup: value})}>
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
                      <Label htmlFor="quantity">Quantity (Units)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={requestForm.quantity}
                        onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select value={requestForm.urgency} onValueChange={(value) => setRequestForm({...requestForm, urgency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requiredDate">Required Date</Label>
                      <Input
                        id="requiredDate"
                        type="datetime-local"
                        value={requestForm.requiredDate}
                        onChange={(e) => setRequestForm({...requestForm, requiredDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={requestForm.patientName}
                        onChange={(e) => setRequestForm({...requestForm, patientName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        value={requestForm.hospitalName}
                        onChange={(e) => setRequestForm({...requestForm, hospitalName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Medical Reason</Label>
                    <Textarea
                      id="reason"
                      value={requestForm.reason}
                      onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})}
                      placeholder="Provide medical justification for the blood request..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createRequestMutation.isPending}>
                    {createRequestMutation.isPending ? 'Creating...' : 'Create Request'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading requests...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Required Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests?.requests?.map((request: any) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">#{request.id.slice(-8)}</TableCell>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10">
                          {request.bloodGroup}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.quantity} units</TableCell>
                      <TableCell>
                        <Badge variant={getUrgencyVariant(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(request.status)} className="gap-1">
                          {getStatusIcon(request.status)}
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(request.requiredDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          {hasRole('hospital') && request.status === 'pending' && (
                            <>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => approveRequestMutation.mutate(request.id)}
                                disabled={approveRequestMutation.isPending}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => rejectRequestMutation.mutate({ id: request.id, reason: 'Rejected by hospital' })}
                                disabled={rejectRequestMutation.isPending}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}