interface DeliveryBadgeProps {
  deliveryDays: number;
}

export default function DeliveryBadge({ deliveryDays }: DeliveryBadgeProps) {
  const date = new Date(Date.now() + deliveryDays * 86400000);
  const formatted = date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <span className="text-slate-400 text-sm">
      Delivery by <strong className="text-slate-300">{formatted}</strong>
    </span>
  );
}
