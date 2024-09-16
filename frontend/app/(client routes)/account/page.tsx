import { Spinner } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Label } from "@/components/ui/label";

import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Account() {
  const { data, error } = await getSession();
  if (error) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-12">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="relative flex-col items-start gap-8 md:flex">
            <div className="grid mx-2 md:w-1/2 md:mx-auto items-start gap-6">
              <span className="md:text-2xl font-semibold">
                Account settings
              </span>
              <fieldset className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">Personal details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        defaultValue={data.first_name}
                      />
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        defaultValue={data.last_name}
                      />
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="email@findr.com"
                        defaultValue={data.email}
                      />
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">Update password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        placeholder="password"
                      />
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
