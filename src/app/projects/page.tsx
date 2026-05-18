import Layout from "@/components/Layout";
import AnimatedPage from "@/components/AnimatedPage";
import Projects from "@/components/Projects";

export default function ProjectsRoute() {
  return (
    <Layout>
      <AnimatedPage>
        <Projects />
      </AnimatedPage>
    </Layout>
  );
}
