import Link from "next/link";

function AppFooter() {
  return (
    <footer className="mt-20 bg-brand-mist-200/70">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* brand */}
          <div>
            <h3 className="text-2xl font-bold text-brand-emerald-800">
              Freshora
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-6 text-brand-mist-500">
              Fresh organic groceries sourced from trusted local farms and
              delivered straight to your doorstep. Healthy living made simple.
            </p>
          </div>

          {/* navigation */}
          <div>
            <h4 className="font-semibold text-brand-mist-700">Quick Links</h4>

            <ul className="mt-4 space-y-3 text-sm text-brand-mist-500">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-brand-emerald-700">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/product"
                  className="transition hover:text-brand-emerald-700">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-brand-emerald-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-semibold text-brand-mist-700">Get in Touch</h4>

            <div className="mt-4 space-y-3 text-sm text-brand-mist-500">
              <p>freshoragrocery@gmail.com</p>
              <p>+62 812 3456 7890</p>
              <p>Denpasar, Bali, Indonesia</p>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-10 border-t border-brand-mist-200 pt-6">
          <p className="text-center text-xs text-brand-mist-400">
            © {new Date().getFullYear()} Freshora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
