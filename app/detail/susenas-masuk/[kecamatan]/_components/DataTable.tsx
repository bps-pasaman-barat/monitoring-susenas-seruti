"use client";

import { useEffect, useState } from "react";

type SusenasMasukData = unknown; // ganti dengan type aslimu

export default function Table({ kecamatan }: { kecamatan: string }) {
  const [data, setData] = useState<SusenasMasukData | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(kecamatan);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/backend/susenas-masuk/${kecamatan}`);

        // if (!res.ok) throw new Error("Fetch gagal");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kecamatan]);
  if (loading) return <p>Loading...</p>;

  return (
    <pre className="text-xs bg-muted p-4 rounded">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
