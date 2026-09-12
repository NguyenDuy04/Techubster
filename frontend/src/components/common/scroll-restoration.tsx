"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const STORAGE_PREFIX = "techubster-scroll";

const getStorageKey = (pathname: string, searchParams: URLSearchParams) => {
    const query = searchParams.toString();
    return `${STORAGE_PREFIX}:${pathname}${query ? `?${query}` : ""}`;
};

const readScroll = (key: string): { x: number; y: number } | null => {
    try {
        const saved = sessionStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
};

const writeScroll = (key: string) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ x: window.scrollX, y: window.scrollY }));
    } catch {
        // sessionStorage bị block (private mode, full storage...)
    }
};

export default function ScrollRestoration() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentKeyRef = useRef("");

    // Tắt scroll restoration mặc định của browser
    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    // Cập nhật key khi URL thay đổi
    useEffect(() => {
        currentKeyRef.current = getStorageKey(pathname, searchParams ?? new URLSearchParams());
    }, [pathname, searchParams]);

    // Lắng nghe scroll — chỉ gán 1 lần, dùng ref để luôn bắt đúng key mới nhất
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (currentKeyRef.current) writeScroll(currentKeyRef.current);
                ticking = false;
            });
        };

        const handleLeave = () => {
            if (currentKeyRef.current) writeScroll(currentKeyRef.current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("pagehide", handleLeave);
        window.addEventListener("beforeunload", handleLeave);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("pagehide", handleLeave);
            window.removeEventListener("beforeunload", handleLeave);
        };
    }, []);

    // Khôi phục vị trí cuộn khi đổi route
    useEffect(() => {
        const key = getStorageKey(pathname, searchParams ?? new URLSearchParams());
        const saved = readScroll(key);

        const timer = setTimeout(() => {
            window.scrollTo({
                left: saved?.x ?? 0,
                top: saved?.y ?? 0,
                behavior: "auto",
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null;
}