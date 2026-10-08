import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Talk to the Hunter Islamic Agro Farm team about projects, shares,
          shark applications, or appointment support.
        </p>
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="size-4" /> support@hunteragrofarm.com
          </div>
          <div className="flex items-center gap-3">
            <Phone className="size-4" /> +880 1700 000000
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-4" /> Dhaka, Bangladesh
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Email address" required />
            <Input placeholder="Subject" required />
            <Textarea placeholder="Write your message" rows={6} required />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
