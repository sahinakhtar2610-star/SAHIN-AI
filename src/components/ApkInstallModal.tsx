import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Laptop,
  Smartphone,
  Sparkles,
  X,
  Share2,
} from "lucide-react";

interface ApkInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkInstallModal: React.FC<ApkInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1 shadow-md">
            <img src="/logo.png" alt="SAHIN AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>SAHIN AI Android APK</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Official App
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              ফোনে সরাসরি অ্যাপ / APK হিসেবে ইনস্টল করে ব্যবহার করুন
            </p>
          </div>
        </div>

        {/* 1-Click Install Button if supported */}
        {deferredPrompt && !isInstalled && (
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-teal-950/80 to-indigo-950/80 border border-teal-500/40 text-center">
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>সরাসরি ফোনে ইনস্টল করুন (1-Click Install)</span>
            </button>
            <p className="text-[11px] text-teal-300/80 mt-2">
              Google Chrome স্বয়ংক্রিয়ভাবে আপনার মোবাইলে WebAPK তৈরি করে ইনস্টল করবে।
            </p>
          </div>
        )}

        {isInstalled && (
          <div className="mb-5 p-3 rounded-xl bg-teal-900/30 border border-teal-500/40 flex items-center gap-2.5 text-teal-300 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>SAHIN AI আপনার ডিভাইসে ইতিমধ্যে ইনস্টল করা আছে!</span>
          </div>
        )}

        {/* Android Chrome Step-by-Step Instructions */}
        <div className="space-y-3.5 mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-teal-400" />
            <span>অ্যান্ড্রয়েড মোবাইলে APK ইনস্টল করার সহজ নিয়ম:</span>
          </h4>

          <div className="space-y-2.5 text-xs text-zinc-300">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                ১
              </span>
              <div>
                <p className="font-semibold text-zinc-100">Chrome ব্রাউজারের ৩-ডট মেনু খুলুন</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  উপরে ডানদিকের তিনটি বিন্দু (<strong>⋮</strong>) আইকনে চাপ দিন।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                ২
              </span>
              <div>
                <p className="font-semibold text-zinc-100">
                  &ldquo;Install app&rdquo; বা &ldquo;Add to Home screen&rdquo; চাপুন
                </p>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  মেনু থেকে &ldquo;অ্যাপ ইনস্টল করুন&rdquo; অথবা &ldquo;হোম স্ক্রিনে যোগ করুন&rdquo; সিলেক্ট করুন।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                ৩
              </span>
              <div>
                <p className="font-semibold text-zinc-100">অটোমেটিক Android APK তৈরি</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Android সিস্টেম সাথে সাথে <strong>SAHIN AI</strong> এর অফিশিয়াল APK ফাইল ফোনে ইনস্টল করে হোমস্ক্রিনে অ্যাপ আইকন বসিয়ে দেবে!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "লিংক কপি হয়েছে!" : "অ্যাপ লিংক কপি করুন"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
