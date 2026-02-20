import { spawn } from "node:child_process";

export default function register(api: any) {
  api.registerTool(
    {
      name: "crawl_doc",
      description: "Run local crawler script and save one or many webpages as markdown",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "Single target URL to crawl" },
          urls: {
            type: "array",
            description: "Batch crawl URLs in one tool call",
            items: { type: "string" },
            minItems: 1
          },
          filename: { type: "string", description: "Output filename (single URL only)" }
        },
        anyOf: [{ required: ["url"] }, { required: ["urls"] }]
      },
      async execute(_id: string, params: any) {
        const script = "/home/ubuntu/openclaw-vault/extensions/crawler-tool/openclaw-crawl-doc";

        const urlList: string[] = Array.isArray(params.urls)
          ? params.urls.map((u: any) => String(u))
          : params.url
            ? [String(params.url)]
            : [];

        if (!urlList.length) {
          return { content: [{ type: "text", text: "crawl failed: provide url or urls[]" }] };
        }

        const args: string[] = [...urlList];
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
