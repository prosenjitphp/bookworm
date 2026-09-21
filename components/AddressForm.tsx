"use client";

import { useEffect, useState } from "react";
import { Address } from "@/lib/types";

const INPUT_CLASS =
  "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 text-sm";

const LABEL_CLASS = "block text-xs text-slate-400 mb-1";

type AddressFields = Omit<Address, "id" | "userId">;

const EMPTY: AddressFields = {
  firstName: "",
  lastName: "",
  addressLine: "",
  email: "",
  city: "",
  pin: "",
  phone: "",
  state: "",
  country: "India",
};

interface AddressFormProps {
  onAddressChange: (address: Partial<Address>) => void;
  savedAddress?: Address;
}

export default function AddressForm({
  onAddressChange,
  savedAddress,
}: AddressFormProps) {
  const [useSaved, setUseSaved] = useState(false);
  const [fields, setFields] = useState<AddressFields>(EMPTY);

  // When "use saved" is toggled on, populate from savedAddress
  useEffect(() => {
    if (useSaved && savedAddress) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, userId, ...rest } = savedAddress;
      setFields(rest);
      onAddressChange(rest);
    } else if (!useSaved) {
      setFields(EMPTY);
      onAddressChange(EMPTY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSaved, savedAddress]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const updated = { ...fields, [e.target.name]: e.target.value };
    setFields(updated);
    onAddressChange(updated);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-100">Address</h2>

      {/* Use Saved Address checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-300">
        <input
          type="checkbox"
          checked={useSaved}
          onChange={(e) => setUseSaved(e.target.checked)}
          disabled={!savedAddress}
          className="w-4 h-4 accent-blue-500 rounded"
        />
        Use Saved Address
        {!savedAddress && (
          <span className="text-xs text-slate-500 ml-1">(none found)</span>
        )}
      </label>

      {/* Form grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Row 1: First Name / Last Name */}
        <div>
          <label className={LABEL_CLASS}>First Name *</label>
          <input
            name="firstName"
            value={fields.firstName}
            onChange={handleChange}
            placeholder="John"
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Last Name *</label>
          <input
            name="lastName"
            value={fields.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={INPUT_CLASS}
            required
          />
        </div>

        {/* Row 2: Address (full width) */}
        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>Address *</label>
          <input
            name="addressLine"
            value={fields.addressLine}
            onChange={handleChange}
            placeholder="123 MG Road, Flat 4B"
            className={INPUT_CLASS}
            required
          />
        </div>

        {/* Row 3: Email (full width) */}
        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>E-mail *</label>
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={INPUT_CLASS}
            required
          />
        </div>

        {/* Row 4: City / Pin / Phone */}
        <div>
          <label className={LABEL_CLASS}>City *</label>
          <input
            name="city"
            value={fields.city}
            onChange={handleChange}
            placeholder="Bengaluru"
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Pin *</label>
          <input
            name="pin"
            value={fields.pin}
            onChange={handleChange}
            placeholder="560001"
            maxLength={6}
            pattern="\d{6}"
            inputMode="numeric"
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Phone *</label>
          <div className="flex gap-1">
            <select
              aria-label="Country code"
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-slate-300 text-sm focus:outline-none focus:border-blue-500 shrink-0"
            >
              <option value="+91">+91</option>
            </select>
            <input
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              placeholder="9876543210"
              inputMode="tel"
              className={INPUT_CLASS}
              required
            />
          </div>
        </div>

        {/* Row 5: State / Country */}
        <div>
          <label className={LABEL_CLASS}>State *</label>
          <input
            name="state"
            value={fields.state}
            onChange={handleChange}
            placeholder="Karnataka"
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Country *</label>
          <select
            name="country"
            value={fields.country}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
      </div>
    </div>
  );
}
