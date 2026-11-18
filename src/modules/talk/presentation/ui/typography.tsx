export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[1.2vh] text-[clamp(.7rem,1.7vh,.85rem)] font-semibold tracking-[.2em] text-brand-hi uppercase">
      {children}
    </p>
  );
}
