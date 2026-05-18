import Layout from "@/components/Layout";
import AnimatedPage from "@/components/AnimatedPage";
import About from "@/components/About";

export default function AboutRoute() {
  return (
    <Layout>
      <AnimatedPage>
        <About />
      </AnimatedPage>
    </Layout>
  );
}
