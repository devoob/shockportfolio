import { LogoMark, Wordmark } from "./Logo";

export function BootScreen({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-50 grid place-items-center bg-surface transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-5">
        <LogoMark className="h-14 w-14" />
        <Wordmark className="text-xl" />
        <div className="h-1 w-40 overflow-hidden rounded-full bg-surface-higher">
          <div className="boot-progress h-full w-1/3 rounded-full bg-accent" />
        </div>
        <span className="sr-only">Loading your risk workspace</span>
      </div>
    </div>
  );
}
