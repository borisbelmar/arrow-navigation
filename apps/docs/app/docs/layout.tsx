import { Leftbar } from "@/components/leftbar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="sm:container mx-auto w-[88vw]">
      <div className="flex items-start gap-14">
        <Leftbar key="leftbar" />
        <div className="flex-[4]">{children}</div>{" "}
      </div>
    </section>
  );
}
