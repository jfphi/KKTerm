# connections.sharedCredentialUpdateBody

- **English value**: `This Connection links to '{{label}}', used by {{count}} Connection(s). Update that credential with the new password, or create a separate credential for this Connection only?`
- **Namespace**: `connections`
- **File/component**: `src/modules/workspace/connections/ConnectionSidebar.tsx`
- **UI role**: `fragment`
- **User flow**: Body of the shared-credential update confirmation in the Connection dialog.
- **Tone**: concise/neutral
- **Placeholders**: `{{label}}` credential name, `{{count}}` linked Connections; plural forms `_one`/`_other`
- **Context/meaning**: Explains the blast radius: updating the credential changes the password for every linked Connection.
- **Domain notes**: Connection stays capitalized and English.
