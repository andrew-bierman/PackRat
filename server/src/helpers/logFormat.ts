// ./helpers/logFormat.js

function getEmoji(status) {
  if (status >= 500) return '🔥';
  if (status >= 400) return '⚠️';
  return '✅';
}

function colorizeStatus(status) {
  if (status >= 500) return '\x1b[31m'; // Red
  if (status >= 400) return '\x1b[33m'; // Yellow
  return '\x1b[32m'; // Green
}

export function logFormat(tokens, req, res) {
  const status = res.statusCode;
  const statusColor = colorizeStatus(status);
  const emoji = getEmoji(status);

  return [
    emoji, // Emoji
    '\x1b[36m',
    tokens.method(req, res), // Cyan
    '→', // Right arrow
    '\x1b[0m',
    tokens.url(req, res), // Reset color
    statusColor,
    tokens.status(req, res), // Colorized status
    '\x1b[35m',
    tokens['response-time'](req, res),
    'ms', // Magenta
    '\x1b[0m', // Reset color
  ].join(' ');
}
