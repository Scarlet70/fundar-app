import { motion, useReducedMotion } from "motion/react";
import {
    ArrowUpRight,
    CheckCircle2,
    CircleDollarSign,
    Receipt,
    Utensils,
    Wallet,
} from "lucide-react";

const FLOAT_DURATION = 2;

const floatTransition = {
    duration: FLOAT_DURATION,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "reverse" as const,
};

function useFloatAnimation(distance: number) {
    const prefersReducedMotion = useReducedMotion();

    return {
        animate: prefersReducedMotion ? { y: 0 } : { y: [0, -distance, 0] },
        transition: floatTransition,
    };
}

/* ─────────────────────────────────────────────
   CARD 1: Available to Allocate
───────────────────────────────────────────── */

export function AvailableBalanceCard() {
    return (
        <motion.div
            {...useFloatAnimation(5)}
            className="relative w-36 rounded-xl border border-orange-400/25 bg-white/95 dark:bg-black/95 p-2.5 shadow-[0_8px_30px_-12px_rgba(249,115,22,0.3)] backdrop-blur-xl sm:w-44 sm:p-3.5 lg:w-52 lg:rounded-2xl lg:p-4"
        >
            <div className="absolute -inset-2 -z-10 rounded-2xl bg-orange-500/15 blur-xl" />

            <div className="flex items-center justify-between gap-1">
                <div className="flex size-4 items-center justify-center rounded-lg bg-fundar-brand/10 text-orange-500 sm:size-8 lg:size-9 lg:rounded-xl">
                    <Wallet size={16} />
                </div>

                <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[8px] font-medium text-orange-600 sm:text-[10px] dark:text-orange-400">
                    Available
                </span>
            </div>

            <p className="mt-2.5 text-[9px] text-zinc-500 sm:mt-3 sm:text-xs lg:mt-4">
                Available to allocate
            </p>

            <div className="mt-1 flex items-center gap-0.5">
                <span className="font-semibold tracking-tight text-zinc-900 text-[10px] xl:text-[0.9rem] dark:text-white">
                    $1,240.50
                </span>
                <ArrowUpRight
                    size={13}
                    className="shrink-0 text-orange-500"
                />
            </div>

            <p className="mt-1 text-[9px] text-zinc-500 sm:text-[10px] lg:text-[11px]">
                Ready for your next budget
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   CARD 2: Budget Progress
───────────────────────────────────────────── */

export function BudgetProgressCard() {
    return (
        <motion.div
            {...useFloatAnimation(4)}
            className="relative w-30 rounded-xl border border-zinc-200/80 bg-white/95 p-2.5 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:w-40 sm:p-3.5 lg:w-48 lg:rounded-2xl lg:p-4 dark:border-white/10 dark:bg-zinc-950/95"
        >
            <div className="absolute -inset-1.5 -z-10 rounded-2xl bg-orange-500/10 blur-lg" />

            <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 sm:size-8">
                    <CircleDollarSign size={15} />
                </div>

                <div className="min-w-0">
                    <p className="text-[8px] font-medium text-zinc-900 sm:text-xs dark:text-white text-nowrap">
                        Monthly budget
                    </p>
                    <p className="text-[8px] text-zinc-500 sm:text-[10px] text-nowrap">
                        Allocation progress
                    </p>
                </div>
            </div>

            <div className="mt-2.5 flex items-end justify-between sm:mt-3 lg:mt-4">
                <span className="text-xs font-semibold text-zinc-900 xl:text-[0.9rem] dark:text-white">
                    72%
                </span>
                <span className="pb-0.5 text-[9px] text-orange-600 sm:text-[10px] dark:text-orange-400">
                    Allocated
                </span>
            </div>

            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-100 sm:mt-2 sm:h-1.5 dark:bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-linear-to-r from-orange-400 to-orange-600" />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   CARD 3: Expense Recorded
───────────────────────────────────────────── */

export function ExpenseRecordedCard() {
    return (
        <motion.div
            {...useFloatAnimation(4)}
            className="flex w-35 items-center gap-1 rounded-xl border border-zinc-200/80 bg-white/95 p-2.5 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:w-48 sm:gap-2.5 sm:p-3 lg:w-56 lg:gap-3 lg:rounded-2xl lg:p-3.5 dark:border-white/10 dark:bg-zinc-950/95"
        >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 sm:size-9 lg:size-10 lg:rounded-xl">
                <Receipt size={12} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-[8px] font-semibold text-zinc-900 sm:text-xs dark:text-white text-nowrap">
                    Expense recorded
                </p>
                <p className="mt-1 text-[9px] text-zinc-500 sm:text-[10px] lg:text-[11px] text-nowrap">
                    Feeding · ₦8,500
                </p>
            </div>

            <CheckCircle2
                size={12}
                className="shrink-0 text-emerald-500 sm:size-4.25"
            />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   CARD 4: Allocation Category
───────────────────────────────────────────── */

export function AllocationCategoryCard() {
    return (
        <motion.div
            {...useFloatAnimation(4)}
            className="relative w-35 rounded-xl border border-zinc-200/80 bg-white/95 p-2.5 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:w-40 sm:p-3 lg:w-48 lg:rounded-2xl lg:p-3.5 dark:border-white/10 dark:bg-zinc-950/95"
        >
            <div className="absolute -inset-1.5 -z-10 rounded-2xl bg-orange-500/10 blur-lg" />

            <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 sm:size-8">
                    <Utensils size={13} />
                </div>

                <div className="min-w-0">
                    <p className="text-[9px] font-semibold text-zinc-900 sm:text-xs dark:text-white">
                        Feeding
                    </p>
                    <p className="text-[9px] text-zinc-500 sm:text-[10px]">
                        Budget category
                    </p>
                </div>
            </div>

            <p className="mt-2 font-semibold text-zinc-900 sm:mt-3 text-[10px] xl:text-[0.9rem] dark:text-white">
                ₦45,000
            </p>

            <div className="mt-1.5 flex items-center justify-between gap-1 text-[9px] sm:mt-2 sm:text-[10px]">
                <span className="text-zinc-500">Budget used</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">
                    64%
                </span>
            </div>

            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-100 sm:mt-2 dark:bg-white/10">
                <div className="h-full w-[64%] rounded-full bg-orange-500" />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   PARENT: All Four Floating Cards
───────────────────────────────────────────── */

export default function FloatingCards() {
    return (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
            {/* Top-left */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute left-[20%] top-[-19%] sm:-left-2 sm:top-[8%] lg:-left-14 lg:top-[12%]"
            >
                <AvailableBalanceCard />
            </motion.div>

            {/* Top-right */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute right-[-4%] top-[15%] sm:-right-2 sm:top-[22%] lg:-right-12"
            >
                <BudgetProgressCard />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-[17%] left-[-5%] sm:bottom-[18%] sm:-left-2 lg:-bottom-7 lg:-left-5"
            >
                <ExpenseRecordedCard />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-[-7%] right-0 sm:-right-2 lg:-right-3 lg:-bottom-8"
            >
                <AllocationCategoryCard />
            </motion.div>
        </div>
    );
}
