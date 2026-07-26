# FaceSwap Video Processor — Bot specification

**Archetype:** custom

**Voice:** professional and concise — write every user-facing message, button label, error, and empty state in this voice.

A private Telegram bot for the owner/admin to perform face swaps on videos using uploaded media files. Processes video+image inputs, returns swapped video and preview with status tracking.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- owner/admin

## Success criteria

- Process face-swap jobs with video/image inputs and return outputs to owner within 30-day retention window

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open main menu with /swap command
- **/swap** (command, actor: user, command: /swap) — Initiate face-swap job workflow
  - inputs: video, image
  - outputs: preview video, full video, job summary
- **5s Preview** (button, actor: user, callback: preview:5) — Select 5-second preview length
- **10s Preview** (button, actor: user, callback: preview:10) — Select 10-second preview length
- **15s Preview** (button, actor: user, callback: preview:15) — Select 15-second preview length

## Flows

### FaceSwap Job
_Trigger:_ /swap

1. Prompt for video upload
2. Prompt for image upload
3. Collect preview settings
4. Process job
5. Send preview and full video outputs

_Data touched:_ Job, Media files

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **Job** _(retention: persistent)_ — Face-swap request metadata
  - fields: video_file_id, image_file_id, preview_length, start_time, status, job_id
- **Media files** _(retention: persistent)_ — Original and generated media assets
  - fields: file_type, file_id, upload_timestamp

## Integrations

- **Telegram** (required) — Private bot messaging and file transfers
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Set 30-day retention policy for jobs/outputs
- Define error message templates
- Approve custom preview lengths

## Notifications

- Job status updates (queued/processing/done/failed)
- File upload confirmations
- 30-day retention expiration warnings

## Permissions & privacy

- Restrict all interactions to verified owner Telegram ID
- Never share outputs with external chats
- Encrypt media files at rest

## Edge cases

- Invalid video/image formats
- Preview start time beyond video duration
- Face-swap processing failures
- Concurrent job submissions

## Required tests

- End-to-end job flow: /swap → uploads → processing → output delivery
- Error handling for malformed inputs
- 30-day retention cleanup verification

## Assumptions

- Owner provides working face-swap API integration
- Media files fit within Telegram file size limits
- Owner handles storage costs for generated outputs
