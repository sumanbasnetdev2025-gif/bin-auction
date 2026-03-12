"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addHours, format } from "date-fns";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import ImageUploader from "./ImageUploader";
import { createListingSchema, type CreateListingInput } from "@/lib/validations";
import { CATEGORIES, AUCTION_DURATIONS } from "@/lib/constants";
import type { Listing } from "@/types";

interface ListingFormProps {
  listing?: Listing; // if provided = edit mode
}

export default function ListingForm({ listing }: ListingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
    defaultValues: listing
      ? {
          title: listing.title,
          description: listing.description,
          category_id: listing.category_id,
          starting_price: listing.starting_price,
          auction_end_time: listing.auction_end_time,
          image_urls: listing.image_urls,
        }
      : {
          image_urls: [],
          auction_end_time: format(addHours(new Date(), 24), "yyyy-MM-dd'T'HH:mm"),
        },
  });

  const imageUrls = watch("image_urls");

  const onSubmit = async (data: CreateListingInput) => {
    setLoading(true);
    try {
      const url = listing ? `/api/listings/${listing.id}` : "/api/listings";
      const method = listing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(listing ? "Listing updated!" : "Listing created!");
      if (!listing) {
        reset({
          image_urls: [],
          title: "",
          description: "",
          category_id: undefined,
          starting_price: undefined,
          auction_end_time: format(addHours(new Date(), 24), "yyyy-MM-dd'T'HH:mm"),
        });
      }
      router.push(`/listings/${result.data.id}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save listing");
    } finally {
      setLoading(false);
    }
  };

  const handleDurationSelect = (hours: number) => {
    const endTime = format(addHours(new Date(), hours), "yyyy-MM-dd'T'HH:mm");
    setValue("auction_end_time", endTime);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Images */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Photos <span className="text-destructive">*</span>
        </Label>
        <ImageUploader
          value={imageUrls}
          onChange={(urls) => setValue("image_urls", urls, { shouldValidate: true })}
        />
        {errors.image_urls && (
          <p className="text-xs text-destructive">{errors.image_urls.message}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="What are you selling?"
          className="bg-secondary/30"
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe your item — condition, age, features..."
          rows={5}
          className="bg-secondary/30 resize-none"
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Category + Starting Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>
            Category <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <SelectTrigger className="bg-secondary/30">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category_id && (
            <p className="text-xs text-destructive">{errors.category_id.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="starting_price">
            Starting Price (NPR) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="starting_price"
            type="number"
            {...register("starting_price", { valueAsNumber: true })}
            placeholder="0"
            min={1}
            className="bg-secondary/30"
          />
          {errors.starting_price && (
            <p className="text-xs text-destructive">{errors.starting_price.message}</p>
          )}
        </div>
      </div>

      {/* Auction End Time */}
      <div className="space-y-2">
        <Label>
          Auction End Time <span className="text-destructive">*</span>
        </Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {AUCTION_DURATIONS.map((d) => (
            <Button
              key={d.hours}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDurationSelect(d.hours)}
              className="text-xs border-border hover:border-primary/50"
            >
              {d.label}
            </Button>
          ))}
        </div>
        <Input
          type="datetime-local"
          {...register("auction_end_time")}
          className="bg-secondary/30"
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        />
        {errors.auction_end_time && (
          <p className="text-xs text-destructive">{errors.auction_end_time.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bin-gradient border-0 text-white font-semibold h-11"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {listing ? "Updating..." : "Creating Listing..."}
          </>
        ) : listing ? (
          "Update Listing"
        ) : (
          "List Item for Auction"
        )}
      </Button>
    </form>
  );
}