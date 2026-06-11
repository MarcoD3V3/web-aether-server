"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_HIDE_MS = 15_000;

type Props = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
  /** Si true, hay que mantener pulsado el botón para ver (más seguro en pantallas compartidas). */
  holdToReveal?: boolean;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
};

export function SecurePasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  className,
  inputClassName,
  holdToReveal = false,
  onPaste,
}: Props) {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    setVisible(false);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(hide, AUTO_HIDE_MS);
  }, [hide]);

  const reveal = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    const onBlur = () => hide();
    const onVis = () => {
      if (document.hidden) hide();
    };
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVis);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [hide]);

  const toggleVisible = () => {
    if (visible) hide();
    else reveal();
  };

  const onPointerDown = () => {
    if (holdToReveal) reveal();
  };

  const onPointerUp = () => {
    if (holdToReveal) hide();
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#c8d8ec]">
          {label}
        </label>
      )}
      <div className={cn("relative", label && "mt-1")}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={onPaste}
          placeholder={placeholder}
          autoComplete={autoComplete}
          spellCheck={false}
          data-1p-ignore={visible ? undefined : "true"}
          data-lpignore="true"
          onCopy={(e) => {
            if (!visible) e.preventDefault();
          }}
          className={cn(
            "w-full rounded-md border-2 border-[#4a3f2a] bg-[#1a1610] py-2.5 pl-3 pr-11 text-[#e8dcc8] outline-none focus:border-[#d4a84b]",
            inputClassName
          )}
        />
        <button
          type="button"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          title={
            holdToReveal
              ? "Mantén pulsado para ver · se oculta al soltar"
              : visible
                ? "Ocultar (se oculta sola en 15 s)"
                : "Mostrar contraseña"
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-[#9eb4d4] hover:bg-[#2a3144]/60 hover:text-[#e8dcc8]"
          onClick={holdToReveal ? undefined : toggleVisible}
          onPointerDown={holdToReveal ? onPointerDown : undefined}
          onPointerUp={holdToReveal ? onPointerUp : undefined}
          onPointerLeave={holdToReveal ? onPointerUp : undefined}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {visible && !holdToReveal && (
        <p className="mt-1 text-[10px] text-[#6a7a94]">Se ocultará automáticamente en unos segundos.</p>
      )}
    </div>
  );
}
