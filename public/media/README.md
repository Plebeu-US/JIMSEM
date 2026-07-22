# JIMSEM live feed

The live player uses the same looping video in these two files:

- `jimsem-live.webm` — preferred source.
- `jimsem-live.mp4` — browser fallback.

Keep both files encoded without autoplay-blocking metadata. The player is muted,
loops automatically, plays inline, and exposes the browser's native controls.
No poster image is configured, so playback appears as soon as the video is ready.
