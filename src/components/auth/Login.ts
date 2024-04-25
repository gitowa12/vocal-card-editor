import { createClient } from "@/utils/supabase/client";

export const Login = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "/auth/callback/",
      },
    });
    console.log("User logged in", data);
  } catch (error) {
    console.error("Login error", error);
  }
};
