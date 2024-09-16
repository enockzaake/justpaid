"use client";
import Link from "next/link";
import { Spinner } from "@/components/loaders";

import { Login } from "@/actions/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import eventBus from "@/lib/events";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const { data, error } = await Login(form);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Logged in successfully.");
    eventBus.emit("sessionUpdated");
    setLoading(false);
    router.refresh();
    router.push("/search");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-xl rounded-none shadow-none md:mt-12">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" required />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Spinner /> : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don;t have an account?{" "}
            <Link href="/api/auth/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
