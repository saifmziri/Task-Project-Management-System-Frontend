import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none transition focus:border-slate-900"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className="relative rounded-lg p-2 text-slate-600 transition hover:cursor-pointer hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">Saif</p>

          <p className="text-xs text-slate-500">Admin</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          S
        </div>
      </div>
    </header>
  );
};

export default Topbar;
