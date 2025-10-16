use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct SmsResponse {
    response_code: u16,
}

#[tauri::command]
pub async fn send_sms(
    api_key: String,
    phone_number: String,
    message: String,
) -> Result<String, String> {
    log::info!(
        "SMS Request - Phone: {}, Message: {}",
        phone_number,
        message
    );
    log::debug!("API Key: {}", api_key);

    let sender_id = "8809617613576";
    let url = format!(
        "https://bulksmsbd.net/api/smsapi?api_key={}&type=text&number={}&senderid={}&message={}",
        api_key,
        urlencoding::encode(&phone_number),
        sender_id,
        urlencoding::encode(&message)
    );

    let client = reqwest::Client::new();
    let response = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("Network error: {}", e))?;

    let sms_response: SmsResponse = response
        .json()
        .await
        .map_err(|e| format!("Parse error: {}", e))?;

    log::info!("SMS Response - Code: {}", sms_response.response_code);

    match sms_response.response_code {
        202 => {
            log::info!("SMS sent successfully to {}", phone_number);
            Ok("SMS sent successfully".to_string())
        }
        1001 => {
            log::error!("Invalid phone number: {}", phone_number);
            Err("Invalid phone number".to_string())
        }
        1006 => {
            log::error!("SMS send failed for {}", phone_number);
            Err("SMS send failed".to_string())
        }
        _ => {
            log::error!(
                "Unknown error code: {} for {}",
                sms_response.response_code,
                phone_number
            );
            Err(format!(
                "Unknown error code: {}",
                sms_response.response_code
            ))
        }
    }
}
