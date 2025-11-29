import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";

export function useUser() {
  const [username, setUsername] = useState<string>(new Array(10 + 1).join(' '));
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.username) {
        setUsername(user.user_metadata.username);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return { username, loading };
}
