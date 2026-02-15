import { env } from '@/server/config/env';

type LogLevel = 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

const SENSITIVE_KEYWORDS = [
  'authorization',
  'cookie',
  'password',
  'secret',
  'privatekey',
  'token',
  'apikey',
];

function isSensitiveKey(key: string): boolean {
  const normalized = key.toLowerCase();
  return SENSITIVE_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function sanitizeValue(value: unknown): unknown {
  if (value == null) return value;

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...(env.nodeEnv !== 'production' && value.stack ? { stack: value.stack } : {}),
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      output[key] = isSensitiveKey(key) ? '[REDACTED]' : sanitizeValue(item);
    }
    return output;
  }

  return value;
}

function sanitizeContext(context: LogContext): Record<string, unknown> {
  const sanitized = sanitizeValue(context);
  if (sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)) {
    return sanitized as Record<string, unknown>;
  }

  return {};
}

/** Writes one structured log line in JSON format */
function write(level: LogLevel, message: string, context: LogContext = {}): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...sanitizeContext(context),
  };

  const serialized = `${JSON.stringify(payload)}\n`;
  if (level === 'error') {
    process.stderr.write(serialized);
    return;
  }

  process.stdout.write(serialized);
}

export const logger = {
  /** Logs informational diagnostics for server-side execution paths */
  info(message: string, context?: LogContext): void {
    write('info', message, context);
  },
  /** Logs warning diagnostics for recoverable server-side conditions */
  warn(message: string, context?: LogContext): void {
    write('warn', message, context);
  },
  /** Logs error diagnostics for failed server-side execution paths */
  error(message: string, context?: LogContext): void {
    write('error', message, context);
  },
};
