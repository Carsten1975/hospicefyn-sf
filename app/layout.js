import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
faConfig.autoAddCss = false;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/content";
import "./globals.css";

const site = getSite();

export const metadata = {
  metadataBase: new URL("https://hospicefyn-sf.dk"),
  title: { default: `${site.name}`, template: `%s – ${site.name}` },
  description: site.description,
  icons: { icon: "/wp-content/uploads/2023/07/cropped-favicon-1-270x270.png" },
  openGraph: { siteName: site.name, locale: "da_DK", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
