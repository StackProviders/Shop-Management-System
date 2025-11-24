use tauri_plugin_dialog;

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env_logger::init();

    let cache_config = tauri_plugin_cache::CacheConfig {
        cache_dir: Some("image_cache".into()),
        cache_file_name: Some("images.json".into()),
        cleanup_interval: Some(300),
        default_compression: Some(true),
        compression_level: Some(6),
        compression_threshold: Some(10240),
        compression_method: Some(tauri_plugin_cache::CompressionMethod::Zlib),
    };

    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_cache::init_with_config(cache_config))
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build());

    #[cfg(any(target_os = "android", target_os = "ios"))]
    {
        builder = builder
            .plugin(tauri_plugin_barcode_scanner::init())
            .plugin(tauri_plugin_safe_area_insets::init());
    }

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        builder = builder
            .plugin(tauri_plugin_window_state::Builder::new().build())
            .plugin(tauri_plugin_system_info::init());
    }

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
        .invoke_handler(tauri::generate_handler![
            commands::utils::greet,
            commands::email::send_email,
            commands::sms::send_sms,
            commands::auth::get_custom_token
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
