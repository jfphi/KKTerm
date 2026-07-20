# settings.savedCredentialDeleteUsed

- **English value**: `This credential is used by {{count}} Connection(s). Deleting it removes the stored password; those Connections will ask for a password when they open.`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/SavedCredentialsManager.tsx`
- **UI role**: `fragment`
- **User flow**: Delete confirmation body for a saved credential that still has linked Connections.
- **Tone**: concise/neutral
- **Placeholders**: `{{count}}` number of linked Connections; plural forms `_one`/`_other`
- **Context/meaning**: Warns that linked Connections lose their stored password and will prompt interactively.
- **Domain notes**: Connection stays capitalized and English.
