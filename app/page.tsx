import { title } from "@/components/primitives";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <div>
          <h1 className={title()}>Home</h1>
        </div>
      </div>
    </section>
  );
}
