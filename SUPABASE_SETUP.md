
# Setting Up Supabase for TaraweehFinder

This document provides instructions for setting up Supabase to work with the TaraweehFinder application.

## 1. Create a Supabase Project

1. Sign up for or log in to [Supabase](https://supabase.com/).
2. Create a new project by clicking "New Project" on the dashboard.
3. Give your project a name (e.g., "TaraweehFinder") and set a secure database password.
4. Choose a region that's closest to your users (e.g., Sydney for Australian users).
5. Wait for your project to be created.

## 2. Set Up the Database Schema

1. In your Supabase project, navigate to the SQL Editor.
2. Create a new query and paste the contents of the `database/schema.sql` file.
3. Click "Run" to execute the SQL script, which will:
   - Create the necessary tables (locations, submissions, admin_users)
   - Add Row Level Security (RLS) policies
   - Insert sample data for development
   - Set up a function to add admin users

## 3. Configure Authentication

1. Go to the "Authentication" section in the Supabase dashboard.
2. Under "Settings" > "Email", enable "Email Signup" and "Email Confirmations".
3. Add your site's URL to the "Site URL" field.
4. (Optional) Configure additional authentication providers like Google, Facebook, etc.

## 4. Add Yourself as an Admin

For the first admin user, you'll need to:

1. Sign up with email/password in your application.
2. Go to the "Authentication" section in Supabase to confirm the user is created.
3. Note the email of your admin user.
4. Run the following SQL in the SQL Editor:

```sql
SELECT add_admin_user('your-email@example.com');
```

This will add you as an admin user, allowing you to access the admin panel.

## 5. Connect Your Application to Supabase

1. In the Supabase dashboard, go to "Settings" > "API".
2. Find your API URL and anon key (public).
3. Add the following environment variables to your application:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 6. Storage Buckets (If Needed)

If you plan to allow image uploads for mosques:

1. Go to "Storage" in the Supabase dashboard.
2. Create a new bucket called "mosque-images".
3. Under "Policies", add appropriate access controls.

## 7. Deploy

Your backend is now set up! Deploy your frontend application with the correct environment variables to connect to Supabase.

## Common Tasks

### Adding Another Admin

Execute the following SQL to add another admin:

```sql
SELECT add_admin_user('new-admin-email@example.com');
```

### Backup Data

You can export your data from the "Database" > "Backups" section of the Supabase dashboard.

## Troubleshooting

- **RLS Policies**: If you're having permission issues, check the RLS policies in the "Authentication" > "Policies" section.
- **CORS Errors**: Ensure your site's domain is added to allowed origins in "Settings" > "API" > "CORS" configuration.
- **Database Errors**: Check the "Database" > "Logs" section for any errors.
