import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://ecnhnvoxfzdkfaadninf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbmhudm94Znpka2ZhYWRuaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzE4NzQsImV4cCI6MjA0ODQ0Nzg3NH0.u4Q_kqDS9Uh6tOdGY58B00hRGIJP_jTD80DlqfK13fM";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase