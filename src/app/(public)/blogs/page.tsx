import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const blogs = [
  {
    title: "Why agro projects need patient capital",
    excerpt:
      "A practical look at seasonal timelines, funding windows, and how share-backed participation can support long-cycle farming work.",
    tag: "Investment",
  },
  {
    title: "How shark appointments improve project review",
    excerpt:
      "Approved sharks can use structured admin appointments to ask sharper questions before committing to larger share purchases.",
    tag: "Shark desk",
  },
  {
    title: "Reading a public project before buying shares",
    excerpt:
      "Review location, total cost, schedule, status, and project narrative before moving into the checkout flow.",
    tag: "Guide",
  },
];

export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-8 max-w-2xl">
            <h1 className="text-3xl font-semibold">Blogs</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Short notes for understanding agro investments, share buying, and
              the shark appointment workflow.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.title}>
                <CardHeader>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    {blog.tag}
                  </p>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {blog.excerpt}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    render={<Link href="/projects" />}
                    nativeButton={false}
                  >
                    View projects <ArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
