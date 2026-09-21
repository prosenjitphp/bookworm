interface AuthorSectionProps {
  authorName: string;
  authorBio: string;
  authorAvatar: string;
}

export default function AuthorSection({
  authorName,
  authorBio,
  authorAvatar,
}: AuthorSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-slate-100 mb-4 border-b border-slate-700 pb-2">
        About the writer
      </h2>
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-slate-700"
        />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-100">{authorName}</h3>
          {authorBio.split("\n").map((para, i) => (
            <p key={i} className="text-slate-400 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
