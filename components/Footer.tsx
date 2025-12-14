export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-slate-500 text-sm text-center mb-4">"Testing is thinking, not clicking."</p>
        <div className="flex space-x-6 text-slate-400">
          <a href="#" className="hover:text-brand-500 transition">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" className="hover:text-brand-500 transition">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <p className="text-slate-700 text-xs mt-8">Generated for Startup Testers</p>
      </div>
    </footer>
  )
}

