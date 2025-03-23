#!/usr/bin/env node

import { createServer } from '@modelcontextprotocol/sdk';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const server = createServer({
  functions: {
    async execute_command({ command }) {
      try {
        const { stdout, stderr } = await execAsync(command);
        
        return {
          success: true,
          stdout,
          stderr,
          command
        };
      } catch (error) {
        console.error('Command execution error:', error);
        
        return {
          success: false,
          error: {
            message: error.message,
            code: error.code,
            command
          },
          stderr: error.stderr,
          stdout: error.stdout
        };
      }
    }
  }
});

// Global error handler
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

server.start().catch(error => {
  console.error('Server startup error:', error);
  process.exit(1);
});