# settings.segment_workspacesConnections

- **English value**: `Workspaces and Connections`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/SelectiveExportDialog.tsx`, `src/modules/settings/SelectiveImportDialog.tsx`, `src/modules/settings/PortableCreatorDialog.tsx`
- **UI role**: `label`
- **User flow**: Category label in the Export Selection / Import / Portable Copy dialogs. It names the consolidated category that carries both Workspaces and the Connections inside them.
- **Tone**: concise/neutral
- **Placeholders**: none
- **Context/meaning**: A single export/import category that groups Workspaces together with Connections (they can no longer be exported separately). "and" joins the two nouns.
- **Domain notes**: "Workspaces" are the top-level KKTerm containers; "Connections" are saved SSH/RDP/VNC/URL/etc. entries. Both are established KKTerm domain terms — mirror the existing `segment_workspaces` and `segment_connections` translations for each locale. Best-effort translations were added to every locale in the same change; verify wording and regional terminology (zh-TW must use 連線, not 連接) before deleting this file.

<!--
Filename: settings.segment_workspacesConnections.md
Delete this file once every non-English locale under src/i18n/locales/ has the key translated.
-->
