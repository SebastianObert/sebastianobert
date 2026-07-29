export default function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="w-full text-center py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
    >
      {children}
    </a>
  );
}
