# settings.portableCreatorConnectionsDesc

- **English value**: `Workspaces plus the Connections, folders, and tags inside them. Passwords are excluded.`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/PortableCreatorDialog.tsx`
- **UI role**: `fragment`
- **User flow**: Description under the "Workspaces and Connections" toggle in the Portable Copy wizard. Value CHANGED: the category now covers Workspaces as well as Connections after the two were consolidated.
- **Tone**: concise/neutral
- **Placeholders**: none
- **Context/meaning**: Portable copies always exclude passwords, so this description states that explicitly (unlike the selective-export description, which says passwords travel only when included). Non-English locales still hold the previous wording that mentioned only Connections and must be updated to mention Workspaces.
- **Domain notes**: "Workspaces"/"Connections" are KKTerm domain terms; mirror the existing per-locale `segment_workspaces` / `segment_connections` wording (zh-TW must use 連線, 資料夾).

<!--
Filename: settings.portableCreatorConnectionsDesc.md
Delete this file once every non-English locale under src/i18n/locales/ has the key translated.
-->
