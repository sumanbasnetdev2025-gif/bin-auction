"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Camera, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validations";
import { getInitials, formatDate } from "@/lib/utils";
import type { UserProfile } from "@/types";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user?.full_name ?? "",
      phone: user?.phone ?? "",
      location: user?.location ?? "",
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    if (!user?.id) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
    } else {
      setUser({ ...user, ...data } as UserProfile);
      toast.success("Profile updated successfully!");
    }
    setLoading(false);
  };

  const initials = getInitials(user?.full_name);

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-3xl mb-1">Profile</h1>
        <p className="text-sm" style={{ color: "#7a6f6a" }}>Manage your personal information</p>
      </div>

      {/* Avatar + Info Card */}
      <div className="rounded-2xl border p-6" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{ background: "linear-gradient(135deg, #C0392B, #E74C3C)", color: "white" }}>
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#1e1a18", border: "2px solid #0f0d0c" }}>
              <Camera className="w-3 h-3" style={{ color: "#7a6f6a" }} />
            </button>
          </div>
          <div>
            <h2 className="font-display font-bold text-xl">{user?.full_name || "User"}</h2>
            <p className="text-sm mt-0.5" style={{ color: "#7a6f6a" }}>{user?.email}</p>
            <div className="flex items-center gap-4 mt-2">
              {user?.location && (
                <span className="flex items-center gap-1 text-xs" style={{ color: "#5a4f4a" }}>
                  <MapPin className="w-3 h-3" /> {user.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs" style={{ color: "#5a4f4a" }}>
                <Calendar className="w-3 h-3" />
                Joined {user?.created_at ? formatDate(user.created_at) : "—"}
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98128" }}>
              <Shield className="w-3 h-3" />
              {user?.role ?? "buyer"}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="rounded-2xl border p-6" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
        <h3 className="font-display font-semibold text-lg mb-5">Edit Information</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Full Name</Label>
            <Input {...register("full_name")}
              className="h-11"
              style={{ background: "#1a1614", border: "1px solid #2a2220", color: "#e8ddd8" }} />
            {errors.full_name && <p className="text-xs" style={{ color: "#e74c3c" }}>{errors.full_name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" style={{ color: "#7a6f6a" }} /> Email
            </Label>
            <Input value={user?.email ?? ""} disabled
              className="h-11 opacity-50 cursor-not-allowed"
              style={{ background: "#141210", border: "1px solid #1e1a18", color: "#7a6f6a" }} />
            <p className="text-xs" style={{ color: "#5a4f4a" }}>Email cannot be changed</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" style={{ color: "#7a6f6a" }} /> Phone
              </Label>
              <Input {...register("phone")} placeholder="+977 9800000000" className="h-11"
                style={{ background: "#1a1614", border: "1px solid #2a2220", color: "#e8ddd8" }} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" style={{ color: "#7a6f6a" }} /> Location
              </Label>
              <Input {...register("location")} placeholder="Kathmandu" className="h-11"
                style={{ background: "#1a1614", border: "1px solid #2a2220", color: "#e8ddd8" }} />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={loading || !isDirty}
              className="bin-gradient border-0 text-white font-semibold px-6">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
            </Button>
            {!isDirty && <p className="text-xs" style={{ color: "#5a4f4a" }}>No changes to save</p>}
          </div>
        </form>
      </div>
    </div>
  );
}