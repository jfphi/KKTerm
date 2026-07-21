# settings.encryptedSecretStoreChangePasswordBody

- **English value**: `Enter the current and new master passwords. Saved credentials will be re-encrypted and preserved.`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/EncryptedSecretStoreChangePasswordDialog.tsx`
- **UI role**: `status`
- **User flow**: Explains the effect of changing the encrypted database master password.
- **Tone**: direct security guidance
- **Placeholders**: none
- **Context/meaning**: The operation preserves secrets by decrypting and re-encrypting them, unlike reset.
- **Domain notes**: Credentials are saved secret values, not durable Connection metadata.
