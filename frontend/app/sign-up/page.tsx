"use client";
import Link from "next/link";
import { Spinner } from "@/components/loaders";

import { Signup } from "@/actions/auth";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const { data, error } = await Signup(form);

    if (error) {
      toast.error(error);
    }

    toast.success("Account created successfully.");
    setLoading(false);
    router.push("/search");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-xl rounded-none shadow-none md:mt-12">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user_type">User Type</Label>
              <Select required name="user_type">
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider">
                    Financial service provider
                  </SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First name</Label>
                <Input name="first_name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input name="last_name" placeholder="Robinson" required />
              </div>
            </div>
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
              {loading ? <Spinner /> : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/api/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
