import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useSupabaseQuery<T>(table: string, select = '*', filter?: { column: string; value: any }) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    let query = supabase.from(table).select(select);
    if (filter) {
      query = query.eq(filter.column, filter.value);
    }
    const { data, error } = await query;
    if (error) setError(error);
    else setData(data as T[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [table, select, filter?.column, filter?.value]);

  return { data, loading, error, refetch: fetchData };
}