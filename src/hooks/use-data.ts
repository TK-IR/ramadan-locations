
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { adaptLocation, adaptSubmission, prepareSubmissionForInsert } from '@/lib/adapters';
import { Location } from '@/components/LocationCard';
import { Submission } from '@/components/AdminPanel';
import { useToast } from '@/hooks/use-toast';

// Hook for fetching locations
export function useLocations(queryParams?: { search?: string; suburb?: string; state?: string }) {
  return useQuery({
    queryKey: ['locations', queryParams],
    queryFn: async () => {
      let query = supabase
        .from('locations')
        .select('*');
      
      if (queryParams?.search) {
        query = query.ilike('name', `%${queryParams.search}%`);
      }
      
      if (queryParams?.suburb) {
        query = query.ilike('suburb', `%${queryParams.suburb}%`);
      }
      
      if (queryParams?.state) {
        query = query.ilike('state', `%${queryParams.state}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
      
      return data.map(adaptLocation);
    },
  });
}

// Hook for fetching featured locations
export function useFeaturedLocations() {
  return useQuery({
    queryKey: ['featuredLocations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .limit(3);
      
      if (error) {
        console.error('Error fetching featured locations:', error);
        throw error;
      }
      
      return data.map(adaptLocation);
    },
  });
}

// Hook for fetching submissions
export function useSubmissions() {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching submissions:', error);
        throw error;
      }
      
      return data.map(adaptSubmission);
    },
  });
}

// Hook for submitting a new location
export function useSubmitLocation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submission: ReturnType<typeof prepareSubmissionForInsert>) => {
      const { data, error } = await supabase
        .from('submissions')
        .insert(submission)
        .select()
        .single();
      
      if (error) {
        console.error('Error submitting location:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Submission Received",
        description: "Thank you for your contribution. Your submission will be reviewed shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your location. Please try again.",
        variant: "destructive",
      });
    },
  });
}

// Hook for approving a submission
export function useApproveSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submissionId: string) => {
      // First, get the submission data
      const { data: submission, error: fetchError } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', submissionId)
        .single();
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Begin a transaction
      // 1. Update submission status to approved
      const { error: updateError } = await supabase
        .from('submissions')
        .update({ status: 'approved' })
        .eq('id', submissionId);
      
      if (updateError) {
        throw updateError;
      }
      
      // 2. Insert into locations table
      const { error: insertError } = await supabase
        .from('locations')
        .insert({
          name: submission.mosque_name,
          address: submission.address,
          suburb: submission.suburb,
          state: submission.state,
          time: submission.time,
          rakaat: submission.rakaat,
          has_womens_area: submission.has_womens_area,
          has_wudu_facilities: submission.has_wudu_facilities,
          has_parking: submission.has_parking,
          parking_type: submission.parking_type,
        });
      
      if (insertError) {
        throw insertError;
      }
      
      return submission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });
}

// Hook for rejecting a submission
export function useRejectSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submissionId: string) => {
      const { error } = await supabase
        .from('submissions')
        .update({ status: 'rejected' })
        .eq('id', submissionId);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

// Hook for deleting a submission
export function useDeleteSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submissionId: string) => {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submissionId);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

// Hook for updating a submission
export function useUpdateSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Submission> }) => {
      const updateData: any = {};
      
      if (data.mosqueName) updateData.mosque_name = data.mosqueName;
      if (data.address) updateData.address = data.address;
      if (data.suburb) updateData.suburb = data.suburb;
      if (data.state) updateData.state = data.state;
      if (data.time) updateData.time = data.time;
      if (data.rakaat) updateData.rakaat = parseInt(data.rakaat, 10);
      if (data.hasWomensArea !== undefined) updateData.has_womens_area = data.hasWomensArea;
      if (data.hasWuduFacilities !== undefined) updateData.has_wudu_facilities = data.hasWuduFacilities;
      if (data.hasParking !== undefined) updateData.has_parking = data.hasParking;
      if (data.parkingType !== undefined) updateData.parking_type = data.parkingType;
      
      const { error } = await supabase
        .from('submissions')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}
