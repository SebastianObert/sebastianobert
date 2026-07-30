export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300">
      {children}
    </a>
  );
}
