import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/actions/auth";

export default function withPageAuthRequired(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkSession = async () => {
        try {
          const { data, error } = await getSession();
          if (error) {
            router.push("/");
          } else {
            setIsAuthenticated(true);
          }
        } catch (err) {
          router.push("/");
        } finally {
          setLoading(false);
        }
      };

      checkSession();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // Prevent rendering the protected component until authenticated
    }

    return <Component {...props} />;
  };
}
