import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvanfqdfxwqaxcduafkb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YW5mcWRmeHdxYXhjZHVhZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MDcyMDEsImV4cCI6MjA1MTQ4MzIwMX0.paIUDP2eweLLdvP4fSDhjtMAtjTd2N3w79-Ws_gOlco";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
