export default function AuthPageHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent px-5 py-5 sm:px-8 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <span className="font-headline text-lg font-bold tracking-tight whitespace-nowrap text-primary sm:text-2xl md:text-[2rem]">
          <span className="inline sm:block md:inline">Edura</span>
          <span className="ml-1 inline sm:ml-0 sm:block md:ml-1 md:inline">
            Financial
          </span>
        </span>
        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <a
            className="font-label text-secondary text-sm font-medium transition-colors hover:text-primary sm:text-base"
            href="https://edurafinancial.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Back to Website
          </a>
          <button
            type="button"
            className="font-label text-secondary text-sm font-medium transition-colors hover:text-primary sm:text-base"
          >
            Support
          </button>
        </div>
      </div>
    </header>
  );
}
