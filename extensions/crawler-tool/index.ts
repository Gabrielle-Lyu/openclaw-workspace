import { spawn } from "node:child_process";

export default function register(api: any) {
  api.registerTool(
    {
      name: "crawl_doc",
      description: "Run local crawler script and save webpage as markdown",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "Target URL to crawl" },
          outDir: { type: "string", description: "Output directory" },
          filename: { type: "string", description: "Output filename" }
        },
        required: ["url"]
      },
      async execute(_id: string, params: any) {
        const script = "/home/ubuntu/openclaw-workspace/extensions/crawler-tool/openclaw-crawl-doc";
        const args: string[] = [params.url];
        if (params.outDir) args.push("--out-dir", String(params.outDir));
        if (params.filename) args.push("--filename", String(params.filename));

        const result = await new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
          const p = spawn(script, args, { stdio: ["ignore", "pipe", "pipe"] });
          let stdout = "";
          let stderr = "";
          p.stdout.on("data", (d) => (stdout += d.toString()));
          p.stderr.on("data", (d) => (stderr += d.toString()));
          p.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
        });

        if (result.code !== 0) {
          return { content: [{ type: "text", text: `crawl failed: ${result.stderr || result.stdout}` }] };
        }
        return { content: [{ type: "text", text: result.stdout || "crawl complete" }] };
      }
    },
    { optional: true }
  );
}
