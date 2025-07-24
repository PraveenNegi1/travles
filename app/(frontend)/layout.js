import Footer from "@/components/Footer";
import GlobalButton from "@/components/GlobalButton";
import AIChatPopup from "@/components/Aibot";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
       <Toaster position="top-right" />
      <GlobalButton />
      <AIChatPopup />
      <Footer />
    </div>
  );
}
