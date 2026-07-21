# settings.segmentDesc_workspacesConnections

- **English value**: `Workspace list plus the Connections, folders, and tags inside them. Passwords travel only when included below.`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/SelectiveExportDialog.tsx`, `src/modules/settings/SelectiveImportDialog.tsx`
- **UI role**: `fragment`
- **User flow**: Description shown under the "Workspaces and Connections" toggle in the Export Selection dialog (and reused by the selective Import dialog grouping).
- **Tone**: concise/neutral
- **Placeholders**: none
- **Context/meaning**: Explains that this consolidated category carries the Workspace list and the Connections/folders/tags within them, and that passwords are only included when the separate credentials option below is turned on. The Portable Copy wizard uses a different description key (`portableCreatorConnectionsDesc`) because portable copies never carry passwords.
- **Domain notes**: "Workspaces" and "Connections" are KKTerm domain terms — mirror `segmentDesc_workspaces` / `segmentDesc_connections` wording per locale. Best-effort translations were added to every locale; verify before deleting (zh-TW must use 連線, 資料夾).

<!--
Filename: settings.segmentDesc_workspacesConnections.md
Delete this file once every non-English locale under src/i18n/locales/ has the key translated.
-->
