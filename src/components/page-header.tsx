type PageHeaderProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, titleAccent, description }: PageHeaderProps) {
  const renderTitle = () => {
    if (!titleAccent) return <span>{title}</span>;
    const idx = title.indexOf(titleAccent);
    if (idx === -1) return <span>{title}</span>;
    return (
      <>
        {title.slice(0, idx)}
        <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
          {titleAccent}
        </span>
        {title.slice(idx + titleAccent.length)}
      </>
    );
  };

  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950 px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Fade dot grid toward center bottom */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,transparent,#020617_65%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" />
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">{eyebrow}</p>
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          {renderTitle()}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
