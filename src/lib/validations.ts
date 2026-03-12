import { z } from "zod";

export const signUpSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const createListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category_id: z.number({ required_error: "Please select a category" }),
  starting_price: z.number().min(1, "Starting price must be at least 1 NPR"),
  auction_end_time: z.string().min(1, "Please set an auction end time"),
  image_urls: z.array(z.string()).min(1, "Please upload at least one image").max(5),
});

export const placeBidSchema = z.object({
  amount: z.number().min(1, "Bid amount must be positive"),
});

export const updateBidSchema = z.object({
  amount: z.number().min(1, "Bid amount must be positive"),
});

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type PlaceBidInput = z.infer<typeof placeBidSchema>;
export type UpdateBidInput = z.infer<typeof updateBidSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;