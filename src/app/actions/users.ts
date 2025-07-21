"use server";
import supabase from "@/config/supabaseConfig";
import { currentUser } from "@clerk/nextjs/server";

export const getcurrentUserFromSupabase = async () => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.id) {
      throw new Error("No valid Clerk user found.");
    }

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("clerk_user_id", clerkUser.id)
      .limit(1)
      .single(); // ← Ensures only one row and better error handling

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116: No rows found — this is safe to ignore
      throw fetchError;
    }

    if (existingUser) {
      return { success: true, data: existingUser };
    }

    // Insert new user if not exists
    const newUserObj = {
      clerk_user_id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      is_active: true,
      is_admin: false,
    };

    const { data: newUser, error: insertError } = await supabase
      .from("user_profiles")
      .insert([newUserObj])
      .select()
      .single();

    if (insertError) throw insertError;

    return {
      success: true,
      data: newUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
