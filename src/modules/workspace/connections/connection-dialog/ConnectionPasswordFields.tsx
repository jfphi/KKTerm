import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { technicalInputProps } from "../../../../lib/inputBehavior";
import type { StoredCredentialSummary } from "../../../../types";
import { createStoredSecretMask } from "../connectionSidebarState";

export function PasswordField({
  autoComplete = "current-password",
  hasStoredSecret,
  initialValue = "",
  label,
  name,
  placeholder,
  required,
}: {
  autoComplete?: string;
  hasStoredSecret: boolean;
  initialValue?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [storedSecretMask, setStoredSecretMask] = useState(createStoredSecretMask);
  const shouldShowStoredSecretMask = hasStoredSecret && !isFocused && value.length === 0;

  useEffect(() => {
    if (hasStoredSecret) {
      setStoredSecretMask(createStoredSecretMask());
    }
  }, [hasStoredSecret]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <label>
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        {...technicalInputProps}
        name={shouldShowStoredSecretMask ? undefined : name}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => setValue(event.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        required={shouldShowStoredSecretMask ? false : required}
        type="password"
        value={shouldShowStoredSecretMask ? storedSecretMask : value}
      />
    </label>
  );
}

export function PasswordCredentialSelect({
  credentials,
  selectedCredentialId,
  includeTypeNewOption = true,
  onChange,
}: {
  credentials: StoredCredentialSummary[];
  selectedCredentialId: string;
  includeTypeNewOption?: boolean;
  onChange: (credentialId: string) => void;
}) {
  const { t } = useTranslation();
  if (credentials.length === 0) {
    return null;
  }
  return (
    <label>
      <span>{t("connections.savedPassword")}</span>
      <select
        name="passwordCredentialId"
        onChange={(event) => onChange(event.currentTarget.value)}
        value={selectedCredentialId}
      >
        {includeTypeNewOption ? <option value="">{t("connections.typeNewPassword")}</option> : null}
        {credentials.map((credential) => (
          <option key={credential.ownerId} value={credential.ownerId}>
            {credential.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export type PasswordEntryMode = "new" | "saved";

/**
 * Explicit password source choice: type a new password or link a saved
 * credential. Only the active field is rendered, so the form never carries
 * both a typed password and a credential id (which previously discarded the
 * selection silently and minted duplicate credentials).
 */
export function PasswordCredentialModeFields({
  credentials,
  defaultMode,
  hasStoredSecret,
  label,
  placeholder,
  selectedCredentialId,
  onSelectedCredentialIdChange,
}: {
  credentials: StoredCredentialSummary[];
  defaultMode: PasswordEntryMode;
  hasStoredSecret: boolean;
  label: string;
  placeholder: string;
  selectedCredentialId: string;
  onSelectedCredentialIdChange: (credentialId: string) => void;
}) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<PasswordEntryMode>(defaultMode);

  if (credentials.length === 0) {
    return (
      <PasswordField
        hasStoredSecret={hasStoredSecret}
        label={label}
        name="password"
        placeholder={placeholder}
      />
    );
  }

  const effectiveSelection = credentials.some(
    (credential) => credential.ownerId === selectedCredentialId,
  )
    ? selectedCredentialId
    : credentials[0].ownerId;

  return (
    <>
      <div className="password-credential-mode" role="group" aria-label={t("connections.savedPassword")}>
        <button
          className={mode === "new" ? "active" : ""}
          type="button"
          onClick={() => setMode("new")}
        >
          {t("connections.enterNewPassword")}
        </button>
        <button
          className={mode === "saved" ? "active" : ""}
          type="button"
          onClick={() => setMode("saved")}
        >
          {t("connections.useSavedCredential")}
        </button>
      </div>
      {mode === "saved" ? (
        <PasswordCredentialSelect
          credentials={credentials}
          includeTypeNewOption={false}
          onChange={onSelectedCredentialIdChange}
          selectedCredentialId={effectiveSelection}
        />
      ) : (
        <PasswordField
          hasStoredSecret={hasStoredSecret}
          label={label}
          name="password"
          placeholder={placeholder}
        />
      )}
    </>
  );
}
