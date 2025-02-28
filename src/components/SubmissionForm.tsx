
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send, Loader2 } from 'lucide-react';
import { useSubmitLocation } from '@/hooks/use-data';
import { prepareSubmissionForInsert } from '@/lib/adapters';

const formSchema = z.object({
  mosqueName: z.string().min(2, {
    message: "Mosque name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  suburb: z.string().min(2, {
    message: "Suburb must be at least 2 characters.",
  }),
  state: z.string().min(1, {
    message: "Please select a state.",
  }),
  time: z.string().min(1, {
    message: "Please enter the time of prayer.",
  }),
  rakaat: z.string().min(1, {
    message: "Please select the number of Rakaat.",
  }),
  hasWomensArea: z.boolean().default(false),
  hasWuduFacilities: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  parkingType: z.string().optional(),
  submitterName: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  submitterEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  additionalInfo: z.string().optional(),
});

const SubmissionForm = () => {
  const submitLocation = useSubmitLocation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mosqueName: "",
      address: "",
      suburb: "",
      state: "",
      time: "",
      rakaat: "",
      hasWomensArea: false,
      hasWuduFacilities: false,
      hasParking: false,
      parkingType: undefined,
      submitterName: "",
      submitterEmail: "",
      additionalInfo: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = prepareSubmissionForInsert(values);
      await submitLocation.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="glass-card p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2 mb-4 border-islamic-100">
              Mosque Information
            </h3>
            
            <FormField
              control={form.control}
              name="mosqueName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mosque Name*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the name of the mosque" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the street address" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suburb*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter suburb" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NSW">New South Wales</SelectItem>
                        <SelectItem value="VIC">Victoria</SelectItem>
                        <SelectItem value="QLD">Queensland</SelectItem>
                        <SelectItem value="WA">Western Australia</SelectItem>
                        <SelectItem value="SA">South Australia</SelectItem>
                        <SelectItem value="TAS">Tasmania</SelectItem>
                        <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                        <SelectItem value="NT">Northern Territory</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prayer Time*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. 8:30 PM" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rakaat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Rakaat*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rakaat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="8">8 Rakaat</SelectItem>
                        <SelectItem value="20">20 Rakaat</SelectItem>
                        <SelectItem value="36">36 Rakaat</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <h3 className="text-lg font-medium border-b pb-2 mb-4 border-islamic-100 mt-8">
              Facilities
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hasWomensArea"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Women's Prayer Area</FormLabel>
                      <FormDescription>
                        The mosque has a dedicated space for women.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hasWuduFacilities"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Wudu Facilities</FormLabel>
                      <FormDescription>
                        The mosque has facilities for wudu (ablution).
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hasParking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Parking Available</FormLabel>
                      <FormDescription>
                        Parking is available for attendees.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              {form.watch('hasParking') && (
                <FormField
                  control={form.control}
                  name="parkingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parking Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select parking type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Street">Street Parking</SelectItem>
                          <SelectItem value="Dedicated">Dedicated Parking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <h3 className="text-lg font-medium border-b pb-2 mb-4 border-islamic-100 mt-8">
              Your Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="submitterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="submitterEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional details you'd like to share" 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-islamic-600 hover:bg-islamic-700 text-white"
            disabled={submitLocation.isPending}
          >
            {submitLocation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Location
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Your submission will be reviewed by our team before being published.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SubmissionForm;
