
import { Database } from '../types/supabase';
import { Location } from '@/components/LocationCard';
import { Submission } from '@/components/AdminPanel';

// Convert location from Supabase row to application type
export function adaptLocation(dbLocation: Database['public']['Tables']['locations']['Row']): Location {
  return {
    id: dbLocation.id,
    name: dbLocation.name,
    address: dbLocation.address,
    suburb: dbLocation.suburb,
    state: dbLocation.state,
    time: dbLocation.time,
    rakaat: dbLocation.rakaat,
    hasWomensArea: dbLocation.has_womens_area,
    hasWuduFacilities: dbLocation.has_wudu_facilities,
    hasParking: dbLocation.has_parking,
    parkingType: dbLocation.parking_type as 'Street' | 'Dedicated' | undefined,
  };
}

// Convert submission from Supabase row to application type
export function adaptSubmission(dbSubmission: Database['public']['Tables']['submissions']['Row']): Submission {
  return {
    id: dbSubmission.id,
    mosqueName: dbSubmission.mosque_name,
    address: dbSubmission.address,
    suburb: dbSubmission.suburb, 
    state: dbSubmission.state,
    time: dbSubmission.time,
    rakaat: dbSubmission.rakaat.toString(),
    hasWomensArea: dbSubmission.has_womens_area,
    hasWuduFacilities: dbSubmission.has_wudu_facilities,
    hasParking: dbSubmission.has_parking,
    parkingType: dbSubmission.parking_type as 'Street' | 'Dedicated' | undefined,
    submitterName: dbSubmission.submitter_name,
    submitterEmail: dbSubmission.submitter_email,
    additionalInfo: dbSubmission.additional_info || '',
    status: dbSubmission.status,
    submittedAt: new Date(dbSubmission.created_at),
  };
}

// Define the type for submission data from the form
export type SubmissionFormData = {
  mosqueName: string;
  address: string;
  suburb: string;
  state: string;
  time: string;
  rakaat: string;
  hasWomensArea: boolean;
  hasWuduFacilities: boolean;
  hasParking: boolean;
  parkingType?: string;
  submitterName: string;
  submitterEmail: string;
  additionalInfo?: string;
};

// Convert submission from application type to Supabase insert
export function prepareSubmissionForInsert(submission: SubmissionFormData): Database['public']['Tables']['submissions']['Insert'] {
  return {
    mosque_name: submission.mosqueName,
    address: submission.address,
    suburb: submission.suburb,
    state: submission.state,
    time: submission.time,
    rakaat: parseInt(submission.rakaat, 10),
    has_womens_area: submission.hasWomensArea,
    has_wudu_facilities: submission.hasWuduFacilities,
    has_parking: submission.hasParking,
    parking_type: submission.parkingType || null,
    submitter_name: submission.submitterName,
    submitter_email: submission.submitterEmail,
    additional_info: submission.additionalInfo || null,
    status: 'pending',
  };
}
