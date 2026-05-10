import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qafikbvenuzvkicbjawj.supabase.co/rest/v1/'; // YOUR URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZmlrYnZlbnV6dmtpY2JqYXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTgzNDEsImV4cCI6MjA5Mzk3NDM0MX0.cjWU97qirXMH4_8ysjZE49QpNKxWJ-SuBOmMFHpYnwA'; // YOUR anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);