import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { ContactBar } from "@/components/layout/ContactBar";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <MainHeader />
      <ContactBar />
      <MegaMenu />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
