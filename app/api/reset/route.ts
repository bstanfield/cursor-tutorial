import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    const projectRoot = process.cwd();

    // Fetch latest from origin
    await execAsync("git fetch origin main", { cwd: projectRoot });

    // Discard all local changes and reset to origin/main
    await execAsync("git reset --hard origin/main", { cwd: projectRoot });

    // Clean up any untracked files
    await execAsync("git clean -fd", { cwd: projectRoot });

    return NextResponse.json({
      success: true,
      message: "Sandbox reset successfully - all changes discarded and pulled latest from main",
    });
  } catch (error: any) {
    console.error("Reset error:", error);
    
    // Provide more detailed error information
    const errorMessage = error?.stderr || error?.message || "Failed to reset sandbox";
    
    return NextResponse.json(
      { 
        success: false, 
        message: `Failed to reset sandbox: ${errorMessage}` 
      },
      { status: 500 }
    );
  }
}
