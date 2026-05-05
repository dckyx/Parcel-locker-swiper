export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`w-full text-center text-xs font-medium text-gray-400 px-4 ${className}`}
    >
      &copy; 2026 Hubert Poskrobko -{" "}
      <a
        href="https://huubi.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-500 transition-colors underline decoration-transparent hover:decoration-blue-500 underline-offset-4"
      >
        huubi.dev
      </a>
    </footer>
  );
}
