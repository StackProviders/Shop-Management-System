use jsonwebtoken::{Algorithm, EncodingKey, Header, encode};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    iss: String,
    sub: String,
    aud: String,
    iat: usize,
    exp: usize,
    uid: String,
}

#[tauri::command]
pub async fn get_custom_token(
    email: String,
    service_account_email: String,
    private_key: String,
) -> Result<String, String> {
    // Clean up private key string (handle newlines if passed as single line env var)
    let private_key = private_key.replace("\\n", "\n");

    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs() as usize;

    let claims = Claims {
        iss: service_account_email.clone(),
        sub: service_account_email,
        aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit".to_string(),
        iat: now,
        exp: now + 3600, // 1 hour expiration
        uid: email, // Using email as uid for simplicity, or look up uid from email if needed
    };

    let header = Header::new(Algorithm::RS256);

    let token = encode(
        &header,
        &claims,
        &EncodingKey::from_rsa_pem(private_key.as_bytes())
            .map_err(|e| format!("Invalid private key: {}", e))?,
    )
    .map_err(|e| format!("Token generation error: {}", e))?;

    Ok(token)
}
