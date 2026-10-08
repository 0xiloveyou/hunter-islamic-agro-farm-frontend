import type { Payment, ShareSummary } from "@/types";

const amountKeys = [
  "totalInvestedAmount",
  "totalSpentAmount",
  "totalSpendAmount",
  "totalInvestmentAmount",
  "verifiedInvestmentAmount",
  "totalAmount",
  "amount",
  "investedAmount",
  "paidAmount",
  "price",
] as const;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return null;
}

function numberFromKeys(value: unknown, keys: readonly string[]): number {
  const record = asRecord(value);

  if (!record) {
    return 0;
  }

  for (const key of keys) {
    const amount = Number(record[key] ?? 0);

    if (Number.isFinite(amount) && amount > 0) {
      return amount;
    }
  }

  return 0;
}

function sumAmounts(items: unknown[] | undefined): number {
  return (items ?? []).reduce(
    (total: number, item) => total + numberFromKeys(item, amountKeys),
    0,
  );
}

export function getTotalSpendAmount(
  shares?: ShareSummary,
  payments?: Payment[],
): number {
  const summaryTotal = numberFromKeys(shares, amountKeys);

  if (summaryTotal > 0) {
    return summaryTotal;
  }

  const sharesTotal = sumAmounts(shares?.shares);

  if (sharesTotal > 0) {
    return sharesTotal;
  }

  return sumAmounts(payments);
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
