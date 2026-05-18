import Layout from "@/components/Layout";
import AnimatedPage from "@/components/AnimatedPage";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <Layout>
      <AnimatedPage>
        <Hero />
      </AnimatedPage>
    </Layout>
  );
}
