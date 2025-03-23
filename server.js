import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default {
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
}