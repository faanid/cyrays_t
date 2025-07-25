"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden">
    <AnimatePresence mode="wait">
   <motion.div
  key={pathname}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  layout
>
  {children}
</motion.div>


    </AnimatePresence> 
     </div>
  );
}
