import { useEffect, useState } from "react";

export function useDataSubmitted(url: string) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(url);
        const result = await resp.json();
        setData(result.data);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  const refetch = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const result = await resp.json();
      setData(result.data);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    refetch,
  };
}
