import Link from 'next/link'
import { createClient } from '../../supabase/server'
import { Button } from './ui/button'
import UserProfile from './user-profile'

export default async function Navbar() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="flex items-center gap-3">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[hsl(152,45%,25%)] flex items-center justify-center">
              <span className="text-[hsl(45,80%,55%)] font-bold text-lg">
                {settings?.logo_letter || 'M'}
              </span>
            </div>
          )}
          <div>
            <div className="text-[hsl(152,45%,25%)] font-bold text-lg leading-tight tracking-tight">
              {settings?.company_name || 'Messiah Safaris'}
            </div>
            <div className="text-[hsl(45,80%,50%)] text-[10px] uppercase tracking-[0.2em] font-medium">
              {settings?.company_tagline || '& Tours'}
            </div>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>
                  Dashboard
                </Button>
              </Link>
              <UserProfile  />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
