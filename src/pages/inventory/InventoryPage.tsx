import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, Plus, AlertTriangle, Calendar, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function InventoryPage() {
  const { hasRole } = useAuth();
  const queryClient = useQueryClient();
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [stockForm, setStockForm] = useState({
    bloodGroup: '',
    quantity: '',
    expiryDate: '',
    donorId: '',
  });

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryAPI.getInventory(),
    select: (response) => response.data,
  });

  const addStockMutation = useMutation({
    mutationFn: (data: any) => inventoryAPI.addStock(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blood stock added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      setIsAddStockOpen(false);
      setStockForm({ bloodGroup: '', quantity: '', expiryDate: '', donorId: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add stock",
        variant: "destructive",
      });
    },
  });

  if (!hasRole('hospital') && !hasRole('admin')) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to view this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (quantity < 5) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    addStockMutation.mutate({
      ...stockForm,
      quantity: parseInt(stockForm.quantity),
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blood Inventory</h1>
          </div>
          <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Blood Stock</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddStock} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={stockForm.bloodGroup} onValueChange={(value) => setStockForm({...stockForm, bloodGroup: value})}>
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
                    value={stockForm.quantity}
                    onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={stockForm.expiryDate}
                    onChange={(e) => setStockForm({...stockForm, expiryDate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorId">Donor ID (Optional)</Label>
                  <Input
                    id="donorId"
                    value={stockForm.donorId}
                    onChange={(e) => setStockForm({...stockForm, donorId: e.target.value})}
                    placeholder="Enter donor ID"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={addStockMutation.isPending}>
                  {addStockMutation.isPending ? 'Adding...' : 'Add Stock'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Blood Group Inventory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodGroups.map((bloodGroup) => {
            const groupInventory = inventory?.inventory?.find((item: any) => item.bloodGroup === bloodGroup);
            const quantity = groupInventory?.totalUnits || 0;
            const expiringSoon = groupInventory?.expiringSoon || 0;
            const status = getStockStatus(quantity);

            return (
              <Card key={bloodGroup} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-primary">{bloodGroup}</CardTitle>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Available Units</span>
                      <span className="text-2xl font-bold">{quantity}</span>
                    </div>
                    {expiringSoon > 0 && (
                      <div className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">{expiringSoon} expiring soon</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Last updated: {groupInventory?.lastUpdated ? new Date(groupInventory.lastUpdated).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory?.summary?.totalUnits || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory?.summary?.expiringSoon || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory?.summary?.criticalStock || 0}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}