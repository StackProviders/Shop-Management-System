use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EmailPayload {
    from: String,
    to: Vec<String>,
    subject: String,
    html: String,
}

#[tauri::command]
pub async fn send_email(
    api_key: String,
    to_email: String,
    subject: String,
    html: String,
) -> Result<String, String> {
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
        let error_text = response
            .text()
            .await
            .unwrap_or_else(|_| "Unknown error".to_string());
        Err(format!("Email service error ({}): {}", status, error_text))
    }
}
