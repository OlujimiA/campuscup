import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttrtflqtgzmlrewytcqd.supabase.co'; // from your Supabase project
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cnRmbHF0Z3ptbHJld3l0Y3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDA2MTEsImV4cCI6MjA5Mzk3NjYxMX0.i_ybaLqE6ya0TohuqHNuP_0pNiSMz3BdK5XiO-VrBqU'; // from Project Settings -> API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);