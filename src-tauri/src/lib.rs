use tauri_plugin_dialog;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EmailPayload {
    from: String,
    to: Vec<String>,
    subject: String,
    html: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn send_email(api_key: String, to_email: String, subject: String, html: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    
    let payload = EmailPayload {
        from: "Stack Provider <no_reply@stackprovider.com>".to_string(),
        to: vec![to_email],
        subject,
        html,
    };
    
    let response = client
        .post("https://api.resend.com/emails")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&payload)
        .send()
        .await
        .map_err(|e| format!("Network error: {}", e))?;
    
    if response.status().is_success() {
        Ok("Email sent successfully".to_string())
    } else {
        let status = response.status();
        let error_text = response.text().await.unwrap_or_else(|_| "Unknown error".to_string());
        Err(format!("Email service error ({}): {}", status, error_text))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();

    #[cfg(any(target_os = "android", target_os = "ios"))]
    let builder = builder.plugin(tauri_plugin_barcode_scanner::init());

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    let builder = builder;

    builder
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            #[cfg(desktop)]
            let _ = app
                .handle()
                .plugin(tauri_plugin_updater::Builder::new().build());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, send_email])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
