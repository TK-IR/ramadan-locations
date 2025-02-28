
import React, { useState } from 'react';
import { Check, X, Edit, Trash2, Eye, Clock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  useSubmissions, 
  useApproveSubmission, 
  useRejectSubmission, 
  useDeleteSubmission,
  useUpdateSubmission
} from '@/hooks/use-data';

export interface Submission {
  id: string;
  mosqueName: string;
  address: string;
  suburb: string;
  state: string;
  time: string;
  rakaat: string;
  hasWomensArea: boolean;
  hasWuduFacilities: boolean;
  hasParking: boolean;
  parkingType?: 'Street' | 'Dedicated';
  submitterName: string;
  submitterEmail: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const { data: submissions = [], isLoading } = useSubmissions();
  const approveSubmission = useApproveSubmission();
  const rejectSubmission = useRejectSubmission();
  const deleteSubmission = useDeleteSubmission();
  const updateSubmission = useUpdateSubmission();
  
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedSubmission, setEditedSubmission] = useState<Partial<Submission>>({});
  
  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected');
  
  const handleApprove = async (submission: Submission) => {
    try {
      await approveSubmission.mutateAsync(submission.id);
      toast({
        title: "Submission Approved",
        description: `"${submission.mosqueName}" has been approved and published.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to approve submission",
        variant: "destructive",
      });
    }
  };
  
  const handleReject = async (submission: Submission) => {
    try {
      await rejectSubmission.mutateAsync(submission.id);
      toast({
        title: "Submission Rejected",
        description: `"${submission.mosqueName}" has been rejected.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to reject submission",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async () => {
    if (selectedSubmission) {
      try {
        await deleteSubmission.mutateAsync(selectedSubmission.id);
        setIsDeleteDialogOpen(false);
        toast({
          title: "Submission Deleted",
          description: `"${selectedSubmission.mosqueName}" has been deleted.`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete submission",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleEdit = async () => {
    if (selectedSubmission && Object.keys(editedSubmission).length > 0) {
      try {
        await updateSubmission.mutateAsync({ 
          id: selectedSubmission.id, 
          data: editedSubmission 
        });
        setIsEditDialogOpen(false);
        toast({
          title: "Submission Updated",
          description: `"${selectedSubmission.mosqueName}" has been updated.`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to update submission",
          variant: "destructive",
        });
      }
    }
  };
  
  const openViewDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsViewDialogOpen(true);
  };
  
  const openEditDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setEditedSubmission({});
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Admin Panel</h2>
          <p className="text-muted-foreground">
            Manage Taraweeh locations and review community submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Pending</span>
            <Badge variant="secondary" className="ml-1">{pendingSubmissions.length}</Badge>
          </Button>
          <Button className="bg-islamic-600 hover:bg-islamic-700 text-white">
            Add New Location
          </Button>
        </div>
      </div>
      
      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-islamic-300 border-t-islamic-600 rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading submissions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mosque Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rakaat</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.mosqueName}
                      </TableCell>
                      <TableCell>
                        {submission.suburb}, {submission.state}
                      </TableCell>
                      <TableCell>{submission.rakaat} Rakaat</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {submission.submitterName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {submission.status === 'pending' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Pending
                          </Badge>
                        )}
                        {submission.status === 'approved' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Approved
                          </Badge>
                        )}
                        {submission.status === 'rejected' && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Rejected
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(submission)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(submission)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          
                          {submission.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleApprove(submission)}
                                title="Approve"
                                disabled={approveSubmission.isPending}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleReject(submission)}
                                title="Reject"
                                disabled={rejectSubmission.isPending}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => openDeleteDialog(submission)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
            <DialogDescription>
              View complete information about this submission.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4 py-2">
              <div>
                <h3 className="font-medium">{selectedSubmission.mosqueName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedSubmission.address}, {selectedSubmission.suburb}, {selectedSubmission.state}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Prayer Time:</span>
                  <p>{selectedSubmission.time}</p>
                </div>
                <div>
                  <span className="font-medium">Rakaat:</span>
                  <p>{selectedSubmission.rakaat}</p>
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <h4 className="font-medium">Facilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.hasWomensArea && (
                    <Badge variant="outline">Women's Area</Badge>
                  )}
                  {selectedSubmission.hasWuduFacilities && (
                    <Badge variant="outline">Wudu Facilities</Badge>
                  )}
                  {selectedSubmission.hasParking && (
                    <Badge variant="outline">Parking</Badge>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-2 mt-4">
                <h4 className="font-medium text-sm">Submitted By:</h4>
                <p className="text-sm">{selectedSubmission.submitterName}</p>
                <p className="text-sm text-muted-foreground">{selectedSubmission.submitterEmail}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button variant="secondary" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedSubmission?.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  onClick={() => {
                    handleApprove(selectedSubmission);
                    setIsViewDialogOpen(false);
                  }}
                  disabled={approveSubmission.isPending}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  onClick={() => {
                    handleReject(selectedSubmission);
                    setIsViewDialogOpen(false);
                  }}
                  disabled={rejectSubmission.isPending}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Make changes to the location information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Mosque Name</Label>
                <Input 
                  id="edit-name" 
                  defaultValue={selectedSubmission.mosqueName}
                  onChange={(e) => setEditedSubmission({
                    ...editedSubmission, 
                    mosqueName: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input 
                  id="edit-address" 
                  defaultValue={selectedSubmission.address}
                  onChange={(e) => setEditedSubmission({
                    ...editedSubmission, 
                    address: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-suburb">Suburb</Label>
                  <Input 
                    id="edit-suburb" 
                    defaultValue={selectedSubmission.suburb}
                    onChange={(e) => setEditedSubmission({
                      ...editedSubmission, 
                      suburb: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-state">State</Label>
                  <Input 
                    id="edit-state" 
                    defaultValue={selectedSubmission.state}
                    onChange={(e) => setEditedSubmission({
                      ...editedSubmission, 
                      state: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Prayer Time</Label>
                  <Input 
                    id="edit-time" 
                    defaultValue={selectedSubmission.time}
                    onChange={(e) => setEditedSubmission({
                      ...editedSubmission, 
                      time: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rakaat">Rakaat</Label>
                  <Input 
                    id="edit-rakaat" 
                    defaultValue={selectedSubmission.rakaat}
                    onChange={(e) => setEditedSubmission({
                      ...editedSubmission, 
                      rakaat: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEdit} 
              className="bg-islamic-600 hover:bg-islamic-700 text-white"
              disabled={updateSubmission.isPending}
            >
              {updateSubmission.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this submission? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="py-2">
              <p className="font-medium">{selectedSubmission.mosqueName}</p>
              <p className="text-sm text-muted-foreground">
                {selectedSubmission.address}, {selectedSubmission.suburb}, {selectedSubmission.state}
              </p>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteSubmission.isPending}
            >
              {deleteSubmission.isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Deleting...
                </div>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
