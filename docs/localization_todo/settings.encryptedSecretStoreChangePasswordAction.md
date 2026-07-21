# settings.encryptedSecretStoreChangePasswordAction

- **English value**: `Change master password`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/EncryptedSecretStoreChangePasswordDialog.tsx`
- **UI role**: `button`
- **User flow**: Opens and submits the non-destructive encrypted-database password rotation flow.
- **Tone**: concise/neutral
- **Placeholders**: none
- **Context/meaning**: Change the encryption master password while preserving all saved credentials; this is distinct from destructive reset.
- **Domain notes**: Encrypted database is KKTerm's SQLite-backed secret store.
