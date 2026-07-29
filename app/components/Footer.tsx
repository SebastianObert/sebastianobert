export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center relative z-10">
      <p className="text-slate-300 font-medium text-lg mb-4 tracking-wide italic">
        &ldquo;In progress, always.&rdquo;
      </p>
      <p className="text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} Sebastian Obert. All rights reserved.
      </p>
    </footer>
  );
}
