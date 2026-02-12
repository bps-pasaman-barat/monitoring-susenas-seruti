"use client";

import { LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-primary">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
          <LockKeyhole className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to access the Monitoring System
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {/* Form fields remain same but wrapped nicely */}
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className="h-10"
            />
            {state?.errors?.username && (
              <p className="text-sm text-red-500 font-medium">
                {state.errors.username}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="h-10"
            />
            {state?.errors?.password && (
              <p className="text-sm text-red-500 font-medium">
                {state.errors.password}
              </p>
            )}
          </div>
          {state?.message && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium border border-red-100 flex items-center justify-center">
              {state.message}
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-6 mt-5">
          <Button
            className="w-full h-10 text-base"
            disabled={isPending}
            size="lg"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
