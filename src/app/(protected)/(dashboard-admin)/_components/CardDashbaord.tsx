"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
export default function CardDashboard() {
  const [jmlhUser, setJmlhUser] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/user");
      const { data } = await res.json();
      setJmlhUser(data);
    })();
  }, []);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system health and performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">Optimal</div>
          <p className="text-xs text-muted-foreground mt-1">
            All systems operational
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>Registered users in the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{jmlhUser}</div>
          <p className="text-xs text-muted-foreground mt-1"></p>
        </CardContent>
      </Card>
    </>
  );
}
