# settings.segmentDesc_settings

- **English value**: `Application preferences, defaults, and MCP server configuration (without secret header values).`
- **Namespace**: `settings`
- **File/component**: `src/modules/settings/SelectiveExportDialog.tsx`, `src/modules/settings/SelectiveImportDialog.tsx`, `src/modules/settings/PortableCreatorDialog.tsx`
- **UI role**: `fragment`
- **User flow**: Description under the "Settings" toggle in the Export Selection / Import / Portable Copy dialogs. Value CHANGED: the Settings category now also carries MCP Servers (the separate "MCP Servers" category was consolidated into Settings).
- **Tone**: concise/neutral
- **Placeholders**: none
- **Context/meaning**: Settings now bundles application preferences/defaults together with MCP server list and configuration; secret MCP header values are never exported. Non-English locales still hold the previous wording ("Application preferences and defaults.") and must be updated to mention MCP servers.
- **Domain notes**: "MCP" (Model Context Protocol) server stays English. Mirror the retained `segmentDesc_mcpServers` phrasing about excluding secret header values.

<!--
Filename: settings.segmentDesc_settings.md
Delete this file once every non-English locale under src/i18n/locales/ has the key translated.
-->
