// Process-spawning helpers shared by detect/check/install code paths.
//
// On Windows, a GUI parent process (Tauri host) spawning a console-subsystem
// child like `winget.exe`, `npm.cmd`, or `dism.exe` causes Windows to
// allocate a console for the child and briefly flash a black cmd window
// on screen. Detection and version-check work runs on Module entry and
// during "Check for updates", so without suppression the user sees several
// console windows flicker every time. `CREATE_NO_WINDOW` (0x0800_0000)
// suppresses the console allocation; on non-Windows targets the helper is
// a no-op.

use std::process::Command;

#[cfg(windows)]
const CREATE_NO_WINDOW: u32 = 0x0800_0000;

/// Apply the platform-appropriate "do not flash a console window" flag to a
/// `Command` before spawning. Returns the same `Command` for chaining.
pub fn no_window(cmd: &mut Command) -> &mut Command {
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(CREATE_NO_WINDOW);
    }
    cmd
}

/// Decode output from Windows console programs without corrupting localized
/// text. Most modern tools emit UTF-8, while older/native console paths use the
/// machine OEM code page (950 on zh-TW Windows).
pub fn decode_console_output(bytes: &[u8]) -> String {
    #[cfg(windows)]
    {
        let code_page = unsafe { windows_sys::Win32::Globalization::GetOEMCP() };
        return decode_console_output_with_code_page(bytes, code_page);
    }

    #[cfg(not(windows))]
    String::from_utf8_lossy(bytes).into_owned()
}

#[cfg(any(windows, test))]
fn decode_console_output_with_code_page(bytes: &[u8], code_page: u32) -> String {
    if let Ok(text) = std::str::from_utf8(bytes) {
        return text.to_owned();
    }

    let encoding = match code_page {
        932 => Some(encoding_rs::SHIFT_JIS),
        936 => Some(encoding_rs::GBK),
        949 => Some(encoding_rs::EUC_KR),
        950 => Some(encoding_rs::BIG5),
        1250 => Some(encoding_rs::WINDOWS_1250),
        1251 => Some(encoding_rs::WINDOWS_1251),
        1252 => Some(encoding_rs::WINDOWS_1252),
        1253 => Some(encoding_rs::WINDOWS_1253),
        1254 => Some(encoding_rs::WINDOWS_1254),
        1255 => Some(encoding_rs::WINDOWS_1255),
        1256 => Some(encoding_rs::WINDOWS_1256),
        1257 => Some(encoding_rs::WINDOWS_1257),
        1258 => Some(encoding_rs::WINDOWS_1258),
        _ => None,
    };
    match encoding {
        Some(encoding) => encoding.decode(bytes).0.into_owned(),
        None => String::from_utf8_lossy(bytes).into_owned(),
    }
}

pub fn npm_program() -> &'static str {
    if cfg!(target_os = "windows") {
        "npm.cmd"
    } else {
        "npm"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn npm_program_uses_windows_cmd_shim() {
        #[cfg(target_os = "windows")]
        assert_eq!(npm_program(), "npm.cmd");

        #[cfg(not(target_os = "windows"))]
        assert_eq!(npm_program(), "npm");
    }

    #[test]
    fn console_output_decodes_zh_tw_oem_bytes() {
        let (bytes, _, had_errors) = encoding_rs::BIG5.encode("已安裝");
        assert!(!had_errors);

        assert_eq!(
            decode_console_output_with_code_page(&bytes, 950),
            "已安裝"
        );
        assert_eq!(
            decode_console_output_with_code_page("已安裝".as_bytes(), 950),
            "已安裝"
        );
    }
}
