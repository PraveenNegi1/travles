import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import GlobalButton from "@/components/GlobalButton";
import AIChatPopup from "@/components/Aibot";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <GlobalButton />
      <AIChatPopup />
      <Footer />
    </div>
  );
}
