import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  classNames,
  resetClasses,
  variantClassNames,
} from "../../util/classes";

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  onOptionChange: (option: SegmentedControlOption<T>, index: number) => void;
  variant?: "purple" | "transparent";
}

export interface SegmentedControlOption<T extends string> {
  label: React.ReactNode;
  value: T;
  selectedByDefault?: boolean;
}

export const SegmentedControl = <T extends string>({
  options,
  onOptionChange,
  variant = "transparent",
}: SegmentedControlProps<T>) => {
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedOption, setSelectedOption] = useState<T | null>(
    options.find((opt) => opt.selectedByDefault)?.value ?? null
  );
  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === selectedOption),
    [options, selectedOption]
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { left, width } = useMemo(() => {
    // We need to wait for the component to be mounted before we can get the
    // selected element's offsetLeft and offsetWidth.
    if (!isMounted) {
      return { left: 0, width: 0 };
    }
    const selectedElement = itemsRef.current[selectedIndex];
    return {
      left: selectedElement?.offsetLeft || 0,
      width: selectedElement?.offsetWidth || 0,
    };
  }, [itemsRef, selectedIndex, isMounted]);

  return (
    <div className="ink-relative">
      {isMounted && selectedOption && (
        <div
          className="ink-absolute ink-transition-all ink-duration-200 ink-p-0.5 ink-preflight"
          style={{
            top: 0,
            bottom: 0,
            left: `${left}px`,
            width: `${width}px`,
          }}
        >
          <div
            className={classNames(
              "ink-w-full ink-h-full ink-rounded-full",
              variantClassNames(variant, {
                purple: "ink-bg-background-light",
                transparent: "ink-bg-background-dark",
              })
            )}
          />
        </div>
      )}
      <div
        className={classNames(
          "ink-grid ink-gap-2 ink-grid-flow-col [grid-auto-columns:1fr] ink-text-body-2 ink-font-bold ink-rounded-full",
          variantClassNames(variant, {
            purple: "ink-bg-background-container",
            transparent: "ink-bg-background-light",
          })
        )}
      >
        {options.map((option, index) => (
          <button
            className={classNames(
              resetClasses,
              "ink-px-4 ink-py-2 ink-rounded-full ink-relative ink-z-10 ink-transition-colors ink-duration-200 ink-select-none",
              selectedOption === option.value
                ? "ink-text-text-default"
                : "ink-text-text-on-secondary"
            )}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            key={option.value}
            onClick={() => {
              setSelectedOption(option.value);
              onOptionChange(option, index);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};